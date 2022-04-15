import {useEffect} from "react";

export function validateNumber(number) {
    return number.replace(/\D+/g,"").length;
}

export function checkPhone(phone) {
    const phoneVal = phone.trim();

    if(validateNumber(phoneVal) > 0 && validateNumber(phoneVal) !== 11) {
        return false;
    } else {
        return true;
    }
}

export const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};