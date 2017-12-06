const menubar = require("menubar");
const { Menu, shell } = require("electron");
const path = require("path");
const url = require("url");

let dev = false,
	indexPath = "";

// Squirrel AutoUpdater/Packager
if (require("electron-squirrel-startup")) return;

if (handleSquirrelEvent()) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	return;
}

function handleSquirrelEvent() {
	if (process.argv.length === 1) {
		return false;
	}

	const ChildProcess = require("child_process");
	const path = require("path");

	const appFolder = path.resolve(process.execPath, "..");
	const rootAtomFolder = path.resolve(appFolder, "..");
	const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"));
	const exeName = path.basename(process.execPath);

	const spawn = function(command, args) {
		let spawnedProcess, error;

		try {
			spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
		} catch (error) {}

		return spawnedProcess;
	};

	const spawnUpdate = function(args) {
		return spawn(updateDotExe, args);
	};

	const squirrelEvent = process.argv[1];
	switch (squirrelEvent) {
		case "--squirrel-install":
		case "--squirrel-updated":
			// Optionally do things such as:
			// - Add your .exe to the PATH
			// - Write to the registry for things like file associations and
			//   explorer context menus

			// Install desktop and start menu shortcuts
			spawnUpdate(["--createShortcut", exeName]);

			setTimeout(app.quit, 1000);
			return true;

		case "--squirrel-uninstall":
			// Undo anything you did in the --squirrel-install and
			// --squirrel-updated handlers

			// Remove desktop and start menu shortcuts
			spawnUpdate(["--removeShortcut", exeName]);

			setTimeout(app.quit, 1000);
			return true;

		case "--squirrel-obsolete":
			// This is called on the outgoing version of your app before
			// we update to the new version - it's the opposite of
			// --squirrel-updated

			app.quit();
			return true;
	}
}

if (
	process.defaultApp ||
	/[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
	/[\\/]electron[\\/]/.test(process.execPath)
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
	tooltip: "Coinbar",
	icon: path.join(__dirname, "assets", "icons", "png", "cb_tray_icon_v2.png"),
	index: indexPath,
	alwaysOnTop: dev,
	width: 800,
	height: 405
});

mb.on("ready", () => {
	// Never highlight tray icon on OS X
	mb.tray.setHighlightMode("never");

	// Allow right click context menu
	const contextMenu = Menu.buildFromTemplate([
		{
			label: "Learn More",
			click: () => {
				shell.openExternal("https://curtisrodgers.com/Coinbar");
			}
		},
		{ label: "Exit", role: "quit" }
	]);
	mb.tray.setContextMenu(contextMenu);
});

// Open dev tools if needed
mb.on("after-create-window", () => {
	if (dev) {
		mb.window.openDevTools();
	}
});
