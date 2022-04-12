import * as React from 'react'
import { useServices } from '../../services'
import { useStores } from '../../stores'

import { useCookInteractor } from './interactor'

export interface IProps {}
export const Cook: React.FC<IProps> = () => {
  const { dishesStore, ordersStore } = useStores()
  const { kitchenService } = useServices()
  useCookInteractor({
    dishesStore,
    ordersStore,
    kitchenService,
  })
  return null
}
