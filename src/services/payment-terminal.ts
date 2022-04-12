export interface IPaymentTerminalService {
  pay: (orderId: string) => Promise<void>
}

export class PaymentTerminalService implements IPaymentTerminalService {
  pay: IPaymentTerminalService['pay'] = async (orderId) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 2000)
    )
  }
}

export class PaymentTerminalServiceStub implements IPaymentTerminalService {
  pay: IPaymentTerminalService['pay'] = jest.fn()
}
