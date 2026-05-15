<?php
declare(strict_types=1);

// Irail SDK utility: result_headers

class IrailResultHeaders
{
    public static function call(IrailContext $ctx): ?IrailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
