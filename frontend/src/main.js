import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./helpers/hooks/useAuth";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const queryClient = new QueryClient();
let persistor = persistStore(store);

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default Main;
