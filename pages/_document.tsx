import React, { ReactElement } from "react";
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
    
        return initialProps
    }

    render(): ReactElement {
        
        return(
            <Html lang="en">
            <Head />
            <body>
                <script>0</script>
                <Main />
                <NextScript />
            </body>
          </Html>
        );
    }  
}
