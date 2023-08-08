import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerService {
  constructor(
    private logger1: PinoLogger
  ){}
    //private readonly logger = new Logger(LoggerService.name)

    errorLog(err: unknown) {
      this.logger1.error(err);
      }
    infoLog(err: unknown){
      this.logger1.info(err)
    }

    catchError(codeError: string, statusError: string, messageError: string){
      this.errorLog(messageError);
      if (codeError === '404') {
        throw new NotFoundException(messageError, statusError);
      }
      if (codeError === '401') {
        throw new UnauthorizedException(messageError, statusError);
      }
      if (codeError === '400') {
        throw new BadRequestException(messageError, statusError);
      }
      if (codeError === '504') {
        throw new RequestTimeoutException(messageError, statusError);
      }
      throw new InternalServerErrorException(messageError, statusError);
    }
}
