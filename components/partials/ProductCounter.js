import React, {useState} from "react";
import {addToCart, decrementQuantity} from "../../redux/cart";
import {useDispatch, useSelector} from "react-redux";

export default function ProductCounter({productData}) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const productInCartIndex = cart.length > 0 ? cart.findIndex((product) => product.id === productData.id) : -1;
    const [count, setCount] = useState(productInCartIndex !== -1 ? cart[productInCartIndex].quantity : 0);
    function inc() {
        setCount(count + 1);
        dispatch(addToCart(productData));
    }

    function dec() {
        if(count > 0) {
            setCount(count - 1);
            dispatch(decrementQuantity(productData.id));
        }
    }

    return (
        <div className="number" data-step="1" data-min="1" data-max="100">
            <div className="number-minus" onClick={() => dec()}>−</div>
            <input className="number-text"
                   type="number"
                   name="count"
                   value={count}
                   readOnly
            />
            <div className="number-plus" onClick={() => inc()}>+</div>
        </div>
    )
}