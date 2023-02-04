<?php

namespace FirebaseJWT;

use InvalidArgumentException;
use OpenSSLAsymmetricKey;

/**
 * Class representing a JWT key.
 * 
 * @author Eridon Keta - W20044984.
 */

class Key
{
    /**
     * @var string $algorithm The algorithm this key is valid for.
     */
    private $algorithm;

    /**
     * @var string|resource|OpenSSLAsymmetricKey $keyMaterial The key material.
     */
    private $keyMaterial;

    /**
     * Constructor.
     *
     * @param string|resource|OpenSSLAsymmetricKey $keyMaterial The key material.
     * @param string $algorithm The algorithm this key is valid for.
     *
     * @throws InvalidArgumentException If any of the arguments are invalid.
     */
    public function __construct($keyMaterial, $algorithm)
    {
        if (
            !is_string($keyMaterial)
            && !is_resource($keyMaterial)
            && !$keyMaterial instanceof OpenSSLAsymmetricKey
        ) {
            throw new InvalidArgumentException('Type error: $keyMaterial must be a string, resource, or OpenSSLAsymmetricKey');
        }

        if (empty($keyMaterial)) {
            throw new InvalidArgumentException('Type error: $keyMaterial must not be empty');
        }

        if (!is_string($algorithm) || empty($keyMaterial)) {
            throw new InvalidArgumentException('Type error: $algorithm must be a string');
        }

        $this->keyMaterial = $keyMaterial;
        $this->algorithm = $algorithm;
    }

    /**
     * Return the algorithm valid for this key.
     *
     * @return string.
     */
    public function getAlgorithm()
    {
        return $this->algorithm;
    }

    /**
     * Return the key material.
     *
     * @return string|resource|OpenSSLAsymmetricKey
     */
    public function getKeyMaterial()
    {
        return $this->keyMaterial;
    }
}
