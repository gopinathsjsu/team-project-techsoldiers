import React from "react";
import { store } from './store/store';
import { Provider } from 'react-redux';
import { MantineProvider } from "@mantine/core";
import { BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./helpers/hooks/useAuth";

const Main = () => {
return (
  <Provider store={store}>
    <MantineProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  </Provider>
)
}

export default Main