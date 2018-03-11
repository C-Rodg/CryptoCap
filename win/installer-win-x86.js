const electronInstaller = require("electron-winstaller"),
	path = require("path");

const resultPromise = electronInstaller.createWindowsInstaller({
	appDirectory: "./builds/output/CryptoCap-win32-ia32",
	outputDirectory: "./builds/releases/CryptoCap_win_x86",
	exe: "CryptoCap.exe",
	version: "1.0.4",
	setupExe: "CryptoCapInstaller_x86.exe"
});

resultPromise.then(
	() => console.log("Build for Win32 complete!"),
	e => console.log(e)
);
