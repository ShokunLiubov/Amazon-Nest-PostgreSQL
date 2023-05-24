import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productService.byId(+id);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug);
  }

  @Get('by-category/:category')
  async byCategory(@Param('category') category: string) {
    return this.productService.byCategory(category);
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(+id);
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async createProduct(@Body() dto: ProductDto) {
    return this.productService.createProduct(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.updateProduct(+id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(+id)
  }
}
