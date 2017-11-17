const menubar = require("menubar");
const path = require("path");
const url = require("url");

let dev = false,
	indexPath = "";

if (
	process.defaultApp ||
	/[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
	/[\\/]electron[\\/]/.test(proccess.execPath)
) {
	dev = true;
}

if (dev && process.argv.indexOf("--noDevServer") === -1) {
	indexPath = url.format({
		protocol: "http:",
		host: "localhost:8080",
		pathname: "index.html",
		slashes: true
	});
} else {
	indexPath = url.format({
		protocol: "file:",
		pathname: path.join(__dirname, "dist", "index.html"),
		slashes: true
	});
}

const mb = menubar({
	tooltip: "One click away!",
	icon: "src/static/icon.png",
	index: indexPath
});

mb.on("ready", () => {
	console.log("App is ready!");
});

mb.on("after-create-window", () => {
	if (dev) {
		mb.window.openDevTools();
	}
});

mb.on("after-close", () => {
	console.log("window object has been deleted.");
});
