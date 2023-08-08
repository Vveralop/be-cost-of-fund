import { Global, Module } from '@nestjs/common';
import { ErrorInterceptor } from './error.interceptor';
import { Logger } from '@nestjs/common/services';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [ErrorInterceptor,Logger],
    
})
export class InterceptorModule {}
