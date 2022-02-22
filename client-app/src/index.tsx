import ReactDOM from "react-dom";
import App from "./App/layout/App";
import reportWebVitals from "./reportWebVitals";
import "./App/layout/styles.css";
import { store, StoreContext } from "./App/store/store";
ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
