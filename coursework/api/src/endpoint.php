<?php

/**
 * A general class for endpoints
 * 
 * This class will be a parent for all endpoints (paper, author, etc.) 
 * providing common methods. It has been declared as an abstract class
 * which means it is not possible to make an instance of this class itself.
 * 
 * @author Eridon Keta - W20044984.
 */

abstract class Endpoint
{
    private $data;
    private $sql;
    private $sqlParams;

    /**
     * Query the database and save the result 
     */
    public function __construct()
    {
        // Creates a new database object with the database file passed as a parameter
        $db = new Database(DATABASE);

        /**
         * The initialiseSQL method can be overridden by child classes to set the SQL as appropriate for each endpoint
         */
        $this->initialiseSQL();

        /**
         * The executeSQL method is defined in the Database class and will return the result of the query
         */
        $data = $db->executeSQL($this->sql, $this->sqlParams);

        /**
         * The setData method is defined in this class and will set the data property of the class
         */
        $this->setData(array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }


    protected function setSQL($sql)
    {
        $this->sql = $sql;
    }


    protected function setSQLParams($params)
    {
        $this->sqlParams = $params;
    }

    /**
     * This method is used to set the SQL and SQLParams properties of the class
     * 
     * It is called in the constructor of the class and will be overridden by child classes
     * to set the SQL and SQLParams properties as appropriate for each endpoint
     */
    protected function initialiseSQL()
    {
        $sql = "";
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }

    public function getSQL()
    {
        return $this->sql;
    }

    public function getSQLParams()
    {
        return $this->sqlParams;
    }


    /**
     * Define valid parameters for this endpoint and return them as an array of strings (e.g. ['id']) 
     */
    protected function endpointParams()
    {
        return [];
    }

    /**
     * Check the parameters used in request against an array of
     * valid parameters for the endpoint
     * 
     * @param array $params An array of valid param names (e.g. ['id'])
     */
    protected function validateParams($params)
    {
        foreach ($_GET as $key => $value) {
            if (!in_array($key, $params)) {
                throw new ClientErrorException("Invalid parameter", 400);
            }
        }
    }

    /**
     * Set the data property of the class
     * 
     * @param array $data The data to be set
     */
    protected function setData($data)
    {
        $this->data = $data;
    }

    /**
     * Get the data property of the class
     * 
     * @return array The data property of the class
     */
    public function getData()
    {
        return $this->data;
    }
}
