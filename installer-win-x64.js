const electronInstaller = require("electron-winstaller"),
	path = require("path");

const resultPromise = electronInstaller.createWindowsInstaller({
	appDirectory: "./builds/output/CryptoCap-win32-x64",
	outputDirectory: "./builds/releases/CryptoCap_win_x64",
	exe: "CryptoCap.exe",
	version: "1.0.1",
	setupExe: "CryptoCapInstaller_x64.exe"
});

resultPromise.then(
	() => console.log("Build for Win64 complete!"),
	e => console.log(e)
);
