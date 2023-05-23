import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from './../utils/generate-slug'
import { CategoryDto } from './category.dto'
import { returnCategoryObject } from './return-category.object'

@Injectable()
export class CategoryService {

    constructor (private prisma: PrismaService) {}

    async byId(id: number) {

        const category = this.prisma.category.findUnique({
            where: {
                id
            },
            select: returnCategoryObject
        })

        if(!category) {
            throw new NotFoundException('Category not found')
        }

        return category
    }

    async bySlug(slug: string) {

        const category = this.prisma.category.findUnique({
            where: {
                slug
            },
            select: returnCategoryObject
        })

        if(!category) {
            throw new Error('Category not found')
        }

        return category
    }

    async getAll() {
        return this.prisma.category.findMany({
            select: returnCategoryObject
        })
    }

    async createCategory (dto: CategoryDto) {
 
        await this.prisma.category.create({
            data: {
                name: dto.name,
                slug: generateSlug(dto.name)
            }
        })

        return { message: 'Success' }
 
    }

    async updateCategory (id: number, dto: CategoryDto) {
 
        return this.prisma.category.update({
            where: {
                id
            },
            data: {
                name: dto.name,
                slug: generateSlug(dto.name)
            }
        })
 
    }

    async deleteCategory (id: number) {
 
        await this.prisma.category.delete({
            where: {
                id
            }
        })

        return { message: 'Success' }
 
    }
}