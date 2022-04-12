import * as R from 'ramda'
import { makeAutoObservable } from 'mobx'
import { AllTablesFulfilledException, Result } from '../exceptions'

type TableId = string
type ClientId = string

/**
 * @description Хранилище всех столиков и их загруженность.
 */
export interface ITablesStore {
  tables: Record<TableId, ClientId | null>

  fulfillTable: (
    clientId: string
  ) => Promise<Result<TableId, AllTablesFulfilledException>>

  fulfilledTables: TableId[]

  getTableByClient: (clientId: ClientId) => TableId | undefined
}

export class TablesStore implements ITablesStore {
  // @NOTE: представим, что в нашем ресторане есть всего 5 столиков.
  tables: Record<TableId, ClientId | null> = {
    'table-1': null,
    'table-2': null,
    'table-3': null,
    'table-4': null,
    'table-5': null,
  }

  constructor() {
    makeAutoObservable(this)
  }

  fulfillTable: ITablesStore['fulfillTable'] = async (clientId) => {
    const firstEmptyTableId = this.getFirstEmptyTableId()

    // @NOTE: throw an error if we have no empty table in the list
    if (firstEmptyTableId == null) {
      throw new AllTablesFulfilledException()
    }

    // @NOTE: assign actual client to the table
    this.tables[firstEmptyTableId] = clientId

    return firstEmptyTableId
  }

  get fulfilledTables() {
    return R.keys(this.tables).filter((key) => this.tables[key] != null)
  }

  getTableByClient: ITablesStore['getTableByClient'] = (clientId) =>
    R.keys(this.tables).find((key) => this.tables[key] === clientId)

  private getFirstEmptyTableId = () => {
    const firstEmptyTableId = R.keys(this.tables).find((key) => {
      const value = this.tables[key]
      const isEmpty = value == null
      return isEmpty
    })

    return firstEmptyTableId
  }
}
