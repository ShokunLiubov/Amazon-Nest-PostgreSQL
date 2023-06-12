import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from './../../pagination/pagination.dto'

export enum EnumProductSort {
    HIGH_PRICE = 'high-price',
    LOW_PRISE = 'low-price',
    NEWEST = 'newest',
    OLDEST = 'oldest'
}

export class GetAllProductDto extends PaginationDto {
    @IsOptional()
    @IsEnum(EnumProductSort)
    sort?: EnumProductSort

    @IsString()
    @IsOptional()
    searchItems?: string
};