<?php

namespace FirebaseJWT;

/**
 * Exception thrown when the token is not yet valid (has not yet become active).
 * 
 * @author Eridon Keta - W20044984.
 */

class BeforeValidException extends \UnexpectedValueException
{
}
