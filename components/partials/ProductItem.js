import Link from "next/link";
import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../redux/cart";

export default function ProductItem({item, category}) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const currentId = () => {
        return cart.length > 0 ? cart.findIndex((product) => product.id === item.id) : -1;
    };
    const [productInCart, seProductInCart] = useState(currentId() !== -1 ? true : false);

    return (
        <div className="product_item">
            <div className="product_img">
                <Link href={`/product/product-${item.id}`}>
                    <a><img src={item.urlIMG} alt="product img" /></a>
                </Link>
                {/*<div className="top_img">
                    <div className="prod_label new"></div>
                </div>*/}
                {/*<div className="bottom_img">
                    <div className="prod_icon favorite"></div>
                    <div className="prod_icon info"></div>
                </div>*/}
            </div>
            <div className="inf">
                <div className="cat position-relative">
                    <Link href={category.link}><a className="fake-link-block"></a></Link>
                    {category.name}
                </div>
                <div className="tittle_product position-relative mb-2">
                    <Link href={`/product/product-${item.id}`}><a className="fake-link-block"></a></Link>
                    {item.name}
                </div>
                <div className="prod_row">
                    <div className="price">{item.price} ₽<span>/м3</span></div>
                    {/*<div className="rating-mini">
                        <span className="active"></span>
                        <span className="active"></span>
                        <span className="active"></span>
                        <span className="active"></span>
                        <span></span>
                    </div>*/}
                </div>
                <div className="prod_row">
                    {!productInCart ?
                        <button className="btn in_cart" onClick={() => {
                            dispatch(addToCart(item))
                            seProductInCart(true);
                        }}>
                            В корзину
                        </button>
                    :
                        <button className="btn in_cart position-relative">
                            <Link href="/cart"><a className="fake-link-block"></a></Link>
                            Товар в корзине
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}