<?php
declare(strict_types=1);

// Irail SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

IrailUtility::setRegistrar(function (IrailUtility $u): void {
    $u->clean = [IrailClean::class, 'call'];
    $u->done = [IrailDone::class, 'call'];
    $u->make_error = [IrailMakeError::class, 'call'];
    $u->feature_add = [IrailFeatureAdd::class, 'call'];
    $u->feature_hook = [IrailFeatureHook::class, 'call'];
    $u->feature_init = [IrailFeatureInit::class, 'call'];
    $u->fetcher = [IrailFetcher::class, 'call'];
    $u->make_fetch_def = [IrailMakeFetchDef::class, 'call'];
    $u->make_context = [IrailMakeContext::class, 'call'];
    $u->make_options = [IrailMakeOptions::class, 'call'];
    $u->make_request = [IrailMakeRequest::class, 'call'];
    $u->make_response = [IrailMakeResponse::class, 'call'];
    $u->make_result = [IrailMakeResult::class, 'call'];
    $u->make_point = [IrailMakePoint::class, 'call'];
    $u->make_spec = [IrailMakeSpec::class, 'call'];
    $u->make_url = [IrailMakeUrl::class, 'call'];
    $u->param = [IrailParam::class, 'call'];
    $u->prepare_auth = [IrailPrepareAuth::class, 'call'];
    $u->prepare_body = [IrailPrepareBody::class, 'call'];
    $u->prepare_headers = [IrailPrepareHeaders::class, 'call'];
    $u->prepare_method = [IrailPrepareMethod::class, 'call'];
    $u->prepare_params = [IrailPrepareParams::class, 'call'];
    $u->prepare_path = [IrailPreparePath::class, 'call'];
    $u->prepare_query = [IrailPrepareQuery::class, 'call'];
    $u->result_basic = [IrailResultBasic::class, 'call'];
    $u->result_body = [IrailResultBody::class, 'call'];
    $u->result_headers = [IrailResultHeaders::class, 'call'];
    $u->transform_request = [IrailTransformRequest::class, 'call'];
    $u->transform_response = [IrailTransformResponse::class, 'call'];
});
