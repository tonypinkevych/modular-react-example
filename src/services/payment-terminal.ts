/**
 * @description Платёжный терминал. Отвечает за приём и обработку платежей.
 * В текущем сетапе ничего не делает, просто имитирует асинхронный вызов.
 *
 * Мок ниже используем в тестах для более удобной работы.
 */
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
