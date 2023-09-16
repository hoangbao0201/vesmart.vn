

const convertPrice = (price: number) => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return VND.format(price) || null;
}

export default convertPrice;