/**
 * @description Кухня. Отвечает за приготовление заказов.
 * В текущем сетапе ничего не делает, просто имитирует асинхронный вызов.
 *
 * Мок ниже используем в тестах для более удобной работы.
 */
export interface IKitchenService {
  cook: () => Promise<void>
}

export class KitchenService implements IKitchenService {
  cook: IKitchenService['cook'] = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 2000)
    )
  }
}

export class KitchenServiceStub implements IKitchenService {
  cook: IKitchenService['cook'] = jest.fn()
}
