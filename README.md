# E-Commerce Backend API

A RESTful e-commerce backend built using **Node.js, Express.js, and MongoDB**. This project provides APIs for product management, shopping cart operations, order processing, user authentication, and admin order management.

## 🚀 Features

* **User Authentication:** Protected routes using authentication middleware.
* **Product Management:** Product details, pricing, categories, stock, ratings, and descriptions.
* **Shopping Cart:** Cart management through dedicated cart APIs.
* **Order Management:** Place orders, calculate order totals, and retrieve customer orders.
* **Order Details:** Fetch individual orders with associated product information.
* **Admin Order Management:** View all customer orders and update order statuses.
* **Inventory Management:** Validate product availability and deduct stock during order placement.
* **Role-Based Access:** Separate customer and admin route permissions.
* **API Testing:** Test endpoints using Postman.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication:** Custom authentication middleware
* **API Testing:** Postman
* **Version Control:** Git and GitHub

## 📂 Project Structure

```text
Ecommerce_Backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authControllers.js
│   ├── cartControllers.js
│   ├── orderControllers.js
│   └── ProductControllers.js
├── Middleware/
│   ├── adminmiddleware.js
│   └── authmiddleware.js
├── models/
│   ├── cart.js
│   ├── orders.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── cartRoutes.js
│   ├── orderRoute.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Node.js and npm
* MongoDB or a MongoDB Atlas database
* Postman (for API testing)

### 1. Clone the repository

```bash
git clone https://github.com/rathore45-56/Ecommerce_Backend
cd Ecommerce_Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the environment variables required by your application.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the exact variable names configured in your application and database connection file.

**Security:** Never commit your `.env` file or expose database credentials and JWT secrets on GitHub.

### 4. Start the application

Check the scripts in `package.json`. Depending on your configuration, run:

```bash
npm start
```

Or, if you have a development script configured:

```bash
npm run dev
```

## 🔌 API Endpoints

The following endpoints are based on the current order routes shown in the project.

### Order APIs

| Method | Endpoint              | Description                     | Access              |
| ------ | --------------------- | ------------------------------- | ------------------- |
| POST   | `/createorder`        | Place an order                  | Authenticated user  |
| GET    | `/getorders`          | Get the logged-in user's orders | Authenticated user  |
| GET    | `/getsingleorder/:id` | Retrieve an order by ID         | Authenticated user* |
| GET    | `/getallorders`       | Retrieve all customer orders    | Admin               |
| PUT    | `/updatestatus/:id`   | Update order status             | Admin               |

*Verify that the single-order controller checks ownership or admin authorization before returning an order.

These paths are relative to the mount path configured for the order router in `index.js`. For example, if the router is mounted at `/api/orders`, the full endpoint would be `/api/orders/createorder`.

### Product APIs

Product routes are defined in `routes/productRoutes.js` and handled by `controllers/ProductControllers.js`.

Available operations depend on the routes configured in your application.

### Cart APIs

Cart routes are defined in `routes/cartRoutes.js` and handled by `controllers/cartControllers.js`.

Available operations depend on the routes configured in your application.

### Authentication APIs

User and authentication functionality is organized in `routes/userRoutes.js` and `controllers/authControllers.js`.

Refer to the route files for the exact endpoint paths and HTTP methods.

## 🧪 Testing with Postman

Use Postman to test the APIs.

Recommended test scenarios:

* Register and authenticate a user.
* Access protected routes with a valid token.
* Create and retrieve products.
* Add products to the shopping cart.
* Place an order and verify the total price.
* Verify inventory updates after successful order placement.
* Check that orders exceeding available stock are rejected.
* Retrieve customer orders.
* Test admin access to order management endpoints.
* Validate order status updates and invalid status values.

## 📈 Development Roadmap

This project is being developed as part of a 21-day backend improvement plan.

Planned enhancements include:

* Product search, filtering, and pagination
* Stronger request validation and error handling
* Improved inventory consistency and order processing
* Automated API testing
* API documentation
* Additional security and performance improvements

## 👨‍💻 Author

**Utkarsh Rathore**

GitHub: [rathore45-56](https://github.com/rathore45-56)

