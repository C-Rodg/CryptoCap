const electronInstaller = require("electron-winstaller"),
	path = require("path");

const resultPromise = electronInstaller.createWindowsInstaller({
	appDirectory: "./builds/output/Coinbar-win32-x64",
	outputDirectory: "./builds/releases/Coinbar_win_64",
	exe: "Coinbar.exe",
	version: "1.0.1",
	setupExe: "CoinbarInstaller_64.exe"
});

resultPromise.then(
	() => console.log("Build for Win64 complete!"),
	e => console.log(e)
);
