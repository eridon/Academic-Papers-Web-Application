<?php

/**
 * Custom error handler function.
 * 
 * @param int $errno The error number.
 * @param string $errstr The error message.
 * @param string $errfile The file in which the error occurred.
 * @param int $errline The line number at which the error occurred.
 * 
 * @author Eridon Keta - W20044984.
 */

function errorHandler($errno, $errstr, $errfile, $errline)
{
    if ($errno != 2 && $errno != 8) {
        throw new Exception("Error Detected: [$errno] $errstr file: $errfile line: $errline", 1);
    }
}
