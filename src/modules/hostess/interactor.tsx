import { autorun } from 'mobx'
import * as React from 'react'
import { IClientsStore } from '../../stores/clients'
import { ITablesStore } from '../../stores/tables'

type Payload = {
  clientsStore: IClientsStore
  tablesStore: ITablesStore
}

export interface IHostessInteractor {}

export const useHostessInteractor = ({
  clientsStore,
  tablesStore,
}: Payload): IHostessInteractor => {
  const sitAtTheTable = React.useCallback(
    async (clientId: string) => {
      clientsStore.sitClient(clientId)
      tablesStore.fulfillTable(clientId)
    },
    [clientsStore, tablesStore]
  )

  React.useEffect(() => {
    const subscription = autorun(() => {
      const clients = clientsStore.clients

      if (clients.length > 0) {
        clients.map((client) => client.id).forEach(sitAtTheTable)
      }
    })

    return subscription
  }, [])

  return {}
}
