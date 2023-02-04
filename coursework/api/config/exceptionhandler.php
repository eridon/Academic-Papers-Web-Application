<?php

/**
 * Custom exception handler function.
 * 
 * @param Exception $e The exception object.
 * 
 * @author Eridon Keta - W20044984.
 */

function exceptionHandler($e)
{
    // Include development mode.
    http_response_code(500);
    $output['message'] = $e->getMessage();
    $output['location']['file'] = $e->getFile();
    $output['location']['line'] = $e->getLine();
    // Output a log file.
    echo json_encode($output);
}
