import { AppProps } from 'next/dist/next-server/lib/router/router'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component { ...pageProps } />
}

export default MyApp

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
