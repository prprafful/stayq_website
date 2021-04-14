import { AppProps } from 'next/dist/next-server/lib/router/router'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/globals.css'

import * as gtag from '../utils/gtag';


const isProduction = true
// const isProduction = process.env.NODE_ENV === "production";

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) gtag.pageView(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    }
  }, [router,])

  return <Component {...pageProps} />
}

export default MyApp;

// import { AppProps } from 'next/dist/next-server/lib/router/router'
// import '../styles/globals.css'

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <RootStoreProvider
//       hydrationData={pageProps.hydrationData}
//     >
//       <Component {...pageProps} />
//     </RootStoreProvider>
//   )
// }

// export default MyApp
