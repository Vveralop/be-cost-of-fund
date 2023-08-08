import { Controller, Delete, Param, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FundingKey } from 'src/domain/funding/models/funding.model';
import { DeleteFundingService } from 'src/domain/funding/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('funding')
@Controller('funding')
export class DeleteFundingController {
  constructor(private readonly fundingDeleteService: DeleteFundingService) {}

  @Delete(':id')
  delete(@Param('id') id: FundingKey) {
    return this.fundingDeleteService.delete(id);
  }
}
