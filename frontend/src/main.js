import React from "react";
import { store } from './store/store';
import { Provider } from 'react-redux';
import { MantineProvider } from "@mantine/core";
import { BrowserRouter} from "react-router-dom";
import Routes from "./routes";

const Main = () => {
return (
  <Provider store={store}>
    <MantineProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MantineProvider>
  </Provider>
)
}

export default Main