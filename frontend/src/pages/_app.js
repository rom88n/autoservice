// base
import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from 'notistack';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import { MessageContainer, GlobalSpinner } from 'components';
import theme from 'helpers/theme';
import { createApolloClient } from 'apollo';
import { compose } from 'redux'
import configureStore from '../redux';

const apolloClient = createApolloClient();
const { store, persistor } = configureStore(apolloClient, Router);

// helpers

import 'bootstrap/dist/css/bootstrap.min.css'

const styles = {
  root: {
    '& body': {
      fontSize: '13px'
    },
    '& button': {
      '&:focus': {
        outline: 'none'
      }
    }
  }
}

class _App extends App {
  state = {
    isMounted: false
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, router, classes } = this.props
    const { isMounted } = this.state

    if (!isMounted) return null;

    const Layout = Component.Layout ? Component.Layout : React.Fragment
    return (
      <div className={classes.root}>
        <ApolloProvider client={apolloClient}>
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <Layout>
                    <Component
                      router={router}
                      {...pageProps}
                    />
                  </Layout>
                  <MessageContainer/>
                  <GlobalSpinner/>
                </PersistGate>
              </Provider>
            </SnackbarProvider>
          </MuiThemeProvider>
        </ApolloProvider>
      </div>
    )
  }
}

export default compose(withStyles(styles))(_App)
