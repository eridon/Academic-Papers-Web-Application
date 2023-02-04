<?php

/**
 * This is the main entry point for the API.
 * 
 * @author Eridon Keta W20044984.
 */

// Include the config file.
include 'config/config.php';

try {
    // Initialize the endpoint based on the path.
    switch ($path) {
            // The base endpoint will return all the data in the database.
        case '/':
            $endpoint = new Base();
            break;
        case '/authors/':
        case '/authors':
        case '/author/':
        case '/author':
            $endpoint = new Author();
            break;
        case '/papers/':
        case '/papers':
        case '/paper/':
        case '/paper':
            $endpoint = new Paper();
            break;
        case '/auth/':
        case '/auth':
            $endpoint = new Authenticate();
            break;
        case '/update/':
        case '/update':
            $endpoint = new Update();
            break;
        default:
            $endpoint = new ClientError("Path not found: " . $path, 404);
    }
} catch (ClientErrorException $e) {
    // If a ClientErrorException is thrown, create a new ClientError object with the exception's message and code.
    $endpoint = new ClientError($e->getMessage(), $e->getCode());
} catch (Exception $e) {
    // If any other exception is thrown, create a new ClientError object with a generic error message and a 500 response code.
    $endpoint = new ClientError("An error occurred: " . $e->getMessage(), 500);
}

// Get the data from the endpoint.
$response = $endpoint->getData();

// Echo the data as a JSON-encoded string.
echo json_encode($response);
