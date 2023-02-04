<?php

/**
 * Custom Exception.
 *
 * This should be thrown if there is erroneous input
 * from the client (e.g. invalid method, auth errors).
 *
 * @param string $message The error message to display.
 * @param int $code The HTTP response code to send.
 * @param Throwable $previous The previous exception.
 * @return void.
 * 
 * @author Eridon Keta - W20044984.
 */

class ClientErrorException extends Exception
{
    public function badRequestMessage()
    {
        http_response_code(400);
        $output["message"] = $this->message;
        return $output;
    }
}
