import { renderHook, act } from '@testing-library/react-hooks'
import {
  IPaymentTerminalService,
  PaymentTerminalServiceStub,
} from '../../services/payment-terminal'
import { DishesStore, IDishesStore } from '../../stores/dishes'
import { IOrdersStore, OrdersStore } from '../../stores/orders'
import { ITablesStore, TablesStore } from '../../stores/tables'
import { wait } from '../../test/wait'

import { useWaiterInteractor } from './interactor'

describe('useWaiterInteractor', () => {
  let dishesStore: IDishesStore
  let ordersStore: IOrdersStore
  let tablesStore: ITablesStore
  let paymentTerminalService: IPaymentTerminalService

  beforeEach(() => {
    dishesStore = new DishesStore()
    ordersStore = new OrdersStore()
    tablesStore = new TablesStore()
    paymentTerminalService = new PaymentTerminalServiceStub()
  })

  test('take new order', async () => {
    // GIVEN: regular useWaiterInteractor
    const { result: sut } = renderHook(() =>
      useWaiterInteractor({
        dishesStore,
        ordersStore,
        tablesStore,
        paymentTerminalService,
      })
    )

    // AND: table fulfilled by client
    tablesStore.fulfillTable('some-client-id')

    expect(ordersStore.orders.length).toEqual(0)

    // WHEN: client ask to process order
    await act(async () =>
      sut.current.takeOrder({
        clientId: 'some-client-id',
      })
    )

    // THEN: should place new order
    expect(ordersStore.orders.length).toEqual(1)
  })

  test('serve dish', async () => {
    // GIVEN: regular useWaiterInteractor
    renderHook(() =>
      useWaiterInteractor({
        dishesStore,
        ordersStore,
        tablesStore,
        paymentTerminalService,
      })
    )

    const orderId = ordersStore.placeOrder({
      clientId: 'some-cliend-id',
      tableId: 'table-1',
    })

    // WHEN: new dish placed
    dishesStore.placeDish({ id: 'some-dish-id', orderId })

    // @NOTE: required to wait until mobx update the state so all autoruns triggered
    await wait(0.1)

    // THEN: serve dish
    expect(dishesStore.dishes.length).toEqual(0)
  })

  test('handle payment', async () => {
    // GIVEN: regular useWaiterInteractor
    renderHook(() =>
      useWaiterInteractor({
        dishesStore,
        ordersStore,
        tablesStore,
        paymentTerminalService,
      })
    )

    // WHEN: new dish placed
    const orderId = ordersStore.placeOrder({
      clientId: 'some-cliend-id',
      tableId: 'table-1',
    })

    ordersStore.updateStatus({
      id: orderId,
      status: 'waiting-for-payment',
    })

    // @NOTE: required to wait until mobx update the state so all autoruns triggered
    await wait(0.1)

    // THEN: serve dish
    expect(ordersStore.orders[0].status).toEqual('closed')
  })
})
