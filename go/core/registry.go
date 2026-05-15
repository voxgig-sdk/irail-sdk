package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCompositionEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntity

var NewConnectionEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntity

var NewDisturbanceEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntity

var NewLiveboardEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntity

var NewLogEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntity

var NewOccupancyEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntity

var NewStationEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntity

var NewVehicleEntityFunc func(client *IrailSDK, entopts map[string]any) IrailEntity

