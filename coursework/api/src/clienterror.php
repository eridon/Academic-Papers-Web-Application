<?php

/**
 * Endpoint for handling incorrect input from client.
 *
 * This endpoint can be used if there is invalid input such as an invalid
 * request method, an invalid endpoint, or invalid parameters.
 *
 * @param string $message The error message to display.
 * @param int $code The HTTP response code to send.
 * @return void.
 * 
 * @author Eridon Keta - W20044984.
 */

class ClientError extends Endpoint
{
    /**
     * Constructor for the ClientError endpoint.
     *
     * @param string $message The error message to display.
     * @param int $code The HTTP response code to send.
     * @return void.
     */
    public function __construct($message = "", $code = 400)
    {
        http_response_code($code);

        $this->setData(array(
            "length" => 0,
            "message" => $message,
            "data" => null
        ));
    }
}
