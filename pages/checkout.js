import MainLayout from "../components/MainLayout";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import axios from "axios";
import {API_URL} from "../components/constant";
import InputMask from "react-input-mask";
import {removeAllFromCart} from "../redux/cart";
import $ from "jquery";

export default function CheckoutPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [typeClient, setTypeClient] = useState('Физическое лицо');
    const [typePayment, setTypePayment] = useState('Наличными или картой водителю');
    const [distance, setDistance] = useState(0);
    const [agreeCheckbox, setAgreeCheckbox] = useState(true);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const getTotalPrice = () => {
        return cart.reduce(
            (accumulator, item) => accumulator + item.quantity * item.price, 0
        );
    };

    function sendOrder(e) {
        e.preventDefault();
        const formData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            city: city.trim(),
            address: address.trim(),
            comment: comment.trim(),
            date: date,
            typeClient: typeClient.trim(),
            typePayment: typePayment.trim(),
            distance: distance,
            products: cart,
        }

        axios.post(`${API_URL}/email-sender/sendOrderFull`, formData)
            .then(res => {
                $('#success-modal').addClass('open-modal');
                dispatch(removeAllFromCart());
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <MainLayout seo={{title: `GSK Оформление заказа`, description: ''}}>
            <section>
                <div className="container breadcrumb">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                {/*<li className="breadcrumb-item">
                                    <Link href="/checkout"><a>Оформление заказа</a></Link>
                                </li>*/}
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <div className="row name-row">
                        <div className="name-row-item">
                            <h1>Оформление заказа</h1>
                        </div>
                    </div>
                    <hr/>
                </div>
            </section>
            <section className="zakaz-body">
                <form onSubmit={(e) => sendOrder(e)}>
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-content">
                                <div className="row-form">
                                    <div className="zakaz-block tip-p br">
                                        <span className="label-zakaz">Тип покупателя</span>
                                        <input type="radio"
                                               id="cb1"
                                               name="individualPerson"
                                               checked={typeClient === 'Физическое лицо'}
                                               onChange={() => setTypeClient('Физическое лицо')}
                                        />
                                        <label htmlFor="cb1">Физическое лицо</label>
                                        <input type="radio"
                                               id="cb2"
                                               name="legalPerson"
                                               checked={typeClient === 'Юридическое лицо'}
                                               onChange={() => setTypeClient('Юридическое лицо')}
                                        />
                                        <label htmlFor="cb2">Юридическое лицо</label>
                                    </div>
                                    <div className="zakaz-block oplata br">
                                        <span className="label-zakaz">Способ оплаты</span>
                                        <div className="zakaz-block-row">
                                            <div>
                                                <input type="radio"
                                                       id="cb3"
                                                       name="oplata"
                                                       checked={typePayment === 'Наличными или картой водителю'}
                                                       onChange={() => setTypePayment('Наличными или картой водителю')}
                                                />
                                                <label htmlFor="cb3">Наличными или картой водителю</label>
                                                <input type="radio"
                                                       id="cb4"
                                                       name="oplata"
                                                       checked={typePayment === 'Счёт'}
                                                       onChange={() => setTypePayment('Счёт')}
                                                />
                                                <label htmlFor="cb4">Счёт</label>
                                            </div>
                                            <div>
                                                <span className="txt-zakaz">
                                                    Оплата производится наличными деньгами или банковской картой, в момент получения заказа. Подтверждением вашей оплаты является фискальный кассовый чек, вручаемый во время получения и оплаты заказа.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-form">
                                    <div className="zakaz-block br pokupatel">
                                        <span className="label-zakaz">Покупатель</span>
                                        <div className="zakaz-block-col">
                                            <div className="col-form">
                                                <span className="label-zakaz">Имя<span className="required">*</span></span>
                                                <input type="text"
                                                       className="text-field w-input br"
                                                       required
                                                       name="name"
                                                       maxLength="256"
                                                       value={name}
                                                       onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-form">
                                            <span className="label-zakaz"> E-mail<span className="required">*</span></span>
                                                <input type="email"
                                                       className="text-field w-input br"
                                                       name="email"
                                                       maxLength="256"
                                                       required
                                                       value={email}
                                                       onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-form">
                                                <span className="label-zakaz"> Телефон<span className="required">*</span></span>
                                                <InputMask className="text-field w-input br"
                                                           name="phone"
                                                           mask="+7 (999) 999-99-99"
                                                           required
                                                           value={phone}
                                                           onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-form">
                                                <span className="label-zakaz">Дата и время доставки</span>
                                                <InputMask className="text-field w-input br"
                                                           name="phone"
                                                           mask="99.99.9999"
                                                           required
                                                           value={phone}
                                                           onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-form">
                                                <span className="label-zakaz">Город</span>
                                                <input type="text"
                                                       className="text-field w-input br"
                                                       name="gorod"
                                                       maxLength="256"
                                                       value={city}
                                                       onChange={(e) => setCity(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-form">
                                                <span className="label-zakaz">Адрес доставки</span>
                                                <input type="text"
                                                       className="text-field w-input br"
                                                       name="address"
                                                       maxLength="256"
                                                       value={address}
                                                       onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-form">
                                                <span className="label-zakaz">Комментарии к заказу</span>
                                                <textarea className="text-field w-input br"
                                                          name="comment"
                                                          maxLength="256"
                                                          value={comment}
                                                          onChange={(e) => setComment(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-form">
                                    <div className="zakaz-block br p-0 zakaz-cart">
                                        <span className="label-zakaz">Товары в корзине</span>
                                        <table className="table cart-m">
                                            <thead className="br">
                                            <tr>
                                                <th scope="col">Наименование</th>
                                                <th scope="col">Цена с НДС</th>
                                                <th scope="col">Количество</th>
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
                                                        <td className="no-br">{product.quantity} м3</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                        <div className="cart_produkt name-row">
                                            <div>
                                                <div className="product_item-row">
                                                    <div className="cart-col">Наименование</div>
                                                    <div className="cart-col">Цена</div>
                                                    <div className="cart-col">Кол-во</div>
                                                    <div className="cart-col">Стоимость</div>
                                                </div>
                                            </div>
                                        </div>
                                        {cart.map((product, index) => {
                                            return (
                                                <div key={`product-${index}`} className="cart_produkt">
                                                    <div>
                                                        <div className="product_item-row br">
                                                            <div className="product_item-row-name cart-col position-relative">
                                                                <Link href={`/product/product-${product.id}`}><a className="fake-link-block"></a></Link>
                                                                {product.name}
                                                            </div>
                                                            <div className="product_item-row-price cart-col">{product.price} ₽/м3</div>
                                                            <div className="kol-vo cart-col">{product.quantity} м3</div>
                                                            <div className="price cart-col">{product.price*product.quantity} ₽</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="itog">
                                    <div className="row cart-row ">
                                        <div>
                                            <div className="cart_item-row br bg-wh justify-content-end">
                                                {/*<input type="text" className="cart_item text-field br"
                                                   placeholder="Введите промокод на скидку"/>*/}
                                                <div className="cart_item-row-itog">ИТОГО:<span>{getTotalPrice()} ₽</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row cart-row-bottom">
                                        <div>
                                            <input type="checkbox"
                                                   required
                                                   id="cb10"
                                                   checked={agreeCheckbox}
                                                   onChange={() => setAgreeCheckbox(!agreeCheckbox)}
                                            />
                                            <label htmlFor="cb10">
                                                Я согласен на <a href="#">обработку персональных данных</a>
                                            </label>
                                            <button type="submit" className="btn org complete">Оформить заказ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </MainLayout>
    )
}

export const getServerSideProps = async ({ query }) => {
    return {
        props: {}
    }
};