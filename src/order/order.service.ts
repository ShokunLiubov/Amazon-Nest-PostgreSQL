import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnProductObject } from 'src/product/return-product.object'
import { OrderDto } from './dto/order.dto'

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async getAll(userId: number) {
        const orders = this.prisma.order.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: returnProductObject
                        }
                    }
                }
            }
        })

    }

    async placeOrder(dto: OrderDto, userId: number) {

        const total = dto.items.reduce((acc, item)=> acc + item.price * item.quantity, 0)

        const order = await this.prisma.order.create({
            data: {
                status: dto.status,
                items: {
                    create: dto.items
                },
                total,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return order

    }
}
