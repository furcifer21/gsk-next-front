import React from "react";
import Head from "next/head";
import Header from "./partials/Header";
import OnClickModal from "./partials/OnClickModal";

export default function MainLayout({children, seo}) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-32x32.png" />
                <title>{seo.title || 'GSK'}</title>
                <meta name="description" content={seo.description || 'GSK | description '} />
            </Head>
            <div className="App">
                <Header />
                <main className="flex-grow-1">
                    {children}
                </main>
                <OnClickModal/>
            </div>
        </>
    )
}