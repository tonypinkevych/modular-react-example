import { autorun } from 'mobx'
import * as React from 'react'
import { Dish, Order } from '../../interfaces'
import { IPaymentTerminalService } from '../../services/payment-terminal'
import { IDishesStore } from '../../stores/dishes'
import { IOrdersStore } from '../../stores/orders'
import { ITablesStore } from '../../stores/tables'

type Payload = {
  dishesStore: IDishesStore
  ordersStore: IOrdersStore
  tablesStore: ITablesStore
  paymentTerminalService: IPaymentTerminalService
}

export interface IWaiterInteractor {
  takeOrder: (payload: { clientId: string }) => Promise<void>
}

export const useWaiterInteractor = ({
  dishesStore,
  ordersStore,
  tablesStore,
  paymentTerminalService,
}: Payload): IWaiterInteractor => {
  const takeOrder: IWaiterInteractor['takeOrder'] = React.useCallback(
    async ({ clientId }) => {
      const tableId = tablesStore.getTableByClient(clientId)

      if (tableId == null) {
        return
      }

      ordersStore.placeOrder({
        clientId,
        tableId,
      })
    },
    [ordersStore, tablesStore]
  )

  const serve = React.useCallback(
    async (dish: Dish) => {
      const order = ordersStore.getOrderById(dish.orderId)

      if (order == null) {
        return
      }

      dishesStore.pickupDish(dish.id)

      ordersStore.updateStatus({
        id: order.id,
        status: 'waiting-for-client',
      })
    },
    [dishesStore, ordersStore]
  )

  const handlePayment = React.useCallback(
    async (order: Order) => {
      await paymentTerminalService.pay(order.id)
      ordersStore.updateStatus({
        id: order.id,
        status: 'closed',
      })
    },
    [ordersStore]
  )

  // @NOTE: ждём изменений в очереди приготовленных блюд
  React.useEffect(() => {
    const subscription = autorun(async () => {
      const promises = dishesStore.dishes.map(serve)
      await Promise.all(promises)
    })

    return subscription
  }, [])

  // @NOTE: ждём изменений по заказам, которые ждут оплаты
  React.useEffect(() => {
    const subscription = autorun(async () => {
      const ordersWaitingForPayment = ordersStore.orders.filter(
        (order) => order.status === 'waiting-for-payment'
      )
      const promises = ordersWaitingForPayment.map(handlePayment)
      await Promise.all(promises)
    })

    return subscription
  }, [])

  return {
    takeOrder,
  }
}
