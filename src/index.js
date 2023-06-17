import React from "react";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

//HtmlWebpackPlugin without  a template
//Create root node first, then render into it
let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

render(<App />, document.getElementById("root"));
