import MainLayout from "../components/MainLayout";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {decrementQuantity, incrementQuantity, removeAllFromCart, removeFromCart} from "../redux/cart";
import {managers} from "../managers";

export default function CartPage() {
    const [cartData, setCartData] = useState([]);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '/?_rf=service');
    const ls = typeof localStorage !== 'undefined' ? localStorage : undefined;
    const managerId = ls?.getItem('manager') ?? urlParams.get('rf');
    const manager = managers[managerId] ?? managers.service;

    if (!ls?.getItem('manager')) {
        ls?.setItem('manager', managerId);
    }

    useEffect(() => {
        setCartData(cart)
    }, [cart]);

    function getItemsCount() {
        return cart.length > 0 && cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
    };

    function getTotalPrice() {
        return cart.length > 0 && cart.reduce(
            (accumulator, item) => accumulator + item.quantity * item.price, 0
        );
    };

    return (
        <MainLayout seo={{title: `GSK Корзина`, description: ''}}>
            <section>
                <div className="container breadcrumb">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href="/cart"><a>Корзина</a></Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <div className="row name-row">
                        <div className="name-row-item">
                            <h1>Корзина</h1>
                        </div>
                    </div>
                    <hr/>
                </div>
            </section>
            {cartData.length > 0 ?
                <section className="catalog-body">
                    <div className="container container-cart">
                        <div className="row cart-row">
                            <div>
                                <div className="cart_item-row br bg-wh">
                                    <div className="cart_item-row-name">Товаров в корзине: {getItemsCount()}</div>
                                    <div className="cart_item-row-clean" onClick={() => dispatch(removeAllFromCart())}>Очистить<img src="/images/icon/close_ring.svg" alt=""/></div>
                                </div>
                            </div>
                        </div>
                        <table className="table cart-m">
                            <thead className="br">
                            <tr>
                                <th scope="col">Наименование</th>
                                <th scope="col">Цена с НДС</th>
                                <th scope="col">Количество кубов</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart.map((product, index) => {
                                return (
                                    <tr key={`product-mobile-${index}`}>
                                        <td className="position-relative">
                                            <Link href={`/product/product-${product.id}`}><a className="fake-link-block"></a></Link>
                                            {product.name}
                                        </td>
                                        <td>{product.price} ₽</td>
                                        <td className="no-br">
                                            <div className="number">
                                                <div className="number-minus" onClick={() => dispatch(decrementQuantity(product.id))}>−</div>
                                                <input className="number-text" type="text" name="count" value={product.quantity} readOnly/>
                                                <div className="number-plus" onClick={() => dispatch(incrementQuantity(product.id))}>+</div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        {cart.map((product, index) => {
                            return (
                                <div key={`product-${index}`} className="row cart_produkt">
                                    <div>
                                        <div className="product_item-row br">
                                            <div className="product_item-row-name position-relative">
                                                <Link href={`/product/product-${product.id}`}><a className="fake-link-block"></a></Link>
                                                {product.name}
                                            </div>
                                            <div className="product_item-row-price">{product.price} ₽/м3</div>
                                            <div className="number">
                                                <a href="#" className="number-minus" onClick={() => dispatch(decrementQuantity(product.id))}>−</a>
                                                <input className="number-text" type="text" name="count" value={product.quantity} readOnly/>
                                                <a href="#" className="number-plus" onClick={() => dispatch(incrementQuantity(product.id))}>+</a>
                                            </div>
                                            <div className="price">{product.price*product.quantity} ₽</div>
                                            <img src="/images/icon/close_ring.svg" alt="cart-del" onClick={() => dispatch(removeFromCart(product.id))}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <form className="itog">
                            <div className="row cart-row ">
                                <div>
                                    <div className="cart_item-row br bg-wh justify-content-end">
                                        <div className="cart_item-row-itog">ИТОГО:<span>{getTotalPrice()} ₽</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row cart-row-bottom">
                                <div className="justify-content-end">
                                    <button className="btn org complete position-relative">
                                        <Link href="/checkout"><a className="fake-link-block"></a></Link>
                                        Оформить заказ
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="contact-cart">
                            <div className="contact-row">
                                <img src="/images/icon/phone.svg" className="img-icon" alt="phone icon"/>
                                <span>
                                    <a href={`tel:${manager.phone}`}>{manager.phone}</a>
                                </span>
                            </div>
                            <div className="contact-row">
                                <img src="/images/icon/message.svg" className="img-icon" alt="message"/>
                                <span>
                                    <a href={`mailto:${manager.email}`}>{manager.email}</a>
                                </span>
                            </div>
                            <div className="contact-row">
                                <img src="/images/icon/map.svg" className="img-icon" alt="map"/>
                                <span className="adr">Пресненская наб., 8, стр. 1, Москва, Россия</span>
                            </div>
                        </div>
                    </div>
                </section>
            :
                <section className="catalog-body">
                    <div className="container container container-cart">
                        <div className="text-center">
                            <img className="cart-big" src="/images/icon/basket_light.svg" alt="bsket"/>
                        </div>
                        <div className="tittle_body_cart">
                            Ваша корзина пуста
                            <span className="mx-auto">Исправить это просто: выберите в каталоге интересующий товар и нажмите кнопку “В корзину”</span>
                        </div>
                        <div className="row cart-row-bottom">
                            <div className="justify-content-center">
                                <button className="btn org position-relative">
                                    <Link href="/catalog"><a className="fake-link-block"></a></Link>
                                    Перейти в каталог
                                </button>
                            </div>
                        </div>
                        <div className="contact-cart">
                            <div className="contact-row">
                                <img src="/images/icon/phone.svg" className="img-icon" alt="phone"/>
                                <span>
                                    <a href={`tel:${manager.phone}`}>{manager.phone}</a>
                                </span>
                            </div>
                            <div className="contact-row">
                                <img src="/images/icon/message.svg" className="img-icon" alt="Message"/>
                                <span>
                                    <a href={`mailto:${manager.email}`}>{manager.email}</a>
                                </span>
                            </div>
                            <div className="contact-row">
                                <img src="/images/icon/map.svg" className="img-icon" alt="map"/>
                                <span className="adr">Пресненская наб., 8, стр. 1, Москва, Россия</span>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </MainLayout>
    )
}

export const getServerSideProps = async () => {

    return {
        props: {}
    }
};