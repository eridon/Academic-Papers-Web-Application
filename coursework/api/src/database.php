<?php

/**
 * Connect and interact with an SQLite database.
 *
 * @author Eridon Keta - W20044984.
 */

class Database
{
    /**
     * The PDO connection to the database.
     *
     * @var PDO
     */
    private $dbConnection;

    /**
     * Constructor for the Database class.
     *
     * @param string $dbName The name of the SQLite database file.
     * @return void.
     */
    public function __construct($dbName)
    {
        $this->setDbConnection($dbName);
    }

    /**
     * Set up the PDO connection to the database.
     *
     * @param string $dbName The name of the SQLite database file.
     * @return void.
     */
    private function setDbConnection($dbName)
    {
        $this->dbConnection = new PDO('sqlite:' . $dbName);
        $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    /**
     * Execute an SQL prepared statement.
     *
     * This function executes the query and uses the PDO 'fetchAll' method with the
     * 'FETCH_ASSOC' flag set so that an associative array of results is returned.
     *
     * @param string $sql An SQL statement.
     * @param array $params An associative array of parameters (default empty array).
     * @return array An associative array of the query results.
     */
    public function executeSQL($sql, $params = [])
    {
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
