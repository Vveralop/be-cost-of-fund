import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PARENT_ID, TRANSACTION_ID, CONSUMER_ID, SPAN_ID } from './constants';


@Injectable()
export class HeadersHandlerUtils {
    formatHeaders( req:Request ){
        const headers = {
			[PARENT_ID]: req.headers[SPAN_ID],
			[TRANSACTION_ID]: req.headers[TRANSACTION_ID],
			[CONSUMER_ID]: process.env.APP_ID,
		}
        return headers
    }
}