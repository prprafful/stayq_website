import Document, { Html, Head, Main, NextScript } from "next/document";
import { SheetsRegistry, JssProvider, createGenerateId } from "react-jss";
import { GA_TRACKING_ID } from "../utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const registry = new SheetsRegistry();
        const generateId = createGenerateId();

        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => (
                    <JssProvider
                        registry={registry}
                        generateId={generateId}
                    >
                        <App
                            {...props}
                        />
                    </JssProvider>
                ),
            });

        const initialProps = await Document.getInitialProps(ctx);
        
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style id="server-side-styles">
                        {registry.toString()}
                    </style>
                </>
            ),
        };
    }

    render() {
        return (
            <Html>
                <Head>
                    {
                        isProduction && (
                            <>
                                <script
                                    async
                                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                                />
                                <script
                                    dangerouslySetInnerHTML={{
                                        __html: `
                                                    window.dataLayer = window.dataLayer || [];
                                                    function gtag(){dataLayer.push(arguments);}
                                                    gtag('js', new Date());
                                                    gtag('config', '${GA_TRACKING_ID}', {
                                                        page_path: window.location.pathname,
                                                    });
                                                `,
                                    }}
                                />
                            </>
                        )
                    }
                    <link rel="icon" href="../assets/favicon.ico" />
                    {/* <link href="icon" href="favicon" /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}