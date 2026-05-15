# Irail SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IrailUtility.registrar = ->(u) {
  u.clean = IrailUtilities::Clean
  u.done = IrailUtilities::Done
  u.make_error = IrailUtilities::MakeError
  u.feature_add = IrailUtilities::FeatureAdd
  u.feature_hook = IrailUtilities::FeatureHook
  u.feature_init = IrailUtilities::FeatureInit
  u.fetcher = IrailUtilities::Fetcher
  u.make_fetch_def = IrailUtilities::MakeFetchDef
  u.make_context = IrailUtilities::MakeContext
  u.make_options = IrailUtilities::MakeOptions
  u.make_request = IrailUtilities::MakeRequest
  u.make_response = IrailUtilities::MakeResponse
  u.make_result = IrailUtilities::MakeResult
  u.make_point = IrailUtilities::MakePoint
  u.make_spec = IrailUtilities::MakeSpec
  u.make_url = IrailUtilities::MakeUrl
  u.param = IrailUtilities::Param
  u.prepare_auth = IrailUtilities::PrepareAuth
  u.prepare_body = IrailUtilities::PrepareBody
  u.prepare_headers = IrailUtilities::PrepareHeaders
  u.prepare_method = IrailUtilities::PrepareMethod
  u.prepare_params = IrailUtilities::PrepareParams
  u.prepare_path = IrailUtilities::PreparePath
  u.prepare_query = IrailUtilities::PrepareQuery
  u.result_basic = IrailUtilities::ResultBasic
  u.result_body = IrailUtilities::ResultBody
  u.result_headers = IrailUtilities::ResultHeaders
  u.transform_request = IrailUtilities::TransformRequest
  u.transform_response = IrailUtilities::TransformResponse
}
