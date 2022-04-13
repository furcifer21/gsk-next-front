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