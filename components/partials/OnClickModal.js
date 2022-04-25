import React, {useEffect, useState} from "react";
import InputMask from "react-input-mask";
import $ from "jquery";
import axios from "axios";
import {API_URL} from "../constant";
import {useDispatch, useSelector} from "react-redux";
import {removeAllFromCart} from "../../redux/cart";

export default function OnClickModal() {
    const [modalName, setModalName] = useState('');
    const [modalPhone, setModalPhone] = useState('');
    const [modalEmail, setModalEmail] = useState('');
    const [agreeCheckbox, setAgreeCheckbox] = useState(true);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const ls = typeof localStorage !== 'undefined' ? localStorage : undefined;

    function sendForm(e) {
        e.preventDefault();
        const emailVal = modalEmail.trim();
        const formData = {
            name: modalName.trim(),
            phone: modalPhone.trim(),
            email: emailVal,
            manager: ls?.getItem('manager') ?? 'service',
            calculationCost: cart.map((item) => {
                return {
                    id: item.id,
                    amount: item.quantity
                }
            })
        };

        if(agreeCheckbox) {
            axios.post(`${API_URL}/email-sender/sendBasketOrder`, formData)
                .then(res => {
                    $('#success-modal').addClass('open-modal after-on-click-modal');
                    $('#modal').removeClass('show').css('display', 'none');
                    dispatch(removeAllFromCart());
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="modal-title">Купить в один клик</div>
                    <div className="modal-descriptor">Заполните форму, и наш специалист свяжется с вами в ближайшее
                        время
                    </div>
                    <div className="form-wrapper w-form">
                        <form className="form" id="form-2" onSubmit={(e) => sendForm(e)}>
                            <input className="text-field w-input"
                                   data-name="Имя"
                                   name="name"
                                   maxLength="256"
                                   placeholder="Имя*"
                                   type="text"
                                   value={modalName}
                                   required="required"
                                   onChange={(e) => setModalName(e.target.value)}
                            />
                            <InputMask className="phone-input text-field w-input"
                                       name="phone"
                                       placeholder="Телефон*"
                                       mask="+7 (999) 999-99-99"
                                       value={modalPhone}
                                       required="required"
                                       onChange={(e) => setModalPhone(e.target.value)}
                            />
                            <input className="text-field w-input"
                                   name="email"
                                   maxLength="256"
                                   placeholder="E-mail"
                                   type="email"
                                   value={modalEmail}
                                   onChange={(e) => setModalEmail(e.target.value)}
                            />
                            <input type="checkbox"
                                   id="cb1"
                                   required="required"
                                   checked={agreeCheckbox}
                                   onChange={() => setAgreeCheckbox(!agreeCheckbox)}
                            />
                            <label htmlFor="cb1">
                                Я согласен на <a href="#">обработку персональных данных</a>
                            </label>
                            <button type="submit" className="btn org  main-btn form-btn">Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}