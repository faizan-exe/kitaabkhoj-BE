
    import { Optional } from 'sequelize/types'

export type CreateOrderDTO = {
    id: number;
    bookshopcatalog_id: number;
    customer_id: number;
    delivery_duration: number;
    delivery_location: string
    no_of_copies: number;
    delivered: boolean
}

export type UpdateOrderDTO = Optional<CreateOrderDTO, 'id'>
