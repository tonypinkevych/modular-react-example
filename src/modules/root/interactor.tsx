import { autorun } from 'mobx'
import * as R from 'ramda'
import * as React from 'react'
import { IClientsStore } from '../../stores/clients'
import { IOrdersStore } from '../../stores/orders'
import { ITablesStore } from '../../stores/tables'

type Payload = {
  clientsStore: IClientsStore
  tablesStore: ITablesStore
  ordersStore: IOrdersStore
}

export interface IRootInteractor {
  children: {
    cook: boolean
    hostess: boolean
    waiter: boolean
  }
}

export const useRootInteractor = ({
  clientsStore,
  tablesStore,
  ordersStore,
}: Payload): IRootInteractor => {
  const [isClientsInQueue, setIsClientsInQueue] = React.useState(false)
  const [isClientAtTable, setIsClientAtTable] = React.useState(false)

  // @NOTE: ждём изменения в очереди клиентов
  React.useEffect(() => {
    const subscription = autorun(() => {
      const clients = clientsStore.clients

      if (clients.length > 0) {
        setIsClientsInQueue(true)
        return
      }

      setIsClientsInQueue(false)
    })

    return subscription
  }, [])

  // @NOTE: ждём изменения в конфигурации столиков
  React.useEffect(() => {
    const subscription = autorun(() => {
      const listOfFulfilledTables = tablesStore.fulfilledTables
      const listOfTablesWithActiveOrders = ordersStore.orders
        .filter((order) => order.status !== 'closed')
        .map((order) => order.tableId)

      const tablesWhichWaitingForOrder = R.difference(
        listOfFulfilledTables,
        listOfTablesWithActiveOrders
      )

      if (tablesWhichWaitingForOrder.length >= 1) {
        setIsClientAtTable(true)
        return
      }

      setIsClientAtTable(false)
    })

    return subscription
  }, [])

  return {
    children: {
      cook: true,
      hostess: isClientsInQueue,
      waiter: isClientAtTable,
    },
  }
}
