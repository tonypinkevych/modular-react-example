import * as React from 'react'
import { IClientsStore } from './clients'
import { IDishesStore } from './dishes'
import { IOrdersStore } from './orders'
import { ITablesStore } from './tables'

interface IStores {
  clientsStore: IClientsStore
  dishesStore: IDishesStore
  ordersStore: IOrdersStore
  tablesStore: ITablesStore
}

const StoresContext = React.createContext<IStores>(null as any)

export const useStores = () => React.useContext(StoresContext)

export const StoresContextProvider: React.FC<IStores> = ({
  children,
  ...stores
}) => <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
