import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";

import App from "./components/App";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById("root")
);
