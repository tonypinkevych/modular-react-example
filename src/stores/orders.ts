import * as R from 'ramda'
import { makeAutoObservable } from 'mobx'
import { Order } from '../interfaces'

type TableId = string
type ClientId = string
type OrderId = string

export interface IOrdersStore {
  orders: Order[]

  getLastForTable: (tableId: TableId) => Order | undefined

  placeOrder: (payload: { clientId: ClientId; tableId: TableId }) => OrderId

  updateStatus: (payload: { id: OrderId; status: Order['status'] }) => void

  getOrderById: (id: string) => Order | undefined
}

export class OrdersStore implements IOrdersStore {
  orders: IOrdersStore['orders'] = []

  constructor() {
    makeAutoObservable(this)
  }

  getLastForTable: IOrdersStore['getLastForTable'] = (tableId) =>
    R.findLast((order: Order) => order.tableId === tableId, this.orders)

  placeOrder: IOrdersStore['placeOrder'] = ({ clientId, tableId }) => {
    const id = String(Math.random() * 1000000)

    const newOrder: Order = {
      id,
      clientId,
      tableId,
      status: 'waiting-for-cooking',
    }

    this.orders.push(newOrder)

    return id
  }

  updateStatus: IOrdersStore['updateStatus'] = ({ id, status }) => {
    const order = this.orders.find((order) => order.id === id)

    if (order == null) {
      return
    }

    order.status = status
  }

  getOrderById: IOrdersStore['getOrderById'] = (id) =>
    this.orders.find((order) => order.id === id)
}
