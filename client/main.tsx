import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Handle HMR - re-render without creating new root
if (import.meta.hot) {
  import.meta.hot.accept("./App", () => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
}
