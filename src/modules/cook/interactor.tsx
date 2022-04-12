import { autorun, reaction } from 'mobx'
import * as React from 'react'
import { Order } from '../../interfaces'
import { IKitchenService } from '../../services/kitchen'
import { IDishesStore } from '../../stores/dishes'
import { IOrdersStore } from '../../stores/orders'

type Payload = {
  dishesStore: IDishesStore
  ordersStore: IOrdersStore
  kitchenService: IKitchenService
}

export interface ICookInteractor {}

export const useCookInteractor = ({
  dishesStore,
  ordersStore,
  kitchenService,
}: Payload): ICookInteractor => {
  const cook = React.useCallback(
    async (orderId: string) => {
      ordersStore.updateStatus({
        id: orderId,
        status: 'cooking',
      })

      // @NOTE: wait external service
      await kitchenService.cook()

      ordersStore.updateStatus({
        id: orderId,
        status: 'waiting-for-serving',
      })
    },
    [dishesStore, ordersStore]
  )

  React.useEffect(() => {
    const subscription = reaction(
      () => ordersStore.orders,
      async (orders) => {
        const ordersToCook = orders.filter(
          (order) => order.status === 'waiting-for-cooking'
        )
        const promises = ordersToCook.map((order) => cook(order.id))
        await Promise.all(promises)
      }
    )

    return subscription
  }, [])

  return {}
}
