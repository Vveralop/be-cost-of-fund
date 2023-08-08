import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, InternalServerErrorException, NotFoundException, RequestTimeoutException } from "@nestjs/common";

@Catch(
    NotFoundException,
    BadRequestException,
    RequestTimeoutException,
    InternalServerErrorException
)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const message = exception.message;

        response
            .status(status)
            .json({
                statusCode: status,
//                timestamp: new Date().toISOString(),
                message: message,
                data: request.url
            })
    }
}


