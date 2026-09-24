
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IrailSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IrailSDK.test()
    equal(testsdk instanceof IrailSDK, true,
      'IrailSDK.test() must return a client synchronously')
  })

})
