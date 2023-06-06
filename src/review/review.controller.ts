import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from './../auth/decorators/auth.decorator'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('leave/:productId')
  async leaveReview(@CurrentUser('id') id: number, @Body() dto: ReviewDto, @Param('productId') productId: string)
  {
    return this.reviewService.create(+id, dto, +productId);
  }

  @HttpCode(200)
  @Get('rating/:productId')
  async getAverageByProduct(@Param('productId') productId: string) {
    return this.reviewService.getAverageValueByReview(+productId);
  }
  
}
