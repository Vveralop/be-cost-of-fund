import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFundingInput {
  @IsNotEmpty()
  @IsString()
  marketdata: string;

  @IsNotEmpty()
  @IsString()
  curve: string;
}
