/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { SPAN_ID, TRANSACTION_ID, PARENT_ID } from '../utils/constants';
import { randomUUID } from 'crypto';
import { HttpExceptionFilter } from '../interceptor/http.exception.filter';


@UseFilters(HttpExceptionFilter)
@Injectable()
export class HeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {

    if(!!req.headers[SPAN_ID]) res.setHeader(PARENT_ID, req.headers[SPAN_ID])

    if(!req.headers[TRANSACTION_ID]) req.headers[TRANSACTION_ID]=randomUUID() 
    req.headers[SPAN_ID] = randomUUID();

    res.setHeader(TRANSACTION_ID, req.headers[TRANSACTION_ID])
    res.setHeader(SPAN_ID, req.headers[SPAN_ID])
    
    

    next();
  }
}
