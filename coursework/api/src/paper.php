<?php

/**
 * This class is responsible for handling the paper endpoint.
 * 
 * @author Eridon Keta - W20044984.
 */

class Paper extends Endpoint
{
    /**
     * Initialises the SQL statement for the Paper endpoint.
     *
     * @param array $sqlParams - an array of parameters to bind to the query.
     * @return void.
     */
    protected function initialiseSQL()
    {
        try {
            $sql = "SELECT paper_id, title, award, abstract, name AS full_track, short_name AS short_track
            FROM paper
            JOIN track ON (track.track_id = paper.track_id)";
            $this->setSQL($sql);
            $sqlParams = [];

            /**
             * @param int $id - the paper ID to filter by.
             */
            if (filter_has_var(INPUT_GET, 'id')) {
                if (isset($where)) {
                    $where .= " AND paper_id = :id";
                } else {
                    $where = " WHERE paper_id = :id";
                }
                $sqlParams['id'] = $_GET['id'];
            }

            /**
             * @param string $track - the track for which to search for papers.
             */
            if (filter_has_var(INPUT_GET, 'track')) {
                if (!is_string($_GET['track'])) {
                    throw new ClientErrorException("Invalid track parameter", 400);
                }
                if (isset($where)) {
                    $where .= " AND short_name = :track";
                } else {
                    $where = " WHERE short_name = :track";
                }
                $sqlParams['track'] = $_GET['track'];
            }

            /**
             * @param string $award - the award for which to search for papers.
             */
            if (filter_has_var(INPUT_GET, 'award')) {
                if (!is_string($_GET['award'])) {
                    throw new ClientErrorException("Invalid award parameter", 400);
                }
                if (isset($where)) {
                    $where .= " AND award LIKE :award";
                } else {
                    $where = " WHERE award LIKE :award";
                }
                $sqlParams['award'] = $_GET['award'];
            }

            /**
             * @param string $search - the search query for papers.
             */
            if (filter_has_var(INPUT_GET, 'search')) {
                if (!is_string($_GET['search'])) {
                    throw new ClientErrorException("Invalid search parameter", 400);
                }
                $sql .= " WHERE (paper.title LIKE :search OR paper.abstract LIKE :search)";
                $sqlParams['search'] = '%' . $_GET['search'] . '%';
            }

            // If a WHERE clause has been set, append it to the SQL query.
            if (isset($where)) {
                $sql .= $where;
            }

            // Set the SQL and SQL Params.
            $this->setSQL($sql);
            $this->setSQLParams($sqlParams);
        } catch (ClientErrorException $e) {
            // If a ClientErrorException is thrown, create a new ClientError object with the exception's message and code.
            $endpoint = new ClientError($e->getMessage(), $e->getCode());
            $this->setData($endpoint->getData());
        }
    }
}
