import { Module } from "@nestjs/common";
// for .env
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BinModule } from "./bin/bin.module";

@Module({
	imports: [ConfigModule.forRoot(), BinModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor() {}
}
