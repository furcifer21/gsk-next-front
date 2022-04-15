import MainLayout from "../components/MainLayout";
import React from "react";

export default function Custom404() {
    return (
        <MainLayout seo={{title: '404', description: ''}}>
            <div className="d-flex align-items-center justify-content-center mt-5">
                <div className="text-center mt-5">
                    <h1 className="mb-3">Спасибо за заказ!</h1>
                    <p>Наш специалист свяжется с вами в ближайшее время</p>
                </div>
            </div>
        </MainLayout>
    )
}