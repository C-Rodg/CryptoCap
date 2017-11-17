const menubar = require("menubar");

const mb = menubar({
	tooltip: "One click away!",
	icon: "src/static/icon.png",
	index: Path.join("file://", __dirname, "dist", "index.html")
});

mb.on("ready", () => {
	console.log("App is ready!");
});
