# BuyBooks Backend

Express and MongoDB backend for the BuyBooks application. The server provides user registration and password login, book management, wishlist, billing details, shipping addresses, admin operations, and Cloudinary image uploads.

## Requirements

- Node.js 18 or newer
- npm
- MongoDB database
- Cloudinary account for book images

## Setup

From the `Backend` directory:

```bash
npm install
```

Create a `.env` file in this directory:

```env
PORT=8000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_KEY=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-strong-admin-password

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Do not commit `.env` or expose credentials in source code. `JWT_KEY` is used for both user and admin tokens. `ADMIN_EMAIL` and `ADMIN_PASSWORD` are used by the admin login endpoint.

## Run

Development mode with automatic restart:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The server listens on `http://localhost:8000` by default. Uploaded legacy local files are served from `/uploads`.

## API Routes

All user routes below are prefixed with `/books`.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/books/login/register` | Register a user with name, mobile number, email, password, and gender |
| POST | `/books/login/loginuser` | Authenticate a registered user with email, mobile number, and password |
| POST | `/books/login/verify-otp` | Verify an existing OTP record and return a user JWT |
| GET | `/books/login/getlogin` | List users |
| DELETE | `/books/login/delete/:id` | Delete a user login record |
| POST | `/books/images/import` | Upload a book image and create a book record |
| GET | `/books/images/get` | List books |
| DELETE | `/books/images/delete/:id` | Delete a book |
| POST | `/books/billing/import` | Add billing details, optionally with an image |
| GET | `/books/billing/get` | List billing details |
| DELETE | `/books/billing/delete/:id` | Delete billing details |
| POST | `/books/shippingaddress/add` | Add a shipping address |
| GET | `/books/shippingaddress/get` | List shipping addresses |
| DELETE | `/books/shippingaddress/delete/:id` | Delete a shipping address |
| POST | `/books/wishlist/add` | Add an item to the wishlist |
| GET | `/books/wishlist/get` | List wishlist items |
| DELETE | `/books/wishlist/delete/:id` | Delete a wishlist item |
| POST | `/books/account/add` | Add account details |
| DELETE | `/books/account/delete/:id` | Delete account details |

### Common Request Examples

Register a user:

```http
POST /books/login/register
Content-Type: application/json
```

```json
{
	"firstName": "Asha",
	"lastName": "Patel",
	"mobileno": "9999999999",
	"email": "customer@example.com",
	"password": "a-strong-password",
	"gender": "female"
}
```

Log in:

```http
POST /books/login/loginuser
Content-Type: application/json
```

```json
{
	"email": "customer@example.com",
	"mobileno": "9999999999",
	"password": "a-strong-password"
}
```

The login response contains a user JWT. Send it as `Authorization: Bearer <token>` when authentication middleware is added to protected user routes. The `/books/login/verify-otp` endpoint is retained for OTP records created by older flows; the current login endpoint uses a password.

Book image upload endpoints use `multipart/form-data` with the file field named `image`.

### Book Upload Fields

`POST /books/images/import` and `POST /admin/books` accept these multipart fields:

| Field | Required | Description |
| --- | --- | --- |
| `image` | Yes | Book cover image file |
| `title` | Yes | Book title |
| `author` | No | Author name |
| `Publisher` | No | Publisher name |
| `price` | Yes | Selling price |
| `originalPrice` | Yes | Original price |
| `discount` | Yes | Discount value |
| `category` | Yes | `bestseller`, `newarrival`, `school`, `fiction`, `children`, `games`, `higher`, `testprep`, or `preorder` |

### JSON Resource Fields

- Billing: `title`, `author`, `Publisher`, `price`, `originalPrice`, `discount`, `image`
- Wishlist: `image`, `title`
- Shipping address: `surName`, `firstName`, `lastName`, `email`, `mobileno`, `address`, `city`, `state`, `country`, `zipcode`

Most create endpoints return HTTP `201` on success. Invalid input returns `400`, missing records return `404`, and server or database failures return `500`.

## Admin API

Admin routes are prefixed with `/admin`. Login does not require a token. All other admin routes require:

```http
Authorization: Bearer <admin-token>
```

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/admin/login` | Authenticate an admin and return an admin token |
| GET | `/admin/dashboard` | Get dashboard data |
| GET | `/admin/books` | Get books for the admin dashboard |
| GET | `/admin/customers` | Get customer data |
| POST | `/admin/books` | Create a book; accepts multipart field `image` |

## Login Flow

1. Register with `firstName`, `lastName`, `mobileno`, `email`, `password`, and `gender` at `/books/login/register`.
2. Log in with `email`, `mobileno`, and `password` at `/books/login/loginuser`.
3. Store the returned JWT for the user session.

Registration returns `409` when the email is already registered. Login returns `404` when the user does not exist and `401` when the password is invalid.

## Project Structure

```text
Backend/
|-- index.js                 # Express entry point and middleware setup
|-- package.json             # Scripts and dependencies
|-- README.md                # Backend documentation
|-- src/
|   |-- Config/
|   |   `-- cloudinary.js             # Cloudinary configuration
|   |-- Controller/                   # Request handlers
|   |   |-- Account.js
|   |   |-- AdminController.js
|   |   |-- BillingDetails.js
|   |   |-- ImagesController.js
|   |   |-- Login.js
|   |   |-- ShippingAddress.js
|   |   |-- WishList.js
|   |   `-- varifyOtp.js
|   |-- DBConnection/
|   |   `-- MongoDBConnection.js       # MongoDB connection
|   |-- Middleware/
|   |   |-- adminAuth.js               # Admin bearer-token authentication
|   |   |-- cloudinaryMiddleware.js
|   |   |-- multerStorage.js            # Multipart upload handling
|   |   `-- ...
|   |-- Models/                         # Mongoose models and email service
|   |   |-- Account.js
|   |   |-- Admin.js
|   |   |-- BillingDetails.js
|   |   |-- Login.js
|   |   |-- ShippingAddress.js
|   |   |-- WishList.js
|   |   |-- imagesModels.js
|   |   `-- sendMail.js                 # Legacy Brevo OTP email helper
|   `-- Routes/                         # Express route modules
|       |-- Account.js
|       |-- Admin.js
|       |-- BillingDetails.js
|       |-- Images.js
|       |-- Login.js
|       |-- ShippingAddress.js
|       |-- WishList.js
|       `-- main.js                     # /books route aggregator
`-- .env                     # Local secrets; do not commit
```

## Notes

- CORS is currently configured to allow all origins for the frontend integration.
- Image upload endpoints use `multipart/form-data` and the field name `image` where noted.
- Keep Cloudinary credentials in environment variables only.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` are used by the admin login endpoint and must be configured before admin login can work.
- User JWTs expire after one day; admin JWTs expire after seven days.
