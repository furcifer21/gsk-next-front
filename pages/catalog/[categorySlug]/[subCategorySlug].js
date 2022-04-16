import axios from "axios";
import MainLayout from "../../../components/MainLayout";
import CategoryPageComponent from "../../../components/partials/CategoryPageComponent";
import {API_URL, REAL_FAKE_DATA} from "../../../components/constant";

export default function SubCategoryPage({categoryData, categoryMenu, subCategoryMenu, productsData, categorySlug, subCategoryName, subCategorySlug}) {
    return (
        <MainLayout seo={{title: `GSK Подкатегория ${categoryData.type}`, description: ''}}>
            <CategoryPageComponent categoryData={categoryData}
                                   categoryMenu={categoryMenu}
                                   subCategoryMenu={subCategoryMenu}
                                   productsData={productsData}
                                   categorySlug={categorySlug}
                                   subCategorySlug={subCategorySlug}
                                   subCategoryName={subCategoryName}
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
    let subCategorySlug = query.subCategorySlug;
    let subCategoryName = '';

    try {
        const res = await axios.get(`${API_URL}/product/getAllProduct`);
        const response = res.data;

        categoryMenu = response;
        response.map(category => {
            if(category.typeSlug === categorySlug) {
                categoryData = category;
                subCategoryMenu = category.categories;

                category.categories.map((subCategory, index) => {
                    if(encodeURI(subCategory.categorySlug) === encodeURI(query.subCategorySlug)) {
                        productsData = subCategory.products;
                        subCategoryName = subCategory.category;
                    }
                })
            }
        });
    } catch (e) {
        console.log(e)
    }

   /* categoryMenu = REAL_FAKE_DATA;
    REAL_FAKE_DATA.map(category => {
        if(category.typeSlug === categorySlug) {
            categoryData = category;
            subCategoryMenu = category.categories;

            category.categories.map((subCategory, index) => {
                if(encodeURI(subCategory.categorySlug) === encodeURI(query.subCategorySlug)) {
                    productsData = subCategory.products;
                    subCategoryName = subCategory.category;
                }
            })
        }
    });*/

    return {
        props: {
            categoryData,
            categoryMenu,
            subCategoryMenu,
            productsData,
            categorySlug,
            subCategoryName,
            subCategorySlug
        }
    }
};