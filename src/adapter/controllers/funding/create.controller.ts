import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFundingInput } from 'src/domain/funding/dto/create-funding.dto';
//import { CreateFundingInput } from 'src/domain/funding/dto/cretae-fund.dto';
import { CreateFundingService } from 'src/domain/funding/services';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('funding')
@Controller('funding')
export class CreateFundingController {
  constructor(private readonly fundingCreateService: CreateFundingService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Endpoint for Cost of Funds parameters',
  })
  @ApiBody({ type: CreateFundingInput })
  @ApiResponse({ status: 201, description: 'When the record is created.' })
  @ApiResponse({ status: 400, description: 'When these is Bad Request.' })
  @ApiResponse({ status: 500, description: "500's when another error occurs." })

  async create(@Body() body: CreateFundingInput) {
    return await this.fundingCreateService.create(body);
  }
}
