import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "../components/MainLayout";

export default function Index() {
    return (
        <MainLayout seo={{title: '', description: ''}}>
            <div className="container">content</div>
        </MainLayout>
    )
};

export const getServerSideProps = async (context) => ({
    props: {}
});