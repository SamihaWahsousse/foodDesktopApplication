// Modules de controle du cycle de vie de l'application et de création
// de fenêtre native de navigateur
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
		icon: __dirname + "./assets/images/iconApp.ico",
		webPreferences: {
			//La chaîne de caractères __dirname pointe vers le chemin du script en cours d'exécution (dans notre cas, le dossier racine de votre projet).
			preload: path.join(__dirname, "preload.js"),
		},
	});
	// ipcMain.handle("samiha", () => "samiha");
	// Chargement de l'index.html de l'application.
	win.loadFile("index.html");
};

//Show notification
const NOTIFICATION_TITLE = "New Notification";
const NOTIFICATION_BODY =
	"🥣🥗 Welcome to foodUniverse application 🍕";

function showNotification() {
	new Notification({
		title: NOTIFICATION_TITLE,
		body: NOTIFICATION_BODY,
	}).show();
}

app.whenReady().then(createWindow).then(showNotification);

// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. Dans ce cas il est courant
// que les applications et barre de menu restents actives jusqu'à ce que l'utilisateur quitte
// de manière explicite par Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	// Sur macOS il est commun de re-créer une fenêtre  lors
	// du click sur l'icone du dock et qu'il n'y a pas d'autre fenêtre ouverte.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
