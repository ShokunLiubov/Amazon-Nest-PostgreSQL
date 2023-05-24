import { Injectable } from '@nestjs/common'
import { PrismaService } from './../prisma.service'
import { UserService } from './../user/user.service'

@Injectable()
export class StatisticsService {
    constructor(
        private prisma: PrismaService, 
        private userService: UserService
    ) {}

    async getMain(userId: number) {
        const user = await this.userService.byId(userId, {
            orders: {
                select: {
                    items: true
                }
            },
            reviews: true
        })

        const totalAmount = await this.prisma.$queryRaw`
            SELECT SUM("Order_item".price * "Order_item".quantity) AS totalAmount 
            FROM "Order" 
            JOIN "Order_item" ON "Order".id = "Order_item"."order_id" 
            WHERE "Order".user_id = ${userId}
        `

        return [
            {
                name: 'Orders',
                value: user.orders.length
            },
            {
                name: 'Reviews',
                value: user.reviews.length
            },
            {
                name: 'Favorites',
                value: user.favorites.length
            },
            {
                name: 'Total amount',
                value: totalAmount
            }
        ]

    }
}
