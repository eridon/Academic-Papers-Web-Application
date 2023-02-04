<?php

use FirebaseJWT\JWT;

/**
 * Authenticate username and password against database.
 *
 * This class will check a username and password again those held in the 
 * database. Where authentication is successful it will return a JWT.
 *
 * @author Eridon Keta - W20044984.
 */

class Authenticate extends Endpoint
{
    /**
     * Constructor to authenticate the given username and password.
     *
     * @throws ClientErrorException If any of the authentication steps fail.
     */
    public function __construct()
    {
        try {
            // 1. Connect to the database.
            $db = new Database(DATABASE);

            // 2. Check the request method is POST.
            $this->validateRequestMethod("POST");

            // 3. Check there is a username and password parameter.
            $this->validateAuthParameters();

            // 4. Execute an SQL query to select the user.
            $this->initialiseSQL();
            $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());

            // 5. Check if username parameter matches one in database.
            $this->validateUsername($queryResult);

            // 6. Validate the password.
            $this->validatePassword($queryResult);

            // 7. Create a JWT.
            $data['token'] = $this->createJWT($queryResult);

            $this->setData(array(
                "length" => 0,
                "message" => "Success",
                "data" => $data
            ));
        } catch (ClientErrorException $e) {
            // If a ClientErrorException is thrown, create a new ClientError object with the exception's message and code.
            $endpoint = new ClientError($e->getMessage(), $e->getCode());
            $this->setData($endpoint->getData());
        }
    }

    /**
     * Initialise the SQL query and its parameters.
     */
    protected function initialiseSQL()
    {
        $sql = "SELECT account_id, username, password FROM account WHERE username = :username";
        $this->setSQL($sql);
        $this->setSQLParams(['username' => $_SERVER['PHP_AUTH_USER']]);
    }

    /**
     * Validate the request method.
     *
     * @param string $method The expected request method.
     *
     * @throws ClientErrorException If the request method is invalid.
     */
    private function validateRequestMethod($method)
    {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            throw new ClientErrorException("invalid request method", 405);
        }
    }

    /**
     * Validate the presence of a username and password parameter.
     *
     * @throws ClientErrorException If the username and password parameter are not present.
     */
    private function validateAuthParameters()
    {
        if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
            throw new ClientErrorException("username and password required", 401);
        }
    }

    /**
     * Validate the username.
     *
     * @param array $data The result of the SQL query.
     *
     * @throws ClientErrorException If the username is invalid.
     */
    private function validateUsername($data)
    {
        if (count($data) < 1) {
            throw new ClientErrorException("invalid credentials", 401);
        }
    }

    /**
     * Check if the provided password is valid.
     *
     * @param array $data The result of the SQL query.
     *
     * @throws ClientErrorException If the provided password is invalid.
     */
    private function validatePassword($data)
    {
        if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
            throw new ClientErrorException("invalid credentials", 401);
        }
    }

    /**
     * Create a JWT.
     *
     * @param array $queryResult The result of the SQL query.
     *
     * @return string The created JWT.
     */
    private function createJWT($queryResult)
    {
        $secretKey = SECRET;

        $time = time();

        $tokenPayload = [
            'iat' => $time,
            'exp' => strtotime('+1 day', $time),
            'iss' => $_SERVER['HTTP_HOST'],
            'sub' => $queryResult[0]['account_id'],
        ];

        $jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');

        return $jwt;
    }
}
