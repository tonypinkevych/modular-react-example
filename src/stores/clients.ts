import { makeAutoObservable } from 'mobx'
import { Client } from '../interfaces'

type ClientId = string

export interface IClientsStore {
  clients: Client[]
  addToQueue: () => ClientId
  sitClient: (clientId: string) => void
}

export class ClientsStore implements IClientsStore {
  clients: IClientsStore['clients'] = []

  constructor() {
    makeAutoObservable(this)
  }

  addToQueue: IClientsStore['addToQueue'] = () => {
    const id = String(Math.random() * 1000000)

    this.clients.push({
      id,
    })

    return id
  }

  sitClient: IClientsStore['sitClient'] = (clientId) => {
    const index = this.clients.map((client) => client.id).indexOf(clientId)

    if (index === -1) {
      return
    }

    this.clients.splice(index, 1)
  }
}
