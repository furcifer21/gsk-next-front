import MainLayout from "../components/MainLayout";
import {Component, Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import axios from "axios";
import $ from "jquery";
import InputMask from "react-input-mask";
import {API_URL, EMAIL, PHONE, PHONE_HREF, REAL_FAKE_DATA} from "../components/constant";
import {checkPhone} from "../components/helpers";
import {useDispatch, useSelector} from "react-redux";
import ProductCounter from "../components/partials/ProductCounter";
import {removeAllFromCart} from "../redux/cart";

export default function Index({priceData}) {
    const [currentCategory, setCurrentCategory] = useState('');
    const [topName, setTopName] = useState('');
    const [topPhone, setTopPhone] = useState('');
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const articlesInfo = [
        {
            img: '/images/articles/atc1.png',
            name: 'Значение строительного песка',
            slug: 'znachenia-peska',
        },
        {
            img: '/images/articles/atc1.png',
            name: 'Марки бетона',
            slug: 'marki-betona',
        }
    ];

    function getItemsCount() {
        return cart.length > 0 ? cart.reduce((accumulator, item) => accumulator + item.quantity, 0) : 0;
    };

    function getTotalPrice() {
        return cart.length > 0 ? cart.reduce(
            (accumulator, item) => accumulator + item.quantity * item.price, 0
        ) : 0;
    };

    function sendForm(e) {
        e.preventDefault();
        const phoneVal = topPhone.trim();
        const formData = {
            name: topName.trim(),
            phone: phoneVal,
        };

        if(checkPhone(phoneVal) || (phoneVal !== '')) {
            axios.post(`${API_URL}/email-sender/sendOrder`, formData)
                .then(res => {
                    $('#success-modal').addClass('open-modal');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <MainLayout seo={{title: 'GSK Главная', description: ''}}>
            <section className="top">
                <div className="container ">
                    <div className="row ">
                        <div className="col-lg-12 ">
                            <h1>Главная Строительная Компания</h1>
                            <div className="dscr">
                                Сеть заводов изготовителей готовых бетонных смесей с доставкой по Москве.<br/>
                                Ваш надежный поставщик бетона, нерудных материалов и арматуры.
                            </div>
                            <Link href="/catalog">
                                <a>
                                    <button className="btn org">Заказать бетон</button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative">
                <div className="container card-section">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 flex-row-reverse">
                        <div className="col p-0">
                            <div className="card">
                                <div className="card-body flex-column d-flex justify-content-center align-items-center">
                                    <p className="card-text">2500м<sup>3</sup><span>+</span></p>
                                    <small className="text-muted">Бетона ежедневно</small>
                                </div>
                            </div>
                        </div>
                        <div className="col p-0">
                            <div className="card">
                                <div className="card-body flex-column d-flex justify-content-center align-items-center">
                                    <p className="card-text">1000<span>+</span></p>
                                    <small className="text-muted">Готовых объектов</small>
                                </div>
                            </div>
                        </div>
                        <div className="col p-0">
                            <div className="card">
                                <div className="card-body flex-column d-flex justify-content-center align-items-center">
                                    <p className="card-text">20<span>+</span></p>
                                    <small className="text-muted">Единиц спецтехники</small>
                                </div>
                            </div>
                        </div>
                        <div className="col p-0">
                            <div className="card">
                                <div className="card-body flex-column d-flex justify-content-center align-items-center">
                                    <p className="card-text">10<span>+</span></p>
                                    <small className="text-muted">Лет на рынке</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid kupit">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2 className="center form-title wh">Хотите купить бетон?</h2>
                                <div className="dscr center wh">Оставьте свои контакты и наши специалисты свяжутся с вами.</div>
                                <form className="form" id="form-1" onSubmit={(e) => sendForm(e)}>
                                    <div className="row-form">
                                        <div>
                                            <input type="text"
                                                   className="text-field w-input"
                                                   name="name"
                                                   placeholder="Ваше имя"
                                                   value={topName}
                                                   onChange={(e) => setTopName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <InputMask className="phone-input text-field w-input"
                                                       name="phone"
                                                       placeholder="Ваш телефон"
                                                       mask="+7 (999) 999-99-99"
                                                       required="required"
                                                       value={topPhone}
                                                       onChange={(e) => setTopPhone(e.target.value)}
                                            />
                                            <button type="submit" className="btn blk form-btn position-static">Заказать звонок</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {priceData.length > 0 &&
                <section id="price">
                    <h2 className="center cover-bg blk">Актуальный прайс на продукцию ГСК</h2>
                    <div className="container-fluid">
                        <div className="row tabel-block">
                            <div className="col-tab price">
                                <div className="price-tabel-block">
                                    <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                                        {priceData.map((category, index) => {
                                            currentCategory === '' && setCurrentCategory(category.typeSlug);

                                            return (
                                                <li key={`category-${index}`} className="nav-item me-2" role="presentation">
                                                    <button className={`nav-link text-lowercase ${currentCategory === category.typeSlug ? 'active' : ''} br`} id={`tab${index}-tab`} data-toggle="tab"
                                                            data-target={`#tab${index}`} type="button" role="tab" aria-controls={`tab${index}`}
                                                            aria-selected="true"
                                                            onClick={() => setCurrentCategory(category.typeSlug)}
                                                    >
                                                        {category.type}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        {priceData.map((categoryTab, index) => {
                                            return (
                                                <div key={`category-tab-${index}`}
                                                     className={`tab-pane fade ${currentCategory === categoryTab.typeSlug ? 'show active' : ''}`}
                                                     id={`tab${index}`}
                                                     role="tabpanel"
                                                     aria-labelledby={`tab${index}-tab`}
                                                >
                                                    {categoryTab.categories.length > 0 &&
                                                        categoryTab.categories.map((subCategory, y) => {
                                                            return (
                                                                <Fragment key={`subCategory-${index}-${y}`}>
                                                                    <div className="price-top br text-uppercase">{subCategory.category}</div>
                                                                    <table className={`table ${categoryTab.categories.length > 1 ? 'table-lg' : ''}`}>
                                                                        <thead className="br">
                                                                        <tr>
                                                                            <th scope="col">Наименование</th>
                                                                            <th scope="col">Цена с НДС</th>
                                                                            <th scope="col">Количество кубов</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {subCategory.products.map((product, i) => {
                                                                            return (
                                                                                <tr key={`product-${i}`}>
                                                                                    <td className="position-relative">
                                                                                        <Link href={`/product/product-${product.id}`}>
                                                                                            <a className="fake-link-block"></a>
                                                                                        </Link>
                                                                                        {product.name}
                                                                                    </td>
                                                                                    <td>{product.price} ₽</td>
                                                                                    <td className="no-br">
                                                                                        <ProductCounter productData={product}/>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                        </tbody>
                                                                    </table>
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                    <button className="btn org cartblock-btn lgx position-relative">
                                                        <Link href="/catalog">
                                                            <a className="fake-link-block"></a>
                                                        </Link>
                                                        Смотреть весь список
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <div className="left-cartblock br">
                                        <div className="cartblock-body">
                                            <div className="cartblock-top">
                                                Ваш заказ
                                            </div>
                                            <form>
                                                <div className="cartblock-item">Общий объём
                                                    <input type="text" className="br" value={`${getItemsCount()} m3`} readOnly/>
                                                    <div>
                                                        <div className="cartblock-item">Стоимость
                                                            <input type="text" className="br lg" value={`${getTotalPrice()} ₽`} readOnly/>
                                                            <div>
                                                                <div className="cartblock-footer">
                                                                    <div>
                                                                        <button className="btn org cartblock-btn lg position-relative">
                                                                            <Link href="/cart">
                                                                                <a className="fake-link-block"></a>
                                                                            </Link>
                                                                            В  корзину
                                                                        </button>
                                                                        <input type="reset" className="btn  cartblock-btn trash" onClick={() => dispatch(removeAllFromCart())}/>
                                                                    </div>
                                                                    <button type="button" className="btn org cartblock-btn"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#modal">Оформить в один клик
                                                                    </button>
                                                                    <button className="btn grey cartblock-btn position-relative">
                                                                        <Link href="/calculate">
                                                                            <a className="fake-link-block"></a>
                                                                        </Link>
                                                                        Рассчитать доставку
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
            <section id="calk-banner" className="bg-wh">
                <div className="container">
                    <div className="banner org br">
                        <div className="bannerbody-calk">
                            <div>Рассчёт цены бетона с доставкой на карте</div>
                            <Link href="/calculate">
                                <a><button className="btn wh">Рассчёт доставки</button></a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/*<section id="raboti" className="bg-wh">
                <div className="container">
                    <h2>Работы, выполненные ГСК</h2>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 ">
                        <a href="img/r1.png" data-fancybox="gallery" data-caption="">
                            <img src={r1} className="raboti-img" alt=""/>
                        </a>
                        <a href="img/r2.png" data-fancybox="gallery" data-caption="">
                            <img src={r2} className="raboti-img" alt=""/>
                        </a>
                        <a href="img/r3.png" data-fancybox="gallery" data-caption="">
                            <img src={r3} className="raboti-img" alt=""/>
                        </a>
                        <a href="img/r4.png" data-fancybox="gallery" data-caption="">
                            <img src={r4} className="raboti-img" alt=""/>
                        </a>
                    </div>
                </div>
            </section>*/}
            <section id="about">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 pt-3">
                        <div className=""><img src="/images/builder.png" alt=""/></div>
                        <div className="d-flex flex-column justify-content-center">
                            <h2>О ГСК</h2>
                            <div className="dscr">
                                Главная строительная компания - одна из крупнейших
                                на отечественном рынке. Она является не только
                                производителем качественных материалов, но также и застройщиком.
                                Мощности ГСК – это четыре больших завода в Москве и области,
                                где за сутки производится свыше 2000 м3 бетона в сутки. В распоряжении
                                ГСК также находиться собственный парк спецтехники, а также дополнительного
                                оборудования, которое позволяет значительно облегчить работу.
                            </div>
                            <div className="mt-4">
                                <button type="button" className="btn org position-relative cartblock-btn">
                                    <Link href="/articles/about-company">
                                        <a className="fake-link-block"></a>
                                    </Link>
                                    Подробнее о ГСК
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="poraydok" className="bg-wh">
                <div className="container">
                    <div className="row">
                        <h2 className="center">Порядок работы
                        </h2>
                        <div className="dscr center">Процесс реализации вашего заказа от начала и до конца.
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center">
                        <div className="pr-item">
                            <div className="pr-item-title">
                                <span className="pr-item-top">Заявка</span>
                                <span className="pr-item-num">1</span>
                            </div>
                            <div className="pr-item-text">Оставьте заявку любым <br/>удобным для вас способом –<br/> по
                                e-mail, по телефону <br/>или закажите обратный<br/> звонок на сайте.</div>
                        </div>
                        <div className="pr-item">
                            <div className="pr-item-title active">
                                <span className="pr-item-top">Расчёт</span>
                                <span className="pr-item-num">2</span>
                            </div>
                            <div className="pr-item-text">Наши специалисты<br/> рассчитают стоимость<br/> бетона и
                                доставки, сделают<br/> счет или коммерческое<br/> предложение.</div>
                        </div>
                        <div className="pr-item">
                            <div className="pr-item-title">
                                <span className="pr-item-top">Оплата</span>
                                <span className="pr-item-num">3</span>
                            </div>
                            <div className="pr-item-text">Наличный и безналичный<br/> расчет. Предварительная<br/> оплата
                                для юридических лиц.<br/> Скидки и особые условия<br/> для постоянных клиентов.</div>
                        </div>
                        <div className="pr-item">
                            <div className="pr-item-title">
                                <span className="pr-item-top">Производство</span>
                                <span className="pr-item-num">4</span>
                            </div>
                            <div className="pr-item-text">Изготовление бетонной<br/> смеси или раствора<br/> на нашем РБУ,
                                погрузка<br/> в автобетоносмеситель.<br/> Контрольный звонок<br/> от диспетчера.</div>
                        </div>
                        <div className="pr-item">
                            <div className="pr-item-title">
                                <span className="pr-item-top">Доставка и разгрузка</span>
                                <span className="pr-item-num">5</span>
                            </div>
                            <div className="pr-item-text">Доставка производится<br/> миксерами от 7 до 10
                                м3.<br/> Дополнительные условия<br/> поставки обговариваются<br/> заранее.</div>
                        </div>

                    </div>
                </div>
            </section>
            {/*<section id="articles" className="bg-wh">
                <div className="container">
                    <div className="row">
                        <h2>Актульные статьи</h2>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 ">
                        {articlesInfo.map((article, index) => {
                            return (
                                <div key={`article-${index}`} className="article d-flex flex-column justify-content-between">
                                    <div className="article-title">{article.name}</div>
                                    <div>
                                        <img src={article.img} className="img-article" alt={article.name}/>
                                        <div className="article-footer">
                                            <div className="article-t">Классы бетона</div>
                                            <button className="btn org position-relative">
                                                <Link href={`/articles/${article.slug}`}><a className="fake-link-block"></a></Link>
                                                Читать полностью
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>*/}
            <section id="partners" className="bg-wh">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="title-block">25+<span>Партнёры ГСК</span></div>
                            <div className="dscr d-none d-md-block">Партнёров Главной Строительной компании.</div>
                        </div>
                        <div className="col-md-8">
                            <div className="row row-cols-partners">
                                <div className="item-partners "><img src="/images/image7.png" className="img-partners" alt=""/></div>
                                <div className="item-partners "><img src="/images/image8.png" className="img-partners" alt=""/></div>
                                <div className="item-partners "><img src="/images/image6.png" className="img-partners" alt=""/></div>
                                <div className="item-partners "><img src="/images/image9.png" className="img-partners" alt=""/></div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer id="contact">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2">
                        <div className="contact-left">
                            <h2>Контакты</h2>
                            <div className="map">
                                <YMaps>
                                    <Map defaultState={{ center: [55.74729850208165, 37.53905755617727], zoom: 9 }} width="100%" height="355">
                                        <Placemark geometry={[55.74729850208165, 37.53905755617727]} />
                                    </Map>
                                </YMaps>
                            </div>
                        </div>
                        <div id="contact" className="contact-right">
                            <div className="contact-title">Наш адрес</div>
                            <div className="contact-row">
                                <img src="/images/icon/map.svg" className="img-icon" alt="map-marker"/><span>Пресненская наб., 8, стр. 1, Москва, Россия</span>
                            </div>
                            <div className="contact-title">Телефоны для связи</div>
                            <div className="contact-row">
                                <img src="/images/icon/phone.svg" className="img-icon" alt="phone"/><span><a href={`tel:+74996477756`}>+7 (499) 647-77-56</a></span>
                            </div>
                            <div className="contact-title">E-mail по всем вопросам</div>
                            <div className="contact-row">
                                <img src="/images/icon/message.svg" className="img-icon" alt="email"/>
                                <span>
                                    <a href={`mailto:info@glavsk.ru`}>info@glavsk.ru</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*<div className="row col footer">
                        <h2 className="center form-title">Не нашли ответ на вопрос?</h2>
                        <div className="dscr center">Оставьте свои контакты и наши специалисты свяжутся с вами.</div>
                        <form className="form" action="" method="post" id="form-1">
                            <div className="row-form">
                                <div>
                                    <input className="text-field w-input" name="name" placeholder="Ваше имя" type="text"/>
                                </div>
                                <div>
                                    <input className="phone-input text-field w-input" name="phone" placeholder="Ваш телефон" required="required" type="tel"/>
                                    <button type="submit" className="btn blk form-btn">Заказать звонок</button>
                                </div>
                            </div>
                        </form>
                    </div>*/}
                </div>
            </footer>
        </MainLayout>
    )
};

export const getServerSideProps = async () => {
    let priceData = [];

    try {
        const res = await axios.get(`${API_URL}/product/getAllProduct`);
        priceData = res.data;
    } catch (e) {
        console.log(e)
    }

    /*priceData = REAL_FAKE_DATA;*/

    return {
        props: {
            priceData,
        }
    }
};