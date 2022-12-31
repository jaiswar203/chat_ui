import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app'
import "../styles/css/index.css"
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from '../redux';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <NextUIProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor} >
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </NextUIProvider>
    </>
  );
}

export default MyApp