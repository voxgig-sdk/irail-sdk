<?php
declare(strict_types=1);

// Irail SDK utility: result_body

class IrailResultBody
{
    public static function call(IrailContext $ctx): ?IrailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
