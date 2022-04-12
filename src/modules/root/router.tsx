import * as React from 'react'

import { IRootInteractor } from './interactor'

export interface IProps {
  cook: React.ReactNode
  hostess: React.ReactNode
  waiter: React.ReactNode
  interactor: IRootInteractor
}
export const RootRouter: React.FC<IProps> = ({
  cook,
  hostess,
  waiter,
  interactor,
}) => (
  <>
    {interactor.children.cook && cook}
    {interactor.children.hostess && hostess}
    {interactor.children.waiter && waiter}
  </>
)
