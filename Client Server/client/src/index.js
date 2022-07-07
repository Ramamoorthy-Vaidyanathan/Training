import React from "react";
import { render } from "react-dom";
import App from "./App.js"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { mainReducer } from './services/reducers/rootReducer'

const store = createStore(mainReducer)

render(<Provider store={store}><App /></Provider>, document.getElementById("app"));

//React 18
// const container = document.getElementById("app")
// const root = createRoot(container)
// root.render(<h1>Hello World!</h1>);