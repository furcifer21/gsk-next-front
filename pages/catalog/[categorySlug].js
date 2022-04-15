import CategoryPageComponent from "../../components/partials/CategoryPageComponent";
import {API_URL, REAL_FAKE_DATA} from "../../components/constant";
import axios from "axios";
import MainLayout from "../../components/MainLayout";

export default function CategoryPage({categoryData, categoryMenu, subCategoryMenu, productsData, categorySlug}) {
    return (
        <MainLayout seo={{title: `GSK Категория ${categoryData.type}`, description: ''}}>
            <CategoryPageComponent categoryData={categoryData}
                                   categoryMenu={categoryMenu}
                                   subCategoryMenu={subCategoryMenu}
                                   productsData={productsData}
                                   categorySlug={categorySlug}
            />
        </MainLayout>
    )
}

export const getServerSideProps = async ({ query }) => {
    let categoryData = [];
    let categoryMenu = [];
    let subCategoryMenu = [];
    let productsData = [];
    let categorySlug = query.categorySlug;

    try {
        const res = await axios.get(`${API_URL}/product/getAllProduct`);
        const response = res.data;

        categoryMenu = response;
        response.map(category => {
            if(category.typeSlug === categorySlug) {
                categoryData = category;
                subCategoryMenu = category.categories;
                productsData = category.products;
            }
        });
    } catch (e) {
        console.log(e)
    }

    categoryMenu = REAL_FAKE_DATA;
    REAL_FAKE_DATA.map(category => {
        if(category.typeSlug === categorySlug) {
            categoryData = category;
            subCategoryMenu = category.categories;
            productsData = category.products;
        }
    });

    return {
        props: {
            categoryData,
            categoryMenu,
            subCategoryMenu,
            productsData,
            categorySlug
        }
    }
};