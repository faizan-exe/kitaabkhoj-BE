import { Optional } from 'sequelize/types'

export type CreateBookShopFinanceDTO = {
    id: number
    bookshop_id: number
    bank_account: string
    bank_name: string
    sadapay: string
}

export type UpdateBookShopFinanceDTO = Optional<CreateBookShopFinanceDTO, 'id'>

