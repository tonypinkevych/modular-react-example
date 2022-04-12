import { renderHook } from '@testing-library/react-hooks'
import { ClientsStore, IClientsStore } from '../../stores/clients'
import { IOrdersStore, OrdersStore } from '../../stores/orders'
import { ITablesStore, TablesStore } from '../../stores/tables'
import { wait } from '../../test/wait'

import { useRootInteractor } from './interactor'

describe('useRootInteractor', () => {
  let clientsStore: IClientsStore
  let tablesStore: ITablesStore
  let ordersStore: IOrdersStore

  beforeEach(() => {
    clientsStore = new ClientsStore()
    tablesStore = new TablesStore()
    ordersStore = new OrdersStore()
  })

  test('hostess when client in queue', async () => {
    // GIVEN: regular useRootInteractor
    const { result: sut } = renderHook(() =>
      useRootInteractor({ clientsStore, tablesStore, ordersStore })
    )

    expect(sut.current.children.hostess).toBeFalsy()

    // WHEN: new client in queue
    clientsStore.addToQueue()

    // @NOTE: required to wait until mobx update the state so all autoruns triggered
    await wait(0.1)

    // THEN: should be defined
    expect(sut.current.children.hostess).toBeTruthy()
  })

  test('waiters when client at table', async () => {
    // GIVEN: regular useRootInteractor
    const { result: sut } = renderHook(() =>
      useRootInteractor({ clientsStore, tablesStore, ordersStore })
    )

    expect(sut.current.children.waiter).toBeFalsy()

    // WHEN: new client in queue
    tablesStore.fulfillTable('some-client-id')

    // @NOTE: required to wait until mobx update the state so all autoruns triggered
    await wait(0.1)

    // THEN: should be defined
    expect(sut.current.children.waiter).toBeTruthy()
  })
})
