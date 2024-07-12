import { exec } from "child_process";

export default function(command: string): Promise<{ stderr: string, stdout: string }> {
	return new Promise((res, rej) => {
		exec(command, (e, stdout, stderr) => {
			if (e) {
				rej(e);
				return;
			}
			res({ stdout, stderr })
		});
	})
}
