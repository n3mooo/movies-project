import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import store from "app/Store";
import ErrorFallback from "common/utils/ErrorFallback";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <App />
            </ErrorBoundary>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
