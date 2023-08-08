import { 
  Injectable, 
  NestInterceptor, 
  ExecutionContext, 
  CallHandler,
  InternalServerErrorException ,
  Logger 
 } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly logger:Logger){}
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {

    return next
      .handle()
      .pipe(
        catchError((err)=> {
          let error=err;
          if(!err.statusCode){
            error=new InternalServerErrorException(err.message);  
          }
          this.logger.error(error)
          return throwError(()=> error)})
      );
  }
}
