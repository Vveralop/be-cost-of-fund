import { Controller, Delete, Param, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductKey } from 'src/domain/product/models/product.model';
import { DeleteProductService } from 'src/domain/product/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('product')
@Controller('product')
export class DeleteProductController {
  constructor(private readonly productDeleteService: DeleteProductService) {}

  @Delete(':id')
  delete(@Param('id') id: ProductKey) {
    return this.productDeleteService.delete(id);
  }
}
