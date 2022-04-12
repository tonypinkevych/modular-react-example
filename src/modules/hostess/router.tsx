import * as React from 'react'

import { IHostessInteractor } from './interactor'

export interface IProps {
  interactor: IHostessInteractor
}
export const HostessRouter: React.FC<IProps> = ({ interactor }) => (
  <div>
    <p>Хостес</p>

    <button
      onClick={() => interactor.sitAtTheTable(String(Math.random() * 1000000))}
    >
      Сесть за столик
    </button>
  </div>
)
