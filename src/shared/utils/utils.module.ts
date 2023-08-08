import { Module, Global } from '@nestjs/common';
import { HeadersHandlerUtils } from './headers-handler.util';
@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [HeadersHandlerUtils],
    exports: [HeadersHandlerUtils]
})
export class UtilsModule {}
