import model from './orderModel.js';

export const findPopulate = (filter) => {
    return model.find(filter).populate(
        'user',
        'name'
    );
}

export const aggregate = (character) => {
    return model.aggregate(character);
}

export const find = (myID) => {
    return model.find({user: myID});
}

export const newOrder = (info, myID) => {
    return new model({
        seller: info.orderItems[0].seller,
        orderItems: info.orderItems,
        shippingAddress: info.shippingAddress,
        paymentMethod: info.paymentMethod,
        itemsPrice: info.itemsPrice,
        shippingPrice: info.shippingPrice,
        taxPrice: info.taxPrice,
        totalPrice: info.totalPrice,
        user: myID,
    });
}

export const findById = (myId) => {
    return model.findById(myId);
}

export const findPopulateByEmail = (filter) => {
    return model.find(filter).populate(
        'user',
        'email name'
    );
}

export const setOrder = (order, info) => {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: info.id,
        status: info.status,
        update_time: info.update_time,
        email_address: info.email_address
    };
}

export const setOrderDelivered = (order) => {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
}