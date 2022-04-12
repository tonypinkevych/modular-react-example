import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { useRootInteractor } from './interactor'
import { RootRouter } from './router'
import { Cook } from '../cook'
import { Hostess } from '../hostess'
import { Waiter } from '../waiter'
import { useStores } from '../../stores'

export interface IProps {}
/**
 * @description аналог ресторана. Решает когда и какой модуль должен быть представлен.
 * Cook (повар) в нашем случае должен быть активен всегда. Он выполняет утилитарную функцию.
 * Hostess (хостес) и Waiter (официант) появляются только когда для них есть работа.
 * Они её выполняют и отключаются.
 *
 * В данный момент почти все действия выполняются автоматически. Поэтому
 * @todo нужно добавить возможность клиенту вызывать разные требования:
 * 1. Посадку за столик;
 * 2. Пожелания по заказу.
 */
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
