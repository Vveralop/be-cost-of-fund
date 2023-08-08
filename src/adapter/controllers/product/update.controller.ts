import { Body, Controller, Param, Patch, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductInput } from 'src/domain/product/dto/create-product.dto';
import { ProductKey } from 'src/domain/product/models/product.model';
import { UpdateProductService } from 'src/domain/product/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('product')
@Controller('product')
export class UpdateProductController {
  constructor(private readonly productUpdateService: UpdateProductService) {}
  @ApiParam({ name: 'id', type: String })
  @Patch('/:id')
  @ApiOperation({
    summary: 'Update some parameter with its ID',
  })
  @ApiBody({
    type: CreateProductInput,
  })
  @ApiResponse({ status: 200, description: 'when returns a record' })
  @ApiResponse({ status: 404, description: 'when record not found' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  @Patch(':id')
  update(@Param('id') id: ProductKey, @Body() body: CreateProductInput) {
    return this.productUpdateService.update(id, body);
  }
}
