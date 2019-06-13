// Libraries
const menubar = require('menubar');
const { Menu, shell, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const axios = require('axios');

// Keys
const apiKeys = require('./keys');

//  -------  DEV SETUP  --------- //
let dev = false,
	indexPath = '';

if (
	process.defaultApp ||
	/[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
	/[\\/]electron[\\/]/.test(process.execPath)
) {
	dev = true;
}

if (dev && process.argv.indexOf('--noDevServer') === -1) {
	indexPath = url.format({
		protocol: 'http:',
		host: 'localhost:8080',
		pathname: 'index.html',
		slashes: true
	});
} else {
	indexPath = url.format({
		protocol: 'file:',
		pathname: path.join(__dirname, 'dist', 'index.html'),
		slashes: true
	});
}

//  ------- MENUBAR CONFIGURATION --------- //
const mb = menubar({
	tooltip: 'CryptoCap',
	icon: path.join(__dirname, 'assets', 'icons', 'png', 'iconTemplate.png'),
	index: indexPath,
	alwaysOnTop: dev,
	width: 820,
	height: 405,
	preloadWindow: true
});

mb.on('ready', function() {
	// Never highlight tray icon on OS X
	this.tray.setHighlightMode('never');

	// Allow right click context menu
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Learn More',
			click: () => {
				shell.openExternal('https://curtisrodgers.com/CryptoCap');
			}
		},
		{ label: 'Quit', role: 'quit' }
	]);

	// attach context menu to right-click event
	this.tray.on('right-click', () => {
		this.tray.popUpContextMenu(contextMenu);
	});
});

// Open dev tools if needed
mb.on('after-create-window', () => {
	if (dev) {
		mb.window.openDevTools();
	}
});

//  ------- MAIN EVENTS --------- //

// Get Global Market Data
let lastGlobalResponse = null;
let lastGlobalResponseDate = null;
ipcMain.on('api-get-global', event => {
	const today = new Date().getDate();
	if (today === lastGlobalResponseDate && lastGlobalResponse) {
		// Serve from cache
		event.sender.send('api-get-global-response', lastGlobalResponse);
	} else {
		// If first attempt or it's been more than a day, make request
		axios({
			method: 'get',
			url: `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`,
			headers: { 'X-CMC_PRO_API_KEY': apiKeys.getGlobalApiKey() }
		})
			.then(response => {
				lastGlobalResponse = response.data.data;
				lastGlobalResponseDate = new Date().getDate();
				event.sender.send('api-get-global-response', lastGlobalResponse);
			})
			.catch(() => {
				event.sender.send('api-get-global-response', { error: true });
			});
	}
});
