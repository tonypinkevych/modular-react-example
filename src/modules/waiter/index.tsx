import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useServices } from '../../services'
import { useStores } from '../../stores'

import { useWaiterInteractor } from './interactor'
import { WaiterRouter } from './router'

export interface IProps {}
/**
 * @description Официант самый загруженный модуль. Он должен принимать заказы, приносить блюда и обрабатывать платежи.
 * Ввиду этого можно подумать над дальнейшим разделением модуля. К примеру на:
 * 1. Приём заказа (официант);
 * 2. Подание блюд (другой официнт/носильщик);
 * 3. Принятие платежей (бухгалтер).
 */
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
