import { ApiProperty } from "@nestjs/swagger";


export class ExceptionDTO {

    @ApiProperty()
    status: string;
    @ApiProperty({default: '2022-09-12T15:48:39.000-4:00'})
    timpestap: string;
    @ApiProperty({default:'message'})
    message: string;
    @ApiProperty({default: 'error type'})
    error: string;
    @ApiProperty({default: 'method: url'})
    path: string;

}