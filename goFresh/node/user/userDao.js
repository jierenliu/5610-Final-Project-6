import model from './userModel.js';

export const findTopSeller = () => {
    return model.find({ isSeller: true })
        .sort({ 'seller.rating': -1 })
        .limit(3);
}

export const findOne = (myEmail) => {
    return model.findOne({email: myEmail});
}

export const createNew = (myName, myEmail, myPassword) => {
    return new model({
        name: myName,
        email: myEmail,
        password: myPassword
    });
}

export const findById = (myId) => {
    return model.findById(myId);
}

export const find = () => {
    return model.find({});
}