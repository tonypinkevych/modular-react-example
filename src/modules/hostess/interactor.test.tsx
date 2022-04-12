import { renderHook } from '@testing-library/react-hooks'
import { ClientsStore, IClientsStore } from '../../stores/clients'
import { ITablesStore, TablesStore } from '../../stores/tables'
import { wait } from '../../test/wait'

import { useHostessInteractor } from './interactor'

describe('useHostessInteractor', () => {
  let clientsStore: IClientsStore
  let tablesStore: ITablesStore

  beforeEach(() => {
    clientsStore = new ClientsStore()
    tablesStore = new TablesStore()
  })

  test('can sit at the table', async () => {
    // GIVEN: regular useHostessInteractor
    renderHook(() => useHostessInteractor({ clientsStore, tablesStore }))

    expect(tablesStore.fulfilledTables.length).toEqual(0)

    // WHEN: client want to sit at the table
    clientsStore.addToQueue()
    await wait(0.1)

    // THEN: find the empty table and sit client at it
    expect(tablesStore.fulfilledTables.length).toEqual(1)
  })
})
