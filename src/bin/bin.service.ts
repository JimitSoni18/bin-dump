import {
	Injectable,
	InternalServerErrorException,
	ServiceUnavailableException,
} from "@nestjs/common";
import { exec } from "child_process";
import async_exec from "util/async_exec";

@Injectable()
export class BinService {
	async createBin(): Promise<string> {
		try {
			const result = await async_exec("shuf -n 2 ./words.txt");
			if (result.stderr) {
				throw new ServiceUnavailableException();
			}
			return result.stdout.trim().replaceAll(/\n/g, "-");
		} catch (e) {
			console.error(e);
			throw new InternalServerErrorException();
		}
	}
}
