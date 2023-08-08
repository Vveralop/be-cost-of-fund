import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CreateFundingController, SelectFundingController, UpdateFundingController, DeleteFundingController } from '../../adapter/controllers/funding';
import { CreateFundingService, DeleteFundingService, SelectFundingService, UpdateFundingService } from './services';
import { FundingSchema } from './models/funding.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'funding',
        schema: FundingSchema,
      },
    ]),
  ],
  controllers: [CreateFundingController, SelectFundingController, UpdateFundingController, DeleteFundingController],
  providers: [CreateFundingService, SelectFundingService, UpdateFundingService, DeleteFundingService],

})
export class FundingModule {}
