import Document, { Html, Head, Main, NextScript } from "next/document";
import { SheetsRegistry, JssProvider, createGenerateId } from "react-jss";
import { ServerStyleSheets } from '@material-ui/core/styles';

import { GA_TRACKING_ID } from "utils/gtag";


// const isProduction = process.env.NODE_ENV === "production";
const isProduction = true

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const registry = new SheetsRegistry();
        const generateId = createGenerateId();
        const sheets = new ServerStyleSheets();

        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(
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
                        {sheets.getStyleElement()}
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

                                <script
                                    dangerouslySetInnerHTML={{
                                        __html: `(function(w,d,s,l,i){w[l] = w[l] || []{'gtm.start':
                                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                    })(window,document,'script','dataLayer','GTM-WLBSQ4L');`
                                    }}
                                ></script>
                                <script
                                    dangerouslySetInnerHTML={{
                                        __html: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked = !0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length; {var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="mpzYvSudPGzcwoost2fR4IDWkSC3DYZy";analytics.SNIPPET_VERSION="4.13.2";
                                    analytics.load("mpzYvSudPGzcwoost2fR4IDWkSC3DYZy");
                                    analytics.page();
                                    }}();`
                                    }}
                                >
                                </script>
                            </>
                        )
                    }
                    {/* <link rel="icon" href="favicon" /> */}
                    {/* <link href="assets/favicon" /> */}
                </Head>
                <body>
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WLBSQ4L"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`
                        }}
                    ></noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}