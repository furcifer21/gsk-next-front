import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

export default function Header() {
    const router = useRouter();
    const [mobileMenu, setMobileMenu] =useState(false)
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        const mobileMenuHide = () => {
            if(window.innerWidth > 992) {
                setMobileMenu(false);
            }
        };

        window.addEventListener('resize', mobileMenuHide);
        window.addEventListener('orientationchange', mobileMenuHide);
    }, []); // Will fire only once

    useEffect(() => {
        setMobileMenu(false);
    }, [router]); // Will fire only once

    function getItemsCount() {
        return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
    };

    return (
        <>
            <div className={`mobile-menu position-fixed w-100 h-100 bg-white ${mobileMenu ? 'open' : ''}`}>
                <div className="close-menu position-absolute" onClick={() => setMobileMenu(false)}></div>
                <div className="container d-block">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/">
                                <a className="nav-link text-center w-100">Главная</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/catalog">
                                <a className="nav-link text-center w-100">Каталог</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/calculate">
                                <a className="nav-link text-center w-100">Доставка</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/articles">
                                <a className="nav-link text-center w-100">Статьи</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            {router.pathname == '/' ?
                                <a className="nav-link  text-center w-100" href="#contact">Контакты</a>
                                :
                                <Link href="/#contact">
                                    <a className="nav-link text-center w-100">Контакты</a>
                                </Link>
                            }
                        </li>
                        <li className="nav-item">
                            <Link href="/articles/about-company">
                                <a className="nav-link text-center w-100">О Нас</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="contact-cart">
                        <div className="contact-row">
                            <img src="/images/icon/phone.svg" className="img-icon" alt=""/>
                            <span><a href="tel:+74993777770">+7 (499) 377-77-70 </a></span>
                        </div>
                        <div className="contact-row">
                            <button className="btn grey call" data-bs-toggle="modal" data-bs-target="#modal">
                                Заказать звонок
                            </button>
                        </div>
                        <div className="contact-row">
                            <img src="/images/icon/Message.svg" className="img-icon" alt=""/>
                            <span><a href="mailto:info@glavsk.ru">info@glavsk.ru</a></span>
                        </div>
                        <div className="contact-row">
                            <img src="/images/icon/map.svg" className="img-icon" alt=""/>
                            <span className="adr">Пресненская наб., 8, стр. 1, Москва, Россия</span>
                        </div>
                    </div>
                </div>
            </div>
            <header className={`${router.pathname !== '/' ? 'content-head' : '' }`}>
                <div className="container">
                    <nav className="navbar navbar-expand-lg d-none d-lg-block">
                        <div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href="/">
                                        <a className="nav-link">Главная</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/catalog">
                                        <a className="nav-link">Каталог</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/calculate">
                                        <a className="nav-link">Доставка</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/articles">
                                        <a className="nav-link">Статьи</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    {router.pathname == '/' ?
                                        <a className="nav-link " href="#contact">Контакты</a>
                                        :
                                        <Link href="/#contact">
                                            <a className="nav-link">Контакты</a>
                                        </Link>
                                    }
                                </li>
                                <li className="nav-item">
                                    <Link href="/articles/about-company">
                                        <a className="nav-link">О Нас</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="top-rh">
                        <button className="btn sidb d-inline-block d-lg-none" type="button" onClick={() => setMobileMenu(!mobileMenu)}>
                            <span className="sr-only"></span>
                        </button>
                        <Link href="/">
                            <a className="d-flex align-items-center">
                                <img className="logo" src="/images/logo.svg" alt="logo"/>
                            </a>
                        </Link>
                        <div className="d-flex align-items-center">
                            <a href="tel:+74993777770" className="header-phone d-flex align-items-center justify-content-center">
                                <img src="/images/icon/phone.svg" width="24" alt="phone"/>
                            </a>
                            <a href="tel:+74993777770" className="d-none d-lg-inline text-decoration-none" style={{color: "#18191F", marginLeft: "4px", fontWeight: 500}}>+7(499)3777770 </a>
                            <Link href="/cart">
                                <a className="d-flex align-items-center basket position-relative">
                                    <span className="position-absolute d-flex align-items-center justify-content-center">{getItemsCount()}</span>
                                    <img src="/images/icon/basket_light.svg" alt="basket"/>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}