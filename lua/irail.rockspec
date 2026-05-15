package = "voxgig-sdk-irail"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/irail-sdk.git"
}
description = {
  summary = "Irail SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["irail_sdk"] = "irail_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
