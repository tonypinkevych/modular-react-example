import * as React from 'react'
import { useStores } from '../../stores'

import { useHostessInteractor } from './interactor'
import { HostessRouter } from './router'

export interface IProps {}
export const Hostess: React.FC<IProps> = () => {
  const { clientsStore, tablesStore } = useStores()
  const interactor = useHostessInteractor({ clientsStore, tablesStore })

  return <HostessRouter interactor={interactor} />
}
