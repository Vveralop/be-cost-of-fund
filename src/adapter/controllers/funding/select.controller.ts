import { Controller, Get, NotFoundException, Param, UseFilters } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { FundingKey } from 'src/domain/funding/models/funding.model';
import { SelectFundingService } from 'src/domain/funding/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('funding')
@Controller('funding')
export class SelectFundingController {
  constructor(private readonly fundingService: SelectFundingService) {}

  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  @ApiOperation({
    summary: 'Returns some Cost of Found parameter with its ID',
  })
  @ApiResponse({ status: 200, description: 'when returns a record' })
  @ApiResponse({ status: 404, description: 'when record not found' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  @Get(':id')
  async findOne(@Param('id') id: FundingKey) {
    const fund = await this.fundingService.findOne(id);
    if (!fund) {
      throw new NotFoundException();
    }
    return fund;
  }
}
