import * as React from 'react'

import { IWaiterInteractor } from './interactor'

export interface IProps {
  interactor: IWaiterInteractor
}
export const WaiterRouter: React.FC<IProps> = ({ interactor }) => <p>waiter</p>
