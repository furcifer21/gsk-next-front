import MainLayout from "../components/MainLayout";
import React from "react";

export default function Custom404() {
    return (
        <MainLayout seo={{title: '404', description: ''}}>
            <div className="d-flex align-items-center justify-content-center mt-5">
                <div className="text-center mt-5">
                    <h1 className="mw-100 mb-3">404 - Страница не найдена</h1>
                </div>
            </div>
        </MainLayout>
    )
}