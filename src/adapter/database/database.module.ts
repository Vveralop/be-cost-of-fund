import { DynamooseModule } from 'nestjs-dynamoose';
import { Module } from '@nestjs/common';

@Module({
	imports: [
        DynamooseModule.forRoot({
           local: process.env.IS_DDB_LOCAL === 'true',
          //local: 'http://localhost:8000',
          aws: { 
            region: process.env.REGION,
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY, //'vveral'
          },
          table: {
            create: true, //process.env.IS_DDB_LOCAL === 'true', --Probar en ambiente distinto
          },
        }),
	],
	controllers: [],
	providers: [],
}
)
export class Database {}
