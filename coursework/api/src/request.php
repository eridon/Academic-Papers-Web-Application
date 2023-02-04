<?php

/**
 * This class is used to handle the request to the API.
 * 
 * @author Eridon Keta - 20044984.
 */

class Request extends Endpoint
{
    /**
     * @var string The request method (e.g. "GET", "POST", etc.).
     */
    private $method;

    /**
     * @var string The request path.
     */
    private $path;

    /**
     * Set the request method and path properties.
     *
     * @throws Exception If the `REQUEST_METHOD` server variable is not defined or if the `BASEPATH` constant is not defined.
     */
    public function __construct()
    {
        if (!isset($_SERVER['REQUEST_METHOD'])) {
            throw new Exception("Error: The `REQUEST_METHOD` server variable is not defined.");
        }
        if (!defined('BASEPATH')) {
            throw new Exception("Error: The `BASEPATH` constant is not defined.");
        }

        $this->setMethod();
        $this->setPath();
    }

    /**
     * Set the request method property.
     */
    private function setMethod()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];
    }

    /**
     * Validate that the request method is in the list of valid methods.
     *
     * @param array $validMethods - the list of valid methods.
     */
    public function validateRequestMethod($validMethods)
    {
        if (!in_array($this->method, $validMethods)) {
            throw new ClientErrorException("Invalid request method", 401);
        }
    }

    /**
     * Set the request path property.
     */
    private function setPath()
    {
        // Get the full URL
        $this->path = parse_url(BASEPATH);
    }

    /**
     * Get the request method property.
     *
     * @return string The request path property.
     */
    public function getPath()
    {
        return $this->path;
    }
}
