import * as React from 'react'

import { IHostessInteractor } from './interactor'

export interface IProps {
  interactor: IHostessInteractor
}
export const HostessRouter: React.FC<IProps> = ({ interactor }) => (
  <p>hostess</p>
)
