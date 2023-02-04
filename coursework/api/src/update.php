<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/**
 *
 * Update the award of a paper in the database.
 *
 * @author Eridon Keta - W20044984.
 */

class Update extends Endpoint
{
    public function __construct()
    {
        // Validate the request method.
        $this->validateRequestMethod("POST");

        // Validate the token.
        $this->validateToken();

        // Validate the update parameters.
        $this->validateUpdateParameters();

        // Connect to the database.
        $db = new Database(DATABASE);

        // Initialise and execute the update.
        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());

        $this->setData(array(
            "length" => 0,
            "message" => "Success",
            "data" => null
        ));
    }

    /**
     * Validate that the request method is the expected method.
     * 
     * @param string $method - the expected request method.
     * @throws ClientErrorException if the request method is not as expected.
     */
    private function validateRequestMethod($method)
    {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            throw new ClientErrorException("Invalid Request Method", 405);
        }
    }

    /**
     * Validate the presence and validity of a JWT in the request header.
     * 
     * @throws ClientErrorException if the JWT is not present or not valid.
     */
    private function validateToken()
    {
        // Use the secret key.
        $secretKey = SECRET;

        // Get all headers from the http request.
        $allHeaders = getallheaders();
        $authorizationHeader = "";

        // Look for an Authorization header. This might not exist. It might start with a capital A (requests
        // from Postman do), or a lowercase a (requests from browsers might).
        if (array_key_exists('Authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['Authorization'];
        } elseif (array_key_exists('authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['authorization'];
        }

        // Check if there is a Bearer token in the header.
        if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
            throw new ClientErrorException("Bearer token required", 401);
        }

        // Extract the JWT from the header (by cutting the text 'Bearer').
        $jwt = trim(substr($authorizationHeader, 7));

        try {
            // Use the JWT class to decode the token.
            $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
        } catch (Exception $e) {
            throw new ClientErrorException($e->getMessage(), 401);
        }

        // Check if the issuer of the token matches the server.
        if ($decoded->iss != $_SERVER['HTTP_HOST']) {
            throw new ClientErrorException("invalid token issuer", 401);
        }
    }

    private function validateUpdateParameters()
    {
        // Look for an 'award' and 'paper_id' parameter in the POST request.
        if (!filter_has_var(INPUT_POST, 'award')) {
            throw new ClientErrorException("award parameter required", 400);
        }
        if (!filter_has_var(INPUT_POST, 'paper_id')) {
            throw new ClientErrorException("paper_id parameter required", 400);
        }
        // Check to see if a valid award is supplied.
        $awards = ["true", "null"];
        if (!in_array(strtolower($_POST['award']), $awards, true)) {
            throw new ClientErrorException("invalid award", 400);
        }
    }

    /**
     * Initialize the SQL statement for the update operation.
     *
     * @param string $award The award status for the paper.
     * @param int $paper_id The ID of the paper to update.
     */
    protected function initialiseSQL()
    {
        // Use an array to map the 'award' parameter to the appropriate value for the 'award' column.
        $awards = ["true" => "true", NULL => "null"];

        // Use the array to get the value for the 'award' parameter.
        $award_status = $awards[strtolower($_POST['award'])];

        $sql = "UPDATE paper SET award = :award WHERE paper_id = :paper_id";
        $this->setSQL($sql);
        $this->setSQLParams(['award' => $award_status, 'paper_id' => $_POST['paper_id']]);
    }
}
