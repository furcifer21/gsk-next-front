import MainLayout from "../components/MainLayout";
import axios from "axios";
import Link from "next/link";
import {API_URL, REAL_FAKE_DATA} from "../components/constant";

export default function CatalogPage({catalogCategories}) {
    return (
        <MainLayout seo={{title: 'GSK Каталог категорий', description: ''}}>
            {catalogCategories.length > 0 &&
                <>
                    <section>
                        <div className="container breadcrumb">
                            <div className="row">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                           {/* <Link href="/catalog">
                                                <a>Каталог</a>
                                            </Link>*/}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row name-row">
                                <div className="name-row-item">
                                    <h1>Каталог</h1>
                                </div>
                                {/*<div className="row-search">
                                <form className="form search" action="" id="form-1">
                                    <input className="text-field w-input" name="" placeholder="Введите запрос" type="text"/>
                                    <select name="category">
                                        <option>Категории</option>
                                        <option value="Товарный бетон">Товарный бетон</option>
                                        <option value="Цементные растворы">Цементные растворы</option>
                                        <option value="Цементные смеси">Цементные смеси</option>
                                    </select>
                                    <button type="submit" className="btn search form-btn"></button>
                                </form>
                            </div>*/}
                            </div>
                            <hr/>
                        </div>
                    </section>
                    <section className="content-body">
                        <div className="container">
                            <div className="row content-article">
                                {catalogCategories.map((category, index) => {
                                    return (
                                        <div key={`category-${index}`} className="article_item-row br bg-wh position-relative">
                                            <Link href={`/catalog/${category.typeSlug}`}>
                                                <a className="fake-link-block"></a>
                                            </Link>
                                            <div>
                                                <img src={category.img} className=""/>
                                            </div>
                                            <div>
                                                <div className="article_item-row-name text-lowercase">{category.type}</div>
                                                <div className="article_item-row-sub">товаров: {category.products.length}</div>
                                            </div>
                                            <div className="view"></div>
                                        </div>
                                    )
                                })}
                                {/*<div className="article_item-row calk-item br bg-wh position-relative">
                                <Link href="/calculate"><a className="fake-link-block"></a></Link>
                                <div><img src={calk} className=""/></div>
                                <div>
                                    <div className="article_item-row-name">Рассчитать стоимость доставки </div>
                                    <div className="article_item-row-sub">Онлайн-калькулятор</div>
                                </div>
                                <div className="view"></div>
                            </div>*/}
                            </div>
                        </div>
                    </section>
                </>
            }
        </MainLayout>
    )
}

export const getServerSideProps = async () => {
    let catalogCategories = [];

    try {
        const res = await axios.get(`${API_URL}/product/getAllProduct`);
        catalogCategories = res.data;
    } catch (e) {
        console.log(e)
    }
    /*catalogCategories = REAL_FAKE_DATA;*/

    return {
        props: {
            catalogCategories,
        }
    }
};