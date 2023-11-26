import { Optional } from 'sequelize/types'

export type CreateBookDTO = {
  id: number
  name : string; 
  price: number
}

export type UpdateBookDTO = Optional<CreateBookDTO, 'id'>

