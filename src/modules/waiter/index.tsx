import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useServices } from '../../services'
import { useStores } from '../../stores'

import { useWaiterInteractor } from './interactor'
import { WaiterRouter } from './router'

export interface IProps {}
export const Waiter: React.FC<IProps> = observer(() => {
  const { dishesStore, ordersStore, tablesStore } = useStores()
  const { paymentTerminalService } = useServices()
  const interactor = useWaiterInteractor({
    dishesStore,
    ordersStore,
    tablesStore,
    paymentTerminalService,
  })

  return <WaiterRouter interactor={interactor} />
})
