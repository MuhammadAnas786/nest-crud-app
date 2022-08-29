import { ArgumentsHost, Catch, NotFoundException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export default class ExceptionLoggerFilter extends BaseExceptionFilter{
    catch(exception: any, host: ArgumentsHost): void {
        console.log("Exception Thrown", exception)
        super.catch(exception,host)
    }
}