<?php

/**
 * Autoloader function to load classes from the src folder.
 * 
 * @param string $className The name of the class to be autoloaded.
 * 
 * @author Eridon Keta - W20044984.
 */

class Autoload
{
    /**
     * Autoloader function to load classes from the src folder.
     * 
     * @param string $className The name of the class to be autoloaded.
     * 
     * @throws Exception If the class file cannot be found or is not readable.
     * 
     * @return void
     */
    public static function autoloader($className)
    {
        // Construct the filename for the class file.
        $filename = "src\\" . strtolower($className) . ".php";
        $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);

        // Check if the file exists and is readable.
        if (is_readable($filename)) {
            include_once $filename;
        } else {
            // If the file does not exist or is not readable, throw an exception.
            throw new Exception("File not found: " . $className . " (" . $filename . ")");
        }
    }
}
