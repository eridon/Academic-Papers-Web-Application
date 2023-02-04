<?php

/**
 * Config file to set up the environment for the API.
 *
 * @author Eridon Keta - W20044984.
 */

/**
 * Enable error and exception display.
 * 
 * @param bool DEVELOPMENT_MODE Whether the site is in development mode or not.
 */
define('DEVELOPMENT_MODE', true);

/**
 * @param bool DEVELOPMENT_MODE Whether to display errors or not.
 */
ini_set('display_errors', DEVELOPMENT_MODE);

/**
 * @param bool DEVELOPMENT_MODE Whether to display startup errors or not.
 */
ini_set('display_startup_errors', DEVELOPMENT_MODE);

/**
 * @param int E_ALL The error reporting level to use.
 */
error_reporting(E_ALL);

/**
 * @param string $_SERVER['REQUEST_URI'] The request URI.
 */
$path = parse_url($_SERVER['REQUEST_URI'])['path'];

/**
 * @param string BASEPATH The base path of the site.
 */
$path = str_replace("kf6012/coursework/api/", "", $path);

/**
 * @param string $path The path of the site.
 */
define('BASEPATH', $path);

/**
 * @param string DATABASE The path to the database file.
 */
define('DATABASE', 'db/chiplay.sqlite');

/**
 * @param string "Content-Type: application/json; charset=UTF-8" The content type of the response.
 */
header("Content-Type: application/json; charset=UTF-8");

/**
 * @param string "Access-Control-Allow-Origin: *" The header to allow CORS.
 */
header("Access-Control-Allow-Origin: *");

/**
 * @param string "Access-Control-Allow-Headers: *" The header to allow all headers in CORS requests.
 */
header("Access-Control-Allow-Headers: *");

/**
 * @param string $_SERVER['REQUEST_METHOD'] The request method.
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

/**
 * @param string SECRET The secret key for the site.
 */
define('SECRET', "+<oE[fvY8w:Qnarb@!iYB#Vl:BEbg9");

/**
 * Include and set the custom exception handler.
 * 
 * @param string 'exceptionHandler' The name of the custom exception handler function.
 */
include 'config/exceptionhandler.php';
set_exception_handler('exceptionHandler');

/**
 * Include and register the autoloader function.
 * 
 * @param string 'Autoload::autoloader' The name of the autoloader function.
 */
include 'config/autoloader.php';
spl_autoload_register('Autoload::autoloader');
