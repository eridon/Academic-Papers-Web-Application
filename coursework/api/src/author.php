<?php

/**
 * This class is responsible for handling the Author endpoint.
 * 
 * @author Eridon Keta - W20044984.
 */

class Author extends Endpoint
{
    /**
     * Initialises the SQL statement for the Author endpoint.
     *
     * @param array INPUT_GET An array of GET parameters.
     * @return void.
     */
    protected function initialiseSQL()
    {
        try {
            // Initialise the base SQL query.
            $sql = "SELECT DISTINCT author.author_id, first_name, middle_initial, last_name, institution, country
                    FROM author
                    JOIN paper_has_author ON (author.author_id = paper_has_author.author_id)
                    JOIN affiliation ON (author.author_id = affiliation.author_id)";
            $this->setSQL($sql);
            $sqlParams = [];

            /**
             * @param int $id - the author ID to filter by.
             */
            if (filter_has_var(INPUT_GET, 'id')) {
                // If a WHERE clause has already been set, append to it.
                if (isset($where)) {
                    $where .= " AND author.author_id = :id";
                } else {
                    $where = " WHERE author.author_id = :id";
                }
                $sqlParams['id'] = $_GET['id'];
            }

            /**
             * @param int $paper_id - the paper ID to filter by.
             */
            if (filter_has_var(INPUT_GET, 'paper_id')) {
                // If a WHERE clause has already been set, append to it.
                if (isset($where)) {
                    $where .= " AND paper_has_author.paper_id = :paper_id";
                } else {
                    $where = " WHERE paper_has_author.paper_id = :paper_id";
                }
                $sqlParams['paper_id'] = $_GET['paper_id'];
            }

            /**
             * @param string $search - the search query for authors.
             */
            if (filter_has_var(INPUT_GET, 'search')) {
                if (!is_string($_GET['search'])) {
                    throw new ClientErrorException("Invalid search parameter", 400);
                }
                if (isset($where)) {
                    $where .= " AND (author.first_name LIKE :search OR author.middle_initial  LIKE :search 
                    OR author.last_name LIKE :search)";
                } else {
                    $where = " WHERE (author.first_name LIKE :search OR author.middle_initial LIKE :search
                    OR author.last_name LIKE :search)";
                }
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
