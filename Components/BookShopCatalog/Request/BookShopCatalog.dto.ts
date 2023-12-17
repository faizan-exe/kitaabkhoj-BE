import { Optional } from 'sequelize/types'

export type CreateBookShopCatalogDTO = {
    id: number
    book_id: number
    bookshop_id: number
    in_stock: number
    sold_copies: number
    unit_price: number
    used: boolean
}

export type UpdateBookShopCatalogDTO = Optional<CreateBookShopCatalogDTO, 'id'>

