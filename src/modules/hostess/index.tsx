import * as React from 'react'
import { useStores } from '../../stores'

import { useHostessInteractor } from './interactor'
import { HostessRouter } from './router'

export interface IProps {}
/**
 * @description Хостес включается в работу когда новый клиент появляется в очереди.
 * После этого хостес находит свободный столик и проводит клиента туда.
 * @todo добавить обработку ошибок, если нет свободных столиков.
 */
export const Hostess: React.FC<IProps> = () => {
  const { clientsStore, tablesStore } = useStores()
  const interactor = useHostessInteractor({ clientsStore, tablesStore })

  return <HostessRouter interactor={interactor} />
}
