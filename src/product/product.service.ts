import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { generateSlug } from 'src/utils/generate-slug'
import { PaginationService } from './../pagination/pagination.service'
import { PrismaService } from './../prisma.service'
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './dto/product.dto'
import { returnProductObject, returnProductObjectFullest } from './return-product.object'

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService
        ) {}

    async getAll(dto: GetAllProductDto = {}) {
        const { sort, searchTerm } = dto
        
        const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

        switch(sort) {
            case EnumProductSort.HIGH_PRICE:
                prismaSort.push({ price: 'asc' })
                break

            case EnumProductSort.LOW_PRISE: 
                prismaSort.push({ price: 'desc' })
                break

            case EnumProductSort.NEWEST:
                prismaSort.push({ createdAt: 'asc' })
                break

            case EnumProductSort.OLDEST:
                prismaSort.push({ createdAt: 'desc' })
                break
        }

        const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm ? {
            OR: [
                {
                    category: {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                },
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    },
                },
                {
                    description: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }
            ]
        } : {}

        const { skip, perPage } = await this.paginationService.getPagination(dto)

        const products = await this.prisma.product.findMany({
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip,
            take: perPage,
            select: returnProductObject
        })

        return {
            products, length: await this.prisma.product.count({  where: prismaSearchTermFilter })
        }
    }



    async byId(id: number) {

        const product = this.prisma.product.findUnique({
            where: {
                id
            },
            select: returnProductObjectFullest
        })

        if (!product) {
            throw new NotFoundException('Product not found')
        }

        return product
    }

    async bySlug(slug: string) {

        const product = this.prisma.product.findUnique({
            where: {
                slug
            },
            select: returnProductObjectFullest
        })

        if (!product) {
            throw new Error('Product not found')
        }

        return product
    }

    async byCategory(categorySlug: string) {

        const product = this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            },
            select: returnProductObjectFullest
        })

        if (!product) {
            throw new Error('Product not found')
        }

        return product
    }

    async getSimilar(id: number) {

        const currentProduct = await this.byId(id)

        if (!currentProduct) {
            throw new NotFoundException('Current product not found')
        }

        const products = this.prisma.product.findMany({
            where: {
                category: {
                    name: currentProduct.category.name
                },
                NOT: {
                    id: currentProduct.id
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: returnProductObject
        })

        return products
    }

    async createProduct(dto: ProductDto) {

        const {name, description, price, images, categoryId} = dto
 
        await this.prisma.product.create({
            data: {
                slug: generateSlug(dto.name),
                name,
                description,
                price,
                images,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })

        return { message: 'Success' }
 
    }

    async updateProduct(id: number, dto: ProductDto) {

        const {name, description, price, images, categoryId} = dto
 
        return this.prisma.product.update({
            where: {
                id
            },
            data: {
                slug: generateSlug(dto.name),
                name,
                description,
                price,
                images,
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        })
 
    }

    async deleteProduct(id: number) {
 
        await this.prisma.product.delete({
            where: {
                id
            }
        })

        return { message: 'Success' }
 
    } 
}
