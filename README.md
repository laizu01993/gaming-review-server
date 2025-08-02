
# Gaming Review Backend

This is the backend server for the **Gaming Review** application. It handles API requests for game reviews, watchlists, and user management. Built using **Node.js**, **Express.js**, and **MongoDB**.

---

## Features
- **Game Reviews CRUD**: Add, read, update, and delete reviews.
- **User Authentication Support**: Works with Firebase authentication (from frontend).
- **Watchlist**: Add reviews to a personal watchlist.
- **Separate Collections**:
  - `review` - Stores game reviews
  - `watchlist` - Stores user's watchlisted games
  - `users` - Stores user data

---

## Technologies Used
- **Node.js** (Runtime)
- **Express.js** (Framework)
- **MongoDB** (Database)
- **Dotenv** (Environment variables)
- **Cors** (Cross-Origin Resource Sharing)

---

## API Endpoints
### Reviews
- `POST /review` → Add new review
- `GET /review` → Get all reviews
- `GET /topReview` → Get top-rated reviews (limit 6)
- `GET /review/:id` → Get single review by ID
- `PUT /review/:id` → Update review
- `DELETE /review/:id` → Delete review
- `GET /myReviews?email={userEmail}` → Get reviews for specific user

### Watchlist
- `POST /watchlist` → Add item to watchlist
- `GET /watchlist?email={userEmail}` → Get user's watchlist

### Users
- `POST /users` → Add new user
- `GET /users` → Get all users

---

## Environment Variables
Create a `.env` file in the root of your backend with:
PORT=5000
DB_USER=yourMongoDBUsername
DB_PASSWORD=yourMongoDBPassword



---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/laizu01993/gaming-review-server.git
   cd gaming-review-server```


npm install

npm start


