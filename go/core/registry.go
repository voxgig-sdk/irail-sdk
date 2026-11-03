package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCompositionEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntityBase

var NewConnectionEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntityBase

var NewDisturbanceEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntityBase

var NewLiveboardEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntityBase

var NewStationEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntityBase

var NewVehicleEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntityBase

