<?php

/**
 * Base endpoint.
 *
 * @author Eridon Keta - W20044984.
 */

class Base extends Endpoint
{
    /**
     * Constructor for the Base endpoint.
     *
     * @return void
     */
    public function __construct()
    {
        try {
            // Connect to the database
            $db = new Database(DATABASE);

            // Execute a SELECT query to get the conference information
            $result = $db->executeSQL("SELECT name FROM conference_information");

            if (empty($result)) {
                throw new Exception("Query returned no results.", 404);
            }

            $row = $result[0];
            $conference_name = $row['name'];

            // The data for this endpoint is static and therefore will not require a database query.
            $details = array(
                "Full Name" => "Eridon Keta",
                "Student ID" => "20044984",
            );

            // The documentation for this endpoint is static and therefore will not require a database query.
            $documentation = array(
                "http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/app/#/documentation",
            );

            // The conference information for this endpoint is dynamic and retrieved from the database.
            $conference = array(
                $conference_name,
            );

            // Set the data for the endpoint.
            $this->setData(array(
                "length" => count($details),
                "message" => "Success",
                "details" => $details,
                "documentation" => $documentation,
                "conference" => $conference,
            ));
        } catch (Exception $e) {
            // Handle any exceptions that are thrown
            $this->setData(array(
                "length" => 0,
                "message" => "Error: " . $e->getMessage(),
                "details" => array(),
                "documentation" => array(),
                "conference" => array(),
            ));
        }
    }
}
