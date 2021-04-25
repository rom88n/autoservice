import { ServerStyleSheets } from '@material-ui/styles'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import flush from 'styled-jsx/server'

class MyDocument extends Document {
  static getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()

    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <>
          {sheets.getStyleElement()}
          {flush() || null}
        </>
      ),
    }
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
