import { Controller, Get, NotFoundException, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { BinService } from "./bin.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("bin")
export class BinController {
	constructor(private readonly binService: BinService) {}

	@Get("create")
	async createBin() {
		return { success: true, name: await this.binService.createBin() };
	}

	@Get("join/:id")
	async getBin(@Param('id') id: string) {
		throw new NotFoundException(`Someone does not want you to join their room ${id}`);
	}

	@Post('upload/:id')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		console.log({file});
	}
}
