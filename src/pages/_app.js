import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider as StyledComponentProvider } from 'styled-components';
import {
  createMuiTheme,
  ThemeProvider as MaterialUiProvider,
} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  aviato: {
    bgColor: '#e1e1e1',
    filterColor: '#f5f5f5',
    btnColor: '#55bb06',
    fonts: {
      deep: '#202123',
      dark: '#707276',
      blue: '#5763b3',
    },
  },
});

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Aviato task</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
            as="font"
          />
        </Head>
        <StyledComponentProvider theme={theme}>
          <MaterialUiProvider theme={theme}>
            <StylesProvider injectFirst>
              <CssBaseline />
              <Component {...pageProps} />
            </StylesProvider>
          </MaterialUiProvider>
        </StyledComponentProvider>
      </>
    );
  }
}
