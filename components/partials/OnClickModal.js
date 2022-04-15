import React, {useState} from "react";
import InputMask from "react-input-mask";
import $ from "jquery";
import axios from "axios";
import {API_URL} from "../constant";

export default function OnClickModal() {
    const [modalName, setModalName] = useState('');
    const [modalPhone, setModalPhone] = useState('');
    const [modalEmail, setModalEmail] = useState('');
    const [agreeCheckbox, setAgreeCheckbox] = useState(true);

    let id;
    if (typeof window !== "undefined") {
        const list = window.location.pathname.split('-');
        id = Number(list[list.length - 1]);
    }

    function sendForm(e) {
        e.preventDefault();
        const emailVal = modalEmail.trim();
        const formData = {
            name: modalName.trim(),
            phone: modalPhone.trim(),
            email: emailVal,
            calculationCost: [
                {
                    id,
                    amount: 1
                }
            ]
        };

        if(agreeCheckbox && (emailVal !== '')) {
            axios.post(`${API_URL}/email-sender/sendBasketOrder`, formData)
                .then(res => {
                    $('#success-modal').addClass('open-modal');
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
                                   placeholder="Имя"
                                   type="text"
                                   value={modalName}
                                   onChange={(e) => setModalName(e.target.value)}
                            />
                            <InputMask className="phone-input text-field w-input"
                                       name="phone"
                                       placeholder="Телефон"
                                       mask="+7 (999) 999-99-99"
                                       value={modalPhone}
                                       onChange={(e) => setModalPhone(e.target.value)}
                            />
                            <input className="text-field w-input"
                                   name="email"
                                   maxLength="256"
                                   placeholder="E-mail*"
                                   type="email"
                                   value={modalEmail}
                                   required="required"
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