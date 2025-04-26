# BookReview.in

## BookReview.in is a web application that allows users to create and manage book reviews.

# Backend Repository https://github.com/DonaldReddy/we-backend

## Home
![Main Screen](https://github.com/DonaldReddy/we-frontend/blob/main/src/assets/main-screen.png)

## Books
![Main Screen](https://github.com/DonaldReddy/we-frontend/blob/main/src/assets/book-screen.png)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/DonaldReddy/we-frontend.git
    cd we-frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and copy the contents of `.env.example` into it. Update the environment variables as needed.

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to see the application in action.

# Setup Backend before running the frontend

## Usage

- Register a new account or log in with an existing account.
- Browse through the list of books and their reviews.
- Search for specific books or authors using the search bar.
- Create, edit, or delete your own book reviews.

# Accounts

- **Admin**:

  - Email: admin@acb
  - Password: test@123
  - can create, edit, and delete any book .

- **User**:
  - create your own account using the register page.
  - can create, edit, and delete your own book reviews on any book.
  - can view all the books and their reviews.
  - can search for books and authors using the search bar.

# Features

- User authentication (registration, login, logout).
- Book management (create, edit, delete books).
- Review management (create, edit, delete reviews).
- Search functionality for books and authors.
- used AI to refine the review.

# Technologies Used

- React.js: A JavaScript library for building user interfaces.
- Redux: A state management library for JavaScript applications.
- React Router: A library for routing in React applications.
- Axios: A promise-based HTTP client for the browser and Node.js.
- Tailwind CSS: A utility-first CSS framework for styling.
- Vite: A fast build tool and development server for modern web applications.
