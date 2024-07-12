import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { readFileSync } from "fs";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";

const HOME_DIR = process.env.HOME_DIR;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		httpsOptions: {
			key: readFileSync(`${HOME_DIR}/certs/key.pem`),
			cert: readFileSync(`${HOME_DIR}/certs/cert.pem`),
		},
	});
	app.enableCors();
	await app.useGlobalPipes(new ValidationPipe()).listen(3000);
}
bootstrap();
