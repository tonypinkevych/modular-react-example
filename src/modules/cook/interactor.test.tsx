import { renderHook, act } from '@testing-library/react-hooks'
import { IKitchenService, KitchenServiceStub } from '../../services/kitchen'
import { DishesStore, IDishesStore } from '../../stores/dishes'
import { IOrdersStore, OrdersStore } from '../../stores/orders'
import { wait } from '../../test/wait'

import { useCookInteractor } from './interactor'

describe('useCookInteractor', () => {
  let ordersStore: IOrdersStore
  let dishesStore: IDishesStore
  let kitchenService: IKitchenService

  beforeEach(() => {
    ordersStore = new OrdersStore()
    dishesStore = new DishesStore()
    kitchenService = new KitchenServiceStub()
  })

  test('cook', async () => {
    // GIVEN: regular useCookInteractor
    renderHook(() =>
      useCookInteractor({
        ordersStore,
        dishesStore,
        kitchenService,
      })
    )

    // WHEN: new order appeared
    ordersStore.placeOrder({
      clientId: 'some-cliend-id',
      tableId: 'table-1',
    })

    // @NOTE: required to wait until mobx update the state so all autoruns triggered
    await wait(0.1)

    // THEN: cook dish
    expect(dishesStore.dishes.length).toEqual(1)
  })
})
