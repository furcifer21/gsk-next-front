import MainLayout from "../components/MainLayout";
import React from "react";

export default function Custom500() {
    return (
        <MainLayout seo={{title: 'GSK Ошибка сервера', description: ''}}>
            <div className="text-center mt-5">
                <h1 className="mb-3">500 - Ошибка сервера</h1>
                <p>Попробуйте позже</p>
            </div>
        </MainLayout>
    )
}