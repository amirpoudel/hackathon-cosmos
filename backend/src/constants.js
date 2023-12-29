const ROLES = {
    
    ADMIN:"admin",
    MANAGER:"manager",
    BARTENDER:"bartender",
    WAITER:"waiter",
    CHEF:"chef",
    CASHIER:"cashier",
}

const TABLE_STATUS = {
    AVAILABLE:"available",
    OCCUPIED:"occupied",
    RESERVED:"reserved",
    UNAVAILABLE:"unavailable"
}

const ORDER_STATUS = {

    PENDING:"pending",
    COOKING:"cooking",
    READY_TO_SERVE:"ready_to_serve",
    SERVED:"served",

}

const ORDER_PAYMENT_STATUS = {

        PAID:"paid",
        UNPAID:"unpaid",
}

const ORDER_PAYMENT_TYPE = {
    CASH:"cash",
    CARD:"card",
    QR:"qr"
}

function isPaymentTypeValid(paymentType){
    return Object.values(ORDER_PAYMENT_TYPE).includes(paymentType);
}

module.exports = {
    ROLES,
    TABLE_STATUS,
    ORDER_STATUS,
    ORDER_PAYMENT_STATUS,
    ORDER_PAYMENT_TYPE,

    isPaymentTypeValid
}