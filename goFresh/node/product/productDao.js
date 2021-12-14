import model from './productModel.js';

export const countNum = (filter) => {
    return model.count(filter);
}

export const find = (sellerFilter, nameFilter, categoryFilter, priceFilter, ratingFilter, sortOrder, pageSize, page) => {
    return model.find({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
    }).populate('seller', 'seller.name seller.logo')
        .sort(sortOrder)
        .skip(pageSize * (page - 1))
        .limit(pageSize);
}

export const findCategory = () => {
    return model.find().distinct('category');
}

export const findById = (myID) => {
    return model.findById(myID).populate(
        'seller',
        'seller.name seller.logo seller.rating seller.numReviews'
    );
}

export const createNew = (myName, mySeller) => {
    return new model({
        name: 'sample name ' + myName,
        seller: mySeller,
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    })
}

export const justFindById = (myID) => {
    return model.findById(myID);
}
