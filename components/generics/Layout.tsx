import Head from "next/head";
import SEO from "./SEO";
import Header from "./Header";

// interface Props {
//     title: string,
//     description?: string,
//     og_title?: string,
//     og_description?: string,
//     children: React.ReactNode,
// }

function Layout({
    meta,
    children,
}) {
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <SEO
                    meta={meta}
                />
            </Head>
            <Header />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout;