import React, {useRef, useState} from "react";
import $ from "jquery";
import {useOutsideClick} from "../helpers";
import {useRouter} from "next/router";

export const SuccessModal = (props) => {
    const successModal = useRef()

    useOutsideClick(successModal, () => {
        $('#success-modal').removeClass('open-modal');
        $('.after-on-click-modal').length && $('.modal-backdrop').remove();
    });

    return (
        <div className="modal fade" id="success-modal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div ref={successModal} className="modal-content">
                    <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={() => {
                        $('#success-modal').removeClass('open-modal');
                        $('.modal-backdrop').remove()
                    }}></button>
                    <div className="modal-title text-center">Спасибо за заявку</div>
                    <div className="modal-descriptor text-center">Наш специалист свяжется с вами в ближайшее
                        время
                    </div>
                </div>
            </div>
        </div>
    )
}