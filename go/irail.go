package voxgigirailsdk

import (
	"github.com/voxgig-sdk/irail-sdk/go/core"
	"github.com/voxgig-sdk/irail-sdk/go/entity"
	"github.com/voxgig-sdk/irail-sdk/go/feature"
	_ "github.com/voxgig-sdk/irail-sdk/go/utility"
)

// Type aliases preserve external API.
type IrailSDK = core.IrailSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IrailEntity = core.IrailEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IrailError = core.IrailError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCompositionEntityFunc = func(client *core.IrailSDK, entopts map[string]any) core.IrailEntity {
		return entity.NewCompositionEntity(client, entopts)
	}
	core.NewConnectionEntityFunc = func(client *core.IrailSDK, entopts map[string]any) core.IrailEntity {
		return entity.NewConnectionEntity(client, entopts)
	}
	core.NewDisturbanceEntityFunc = func(client *core.IrailSDK, entopts map[string]any) core.IrailEntity {
		return entity.NewDisturbanceEntity(client, entopts)
	}
	core.NewLiveboardEntityFunc = func(client *core.IrailSDK, entopts map[string]any) core.IrailEntity {
		return entity.NewLiveboardEntity(client, entopts)
	}
	core.NewLogEntityFunc = func(client *core.IrailSDK, entopts map[string]any) core.IrailEntity {
		return entity.NewLogEntity(client, entopts)
	}
	core.NewOccupancyEntityFunc = func(client *core.IrailSDK, entopts map[string]any) core.IrailEntity {
		return entity.NewOccupancyEntity(client, entopts)
	}
	core.NewStationEntityFunc = func(client *core.IrailSDK, entopts map[string]any) core.IrailEntity {
		return entity.NewStationEntity(client, entopts)
	}
	core.NewVehicleEntityFunc = func(client *core.IrailSDK, entopts map[string]any) core.IrailEntity {
		return entity.NewVehicleEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIrailSDK = core.NewIrailSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
