import { LoggerModule as LM } from 'nestjs-pino'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { DateTime } from 'luxon';
import { SPAN_ID, TRANSACTION_ID, PARENT_ID } from '../../shared/utils/constants';
import { randomUUID } from 'crypto';
import { HeadersMiddleware } from '../../shared/middleware/headers.middleware';
import { LoggerService } from "./logger.service";

@Module({
	imports: [
		LM.forRoot({
			pinoHttp: {
				transport:process.env.ENVIRONMENT === 'dev'?{
					target:'pino-pretty',
					options:{
						ignore:'time'
					}
				} : undefined,
				useLevel: process.env.ENVIRONMENT === 'dev' ? 'debug' : 'info',
				messageKey: 'message',
				autoLogging: true,
				base:null,
				customProps: (req: IncomingMessage) => {
					return {
						consumer: 11,
						correlationID: randomUUID(),
						spanID: req.headers[SPAN_ID],
						//payload: req['body']!,  Devolver
						payload: '{body}',
						parentID: req.headers[PARENT_ID] ?? '',
						transactionID: req.headers[TRANSACTION_ID] ?? randomUUID(),
						type: process.env.TYPE,
						env: process.env.ENV,
						timestamp: DateTime.local().setZone('America/Santiago').toISO(),
						component: process.env.COMPONENT,
					};
				},
				formatters: {
					level: (label: any) => ({ level: undefined, severity: label.toUpperCase() }),
				},
				serializers: {
					req: (_req: any) => () => {
						return undefined
					},
					res: (_res: any) => {
						return undefined
					}
				}
			}
		}),
	],
	providers: [LoggerService],
    exports: [LoggerService]
})
export class LoggerModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HeadersMiddleware).forRoutes('');
	}
}
