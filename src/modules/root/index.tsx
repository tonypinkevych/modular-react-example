import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { useRootInteractor } from './interactor'
import { RootRouter } from './router'
import { Cook } from '../cook'
import { Hostess } from '../hostess'
import { Waiter } from '../waiter'
import { useStores } from '../../stores'

export interface IProps {}
export const Root: React.FC<IProps> = observer(() => {
  const { clientsStore, tablesStore, ordersStore } = useStores()
  const interactor = useRootInteractor({
    clientsStore,
    tablesStore,
    ordersStore,
  })

  return (
    <>
      {/* IN: for testing purposes only */}
      {clientsStore.clients.length === 0 && (
        <button onClick={() => clientsStore.addToQueue()}>
          Добавить клиента в очередь
        </button>
      )}
      {/* OUT: for testing purposes only */}

      {JSON.stringify(clientsStore)}
      {JSON.stringify(tablesStore)}
      {JSON.stringify(ordersStore)}

      <RootRouter
        cook={<Cook />}
        hostess={<Hostess />}
        waiter={<Waiter />}
        interactor={interactor}
      />
    </>
  )
})
