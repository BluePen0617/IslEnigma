import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { AuContextProvider } from "./context/AuthContext.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

// 共用 css 樣式
import "./components/allReset.css"
import "./components/reset.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuContextProvider>
        <App />
      </AuContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
