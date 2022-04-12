import * as React from 'react'
import '../src/styles/global.css'
import type { AppProps } from 'next/app'

import { ServicesContextProvider } from '../src/services'
import { StoresContextProvider } from '../src/stores'

import { IKitchenService, KitchenService } from '../src/services/kitchen'
import {
  IPaymentTerminalService,
  PaymentTerminalService,
} from '../src/services/payment-terminal'
import { DishesStore, IDishesStore } from '../src/stores/dishes'
import { IOrdersStore, OrdersStore } from '../src/stores/orders'
import { ITablesStore, TablesStore } from '../src/stores/tables'
import { ClientsStore, IClientsStore } from '../src/stores/clients'

function MyApp({ Component, pageProps }: AppProps) {
  // @NOTE: мы используем useRef здесь, в случае если захотим инициировать
  // сервисы и хранилища с какими-то конфигурациями.
  // К примеру с использованием env переменных, или переменных полученных с сервера.
  const kitchenService = React.useRef<IKitchenService>(new KitchenService())
  const paymentTerminalService = React.useRef<IPaymentTerminalService>(
    new PaymentTerminalService()
  )

  const clientsStore = React.useRef<IClientsStore>(new ClientsStore())
  const dishesStore = React.useRef<IDishesStore>(new DishesStore())
  const ordersStore = React.useRef<IOrdersStore>(new OrdersStore())
  const tablesStore = React.useRef<ITablesStore>(new TablesStore())

  return (
    <ServicesContextProvider
      kitchenService={kitchenService.current}
      paymentTerminalService={paymentTerminalService.current}
    >
      <StoresContextProvider
        clientsStore={clientsStore.current}
        dishesStore={dishesStore.current}
        ordersStore={ordersStore.current}
        tablesStore={tablesStore.current}
      >
        <Component {...pageProps} />
      </StoresContextProvider>
    </ServicesContextProvider>
  )
}

export default MyApp
