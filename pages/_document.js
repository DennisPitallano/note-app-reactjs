import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
        <Html>
          <Head>
            <link href={'/style/bootstrap.css'} rel="stylesheet" />
            <link href={'/style/fontawesome/css/all.min.css'} rel="stylesheet" />
            <link href={'/style/style.css'} rel="stylesheet" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
    );
  }
}
export default MyDocument;
