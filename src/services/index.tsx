import * as React from 'react'
import { IKitchenService } from './kitchen'
import { IPaymentTerminalService } from './payment-terminal'

interface IServices {
  kitchenService: IKitchenService
  paymentTerminalService: IPaymentTerminalService
}

const ServicesContext = React.createContext<IServices>(null as any)

export const useServices = () => React.useContext(ServicesContext)

export const ServicesContextProvider: React.FC<IServices> = ({
  children,
  ...services
}) => (
  <ServicesContext.Provider value={services}>
    {children}
  </ServicesContext.Provider>
)
