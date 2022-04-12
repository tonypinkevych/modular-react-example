import { makeAutoObservable } from 'mobx'
import { Dish } from '../interfaces'

export interface IDishesStore {
  dishes: Dish[]
  placeDish: (dish: Dish) => void
  pickupDish: (dishId: Dish['id']) => void
}

export class DishesStore implements IDishesStore {
  dishes: IDishesStore['dishes'] = []

  constructor() {
    makeAutoObservable(this)
  }

  placeDish: IDishesStore['placeDish'] = (dish) => {
    this.dishes.push(dish)
  }

  pickupDish: IDishesStore['pickupDish'] = (dishId) => {
    const index = this.dishes.map((dish) => dish.id).indexOf(dishId)

    if (index === -1) {
      return
    }

    this.dishes.splice(index, 1)
  }
}
