package core

type IrailError struct {
	IsIrailError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIrailError(code string, msg string, ctx *Context) *IrailError {
	return &IrailError{
		IsIrailError: true,
		Sdk:              "Irail",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IrailError) Error() string {
	return e.Msg
}
