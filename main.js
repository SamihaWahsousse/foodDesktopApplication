const {
	app,
	BrowserWindow,
	ipcMain,
	Notification,
} = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) return;
require("update-electron-app")();

const electronReload = require("electron-reload");
electronReload(__dirname, {});

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	ipcMain.handle("samiha", () => "samiha");
	win.loadFile("index.html");
};

//Show notification
const NOTIFICATION_TITLE = "New Notification";
const NOTIFICATION_BODY =
	"🥣🥗 Welcome to foodUniverse application 🍕🍝!";

function showNotification() {
	new Notification({
		title: NOTIFICATION_TITLE,
		body: NOTIFICATION_BODY,
	}).show();
}

app.whenReady().then(createWindow).then(showNotification);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
