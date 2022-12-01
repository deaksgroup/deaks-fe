import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";
import * as ReactDOMClient from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//axios.defaults.baseURL = "https://deaksappbe.herokuapp.com/api";
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.headers.common["secret_token"] = localStorage.getItem("Token");
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    if (error?.response?.data?.message) {
      return Promise.reject(error?.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

const root = ReactDOMClient.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
