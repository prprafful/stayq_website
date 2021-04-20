import { useEffect, useState } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';

import { GTMPageView } from 'utils/gtm';
import { useStores } from 'hooks/useStores';
import 'styles/globals.css'

import * as gtag from 'utils/gtag';


const isProduction = true
// const isProduction = process.env.NODE_ENV === 'production';

function MyApp({ Component, pageProps }: AppProps) {

    const router = useRouter();
    const [cookie, setCookie] = useCookies();
    const { userStore, commonStore, authStore } = useStores();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
        // const handleComplete = (url) => (url === router.asPath) && setLoading(false);

        const handleRouteChange = (url: URL) => {
            if (isProduction) {
                GTMPageView(url);
                gtag.pageView(url);
            }
            setLoading(false);
        };

        router.events.on('routerChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routerChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleRouteChange);
        }
    }, [router,])

    useEffect(() => {
        const queryParams = router.query;

        const trackingUrlParams = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content', 'gclid'];
        if (queryParams.utm_source) {
            // if (queryParams.utm_source === cookie.utm_source) {
            trackingUrlParams.forEach((el) => {
                setCookie(el, JSON.stringify(cookie[el] || queryParams[el] || ''), {
                    path: '/',
                    maxAge: 28 * 86400, // 1 day = 86400 seconds
                    sameSite: true,
                })
            })
            // }

            // trackingUrlParams.forEach((el) => {
            //     setCookie(el, JSON.stringify(queryParams[el] || ''), {
            //         path: '/',
            //         maxAge: 28 * 86400, // 1 day = 86400 seconds
            //         sameSite: true,
            //     })
            // })
        }
    }, [router.query])

    useEffect(() => {
        if (commonStore.appLoaded) {
            return;
        }

        if (!commonStore.token) {
            authStore.logout();
            commonStore.setAppLoaded();
            return;
        }

        userStore
            .pullUser()
            .then(() => {
                commonStore.setAppLoaded();
            })
            .catch((err) => {
                console.error(err);
                commonStore.setAppLoadError();
            });
    })

    return (
        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>
    )
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
