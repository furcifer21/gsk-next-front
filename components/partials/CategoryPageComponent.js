import Link from "next/link";
import CategoryMenu from "./CategoryMenu";
import ProductItem from "./ProductItem";

export default function CategoryPageComponent({categoryData, categoryMenu, subCategoryMenu, productsData, subCategoryName, categorySlug, subCategorySlug}) {
     return (
        categoryData !== undefined &&
        <>
            <section>
                <div className="container breadcrumb">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href="/catalog">
                                        <a>Каталог</a>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link href={`/catalog/${categorySlug}`}>
                                        <a>{categoryData.type}</a>
                                    </Link>
                                </li>
                                {subCategoryName &&
                                    <li className="breadcrumb-item active" aria-current="page">{subCategoryName}</li>
                                }
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <div className="row name-row">
                        <div className="name-row-item">
                            <h1>{categoryData.type} <span className="num">({categoryData.products.length})</span></h1>
                        </div>
                    </div>
                    <hr/>
                    <div className="row category-row justify-content-start">
                        {subCategoryMenu.length > 0 &&
                            subCategoryMenu.map((sub, index) => {
                                return (
                                    <div key={`subcategory-${index}`} className={`category-row-item br r position-relative ${encodeURI(subCategorySlug) === encodeURI(sub.categorySlug) ? 'active' : ''}`}>
                                        <Link href={`/catalog/${categorySlug}/${sub.categorySlug}`}>
                                            <a className="fake-link-block"></a>
                                        </Link>
                                        {sub.category}<span>товаров: {sub.products.length}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr/>
                </div>
            </section>
            <section className="catalog-body">
                <div className="container">
                    <div className="row justify-content-between">
                        <CategoryMenu categories={categoryMenu} pageSlug={categorySlug}/>
                        <div className="col-content">
                            {/*<div className="content-filtr"><img src={union} alt=""/>По умолчанию <span>(возрастание)<img
                                src={polygon} alt=""/></span>
                            </div>
                            <hr/>*/}
                            <div className="row catalog_produkt">
                                {productsData.length > 0 &&
                                    productsData.map((item, index) => {
                                        return (
                                            <ProductItem key={`product-${index}`} item={item} category={{name: categoryData.type, link: `/catalog/${categorySlug}`}}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}