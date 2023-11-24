import { Optional } from 'sequelize/types'

export type CreateMineralDTO = {
  id: number
  name : string; 
  price: number
}

export type UpdateMineralDTO = Optional<CreateMineralDTO, 'id'>

