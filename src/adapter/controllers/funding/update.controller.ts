import { Body, Controller, Param, Patch, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFundingInput } from 'src/domain/funding/dto/create-funding.dto';
import { FundingKey } from 'src/domain/funding/models/funding.model';
import { UpdateFundingService } from 'src/domain/funding/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('funding')
@Controller('funding')
export class UpdateFundingController {
  constructor(private readonly fundingUpdateService: UpdateFundingService) {}
  @ApiParam({ name: 'id', type: String })
  @Patch('/:id')
  @ApiOperation({
    summary: 'Update some parameter with its ID',
  })
  @ApiBody({
    type: CreateFundingInput,
  })
  @ApiResponse({ status: 200, description: 'when returns a record' })
  @ApiResponse({ status: 404, description: 'when record not found' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })
  @Patch(':id')
  update(@Param('id') id: FundingKey, @Body() body: CreateFundingInput) {
    return this.fundingUpdateService.update(id, body);
  }
}
