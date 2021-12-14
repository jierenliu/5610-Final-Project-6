import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Mike',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'MARs Farm',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 12,
      },
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Apple',
      category: 'Fruits',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Royal Farm',
      rating: 4.5,
      numReviews: 10,
      description: 'Tasty',
    },
    {
      name: 'Pear',
      category: 'Fruits',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Royal Farm',
      rating: 4.5,
      numReviews: 10,
      description: 'Tasty',
    }
  ],
};
export default data;
