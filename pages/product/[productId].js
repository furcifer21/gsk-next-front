import {API_URL, REAL_FAKE_DATA} from "../../components/constant";
import axios from "axios";
import Link from "next/link";
import MainLayout from "../../components/MainLayout";
import CategoryMenu from "../../components/partials/CategoryMenu";
import {addToCart} from "../../redux/cart";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import ProductCounter from "../../components/partials/ProductCounter";

export default function ProductPage({productData, categoryMenu}) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const currentId = () => {
        return cart.length > 0 ? cart.findIndex((product) => product.id === productData.id) : -1;
    };

    return (
        <MainLayout seo={{title: `GSK ${productData !== undefined && productData.name}`, description: ''}}>
            {productData !== undefined &&
                <>
                    <section>
                        <div className="container breadcrumb">
                            <div className="row">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link href="/catalog"><a>Каталог</a></Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">{productData.name}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row name-row">
                                <div className="name-row-item">
                                    <h1>{productData.name}</h1>
                                    {/*<div className="rating-mini">
                                    <span className="active"></span>
                                    <span className="active"></span>
                                    <span className="active"></span>
                                    <span></span>
                                    <span></span>
                                </div>*/}
                                </div>
                                {/* <div>
                                <div className="prod_icon favorite"></div>
                            </div>*/}
                            </div>
                            <hr className="none"/>
                        </div>
                    </section>
                    <section className="catalog-body">
                        <div className="container">
                            <div className="row justify-content-between">
                                <CategoryMenu categories={categoryMenu} pageSlug={''}/>
                                <div className="col-content">
                                    <div className="row catalog_produkt">
                                        <div>
                                            <div className="product_item-row br bg-wh">
                                                <div className="product_item-row-name">{productData.name}</div>
                                                <div className="product_item-row-price">{productData.price} ₽/м3</div>
                                                <ProductCounter productData={productData}/>
                                                <div className="price">{productData.price} ₽</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="prod-img text-center">
                                        <img src={productData.urlIMG} className="raboti-img" height="270" alt={productData.name}/>
                                    </div>
                                    <div className="inf d-lg-none">
                                        <div className="cat">Товарный бетон</div>
                                        <div className="tittle_product">{productData.name}</div>
                                        <div className="prod_row">
                                            <div className="price">{productData.price} ₽<span>/м3</span></div>
                                            {/*<div className="rating-mini">
                                            <span className="active"></span>
                                            <span className="active"></span>
                                            <span className="active"></span>
                                            <span className="active"></span>
                                            <span></span>
                                        </div>*/}
                                        </div>
                                        <div className="prod_row align-items-end">
                                            <ProductCounter productData={productData}/>
                                            {currentId() ?
                                                <button className="btn in_cart" onClick={() => dispatch(addToCart(productData))}>
                                                    В корзину
                                                </button>
                                                :
                                                <button className="btn org cartblock-btn lgx mt-4 position-relative">
                                                    <Link href="/checkout"><a className="fake-link-block"></a></Link>
                                                    В корзину
                                                </button>
                                            }
                                        </div>
                                    </div>
                                    <div className="row prod_description">
                                        <div>
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="tab1-tab" data-bs-toggle="tab"
                                                            data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1"
                                                            aria-selected="true">Характеристики
                                                    </button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="tab2-tab" data-bs-toggle="tab"
                                                            data-bs-target="#tab2" type="button" role="tab" aria-controls="tab1"
                                                            aria-selected="true">Доставка
                                                    </button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="tab3-tab" data-bs-toggle="tab"
                                                            data-bs-target="#tab3" type="button" role="tab" aria-controls="tab1"
                                                            aria-selected="true">Оплата
                                                    </button>
                                                </li>
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="tab1" role="tabpanel"
                                                     aria-labelledby="tab1-tab">
                                                    <div className="feature">
                                                        {Object.entries(productData.contents).map(([key, value], index) => {
                                                            return (
                                                                <div key={`feature-${index}`} className="feature_row">
                                                                    <span>{key}</span><span> {value}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div dangerouslySetInnerHTML={{__html: productData.description}}></div>
                                                </div>
                                                <div className="tab-pane fade show " id="tab2" role="tabpanel"
                                                     aria-labelledby="tab2-tab">
                                                    <div className="dscr">
                                                        <h4>Доставка в пределах МКАД</h4>
                                                        <p className="mb-4">Тарифы уточняйте у менеджера</p>
                                                        <h4>Доставка осуществляется круглосуточно и без выходных</h4>
                                                        <p>Дотсавка в более отдаленные районы просчитывается менеджером индивидуально. При заказе больших объемов будет скидка или бесплатная доставка.</p>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade show " id="tab3" role="tabpanel"
                                                     aria-labelledby="tab3-tab">
                                                    <div className="dscr">
                                                        <div style={{fontWeight: 500}}>1. Наличными при доставке водителю</div>
                                                        <div className="mt-3">Во время оформления заказа возможно выбрать наличную форму оплаты. В этом случае денежные средства передаются водителю в момент приезда на строительную площадку.</div>
                                                        <div className="mt-4" style={{fontWeight: 500}}>2. Оплата по счету</div>
                                                        <div className="mt-3">Во время оформления заказа возможно выбрать форму оплаты по счету. В этом случае, вам будет выписан счет на оплату в электронном виде.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {currentId() !== -1 ?
                                        <button className="btn org cartblock-btn lgx mt-4" onClick={() => dispatch(addToCart(productData))} data-bs-toggle="modal" data-bs-target="#modal">
                                            Купить в один клик
                                        </button>
                                        :
                                        <button className="btn org cartblock-btn lgx mt-4 position-relative" data-bs-toggle="modal" data-bs-target="#modal">
                                            Купить в один клик
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            }
        </MainLayout>
    )
}

export const getServerSideProps = async ({ query }) => {
    let productData = [];
    let categoryMenu = [];
    const productId = decodeURI(query.productId.split('-')[1]);
    const fakeProductData = [
        {
            "id": 3,
            "name": "Бетон М100 B7,5 F100 W4 (Гравий)",
            "price": 3300,
            "contents": {
                "Наполнитель": "Гравий",
                "Подвижность": "П4",
                "Класс бетона": "В7,5",
                "Плотность (кг/м^3)": "2265",
                "Морозостойкость, F": "F100",
                "Средняя прочность": "125",
                "Водонепроницаемость": "W4"
            },
            "urlIMG": "https://imgur.com/6vlKMyZ",
            "description": ""
        }
    ]

    try {
        const res = await axios.get(`${API_URL}/product/getAllProduct`);
        categoryMenu = res.data;
    } catch (e) {
        console.log(e)
    }

    try {
        const res = await axios.get(`${API_URL}/product/getProductById${productId}`);
        productData = res.data;
    } catch (e) {
        console.log(e)
    }

    /*productData = fakeProductData[0];
    categoryMenu = REAL_FAKE_DATA;*/

    return {
        props: {
            productData,
            categoryMenu,
        }
    }
};