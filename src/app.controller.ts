import {
	Controller,
	Get,
	ArgumentsHost,
	HttpException,
	Catch,
	ExceptionFilter,
	UseFilters,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Request, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@UseFilters(HttpExceptionFilter)
	getHello(): string {
		return this.appService.getHello();
	}
}
