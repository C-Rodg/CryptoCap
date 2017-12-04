const electronInstaller = require("electron-winstaller"),
	path = require("path");

const resultPromise = electronInstaller.createWindowsInstaller({
	appDirectory: "./builds/output/Coinbar-win32-ia32",
	outputDirectory: "./builds/releases/Coinbar_win_32",
	exe: "Coinbar.exe",
	version: "1.0.1",
	setupExe: "CoinbarInstaller_32.exe"
});

resultPromise.then(
	() => console.log("Build for Win32 complete!"),
	e => console.log(e)
);
