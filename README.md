# Eccomerce Backend API

This project contains the backend API service for the e-commerce platform, developed using Node.js and Express.js.

## Technologies

- Node.js
- Express.js
- MongoDB (or your preferred database)
- JWT Authentication

## Getting Started

Follow these steps to run the project on your local machine.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (or your preferred database)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd puma-backend


2. Install the required packages:
npm install
# or
yarn install

3. Create a .env file and add the required environment variables:
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secre

4. Start the application:
npm start
# or
yarn start

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - Register a new user

### Categories
- `GET /category` - List all categories
- `POST /category` - Create a new category

### Tags
- `GET /tag` - List all tags
- `POST /tag` - Create a new tag

### Products
- `GET /product` - List all products
- `POST /product` - Add a new product

### Cart Operations
- `GET /cart` - View the cart
- `POST /cart` - Add a product to the cart

### Order Operations
- `GET /order` - List all orders
- `POST /order` - Create a new order

### File Upload 
- `POST /upload` - File upload endpoint

Contributing

1. Fork this repository
2. Create a feature branch (git checkout -b feature/NewFeature)
3. Commit your changes (git commit -m 'Added new feature')
4. Push to the branch (git push origin feature/NewFeature)
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Project Owner - zahid.hzade001@gmail.com