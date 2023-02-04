<?php

namespace FirebaseJWT;

/**
 * Exception thrown when the token has expired (its "exp" claim is in the past).
 * 
 * @author Eridon Keta - W20044984.
 */

class ExpiredException extends \UnexpectedValueException
{
}
