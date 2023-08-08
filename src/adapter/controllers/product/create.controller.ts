import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductInput } from 'src/domain/product/dto/create-product.dto';
import { CreateProductService } from 'src/domain/product/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('product')
@Controller('product')
export class CreateProductController {
  constructor(private readonly productCreateService: CreateProductService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Endpoint for Cost of Funds parameters',
  })
  @ApiBody({ type: CreateProductInput })
  @ApiResponse({ status: 201, description: 'When the record is created' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  create(@Body() body: CreateProductInput) {
    return this.productCreateService.create(body);
  }
}
