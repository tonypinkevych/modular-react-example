export type Order = {
  id: string
  tableId: string
  clientId: string
  status:
    | 'waiting-for-cooking'
    | 'cooking'
    | 'waiting-for-serving'
    | 'waiting-for-client'
    | 'waiting-for-payment'
    | 'closed'
  // @NOTE: также можем добавить любые другие нужные данные
}
