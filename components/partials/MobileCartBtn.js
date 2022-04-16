import Link from "next/link";
import React, {useEffect, useState} from "react";
import InputMask from "react-input-mask";
import $ from "jquery";
import axios from "axios";
import {API_URL} from "../constant";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

export default function MobileCartBtn() {
    const router = useRouter();
    const cart = useSelector((state) => state.cart);
    const [isCartFull, setIsCartFull] = useState(false);

    useEffect(() => {
        setIsCartFull(cart.length > 0);
    }, [cart]);

    function getTotalPrice() {
        return cart.length > 0 && cart.reduce(
            (accumulator, item) => accumulator + item.quantity * item.price, 0
        );
    };

    return (
        <div className={`mobile-cart-block position-fixed w-100 ${router.pathname === '/' && isCartFull ? 'd-lg-none' : 'd-none'}`}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="price-mobile">
                        <div>Стоимость:</div>
                        <div>{getTotalPrice()} ₽</div>
                    </div>
                    <button className="btn position-relative bg-white">
                        <Link href="/cart">
                            <a className="fake-link-block"></a>
                        </Link>
                        В  корзину
                    </button>
                </div>
            </div>
        </div>
    )
}