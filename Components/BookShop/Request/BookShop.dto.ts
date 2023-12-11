import { Optional } from 'sequelize/types'

export type CreateBookShopDTO = {
  id: number
  name : string; 
  price: number
}

export type UpdateBookShopDTO = Optional<CreateBookShopDTO, 'id'>

