import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    @Get()
    @HttpCode(200)
    healthcheck(): string {
      return "Server it's running ok.";
    }
}
