import Head from "next/head";
import SEO from "./SEO";
import Header from "./Header";

interface Props {
    meta?: any,
    title?: string,
    // description?: string,
    children: React.ReactNode,
}

function Layout({
    meta,
    title,
    // description,
    children,
}: Props) {
    return (
        <>
            <Head>
                <title>
                    {meta && meta.title || title || 'StayQrious'}
                </title>
                {meta && <SEO
                    meta={meta}
                />}
            </Head>
            <Header />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout;