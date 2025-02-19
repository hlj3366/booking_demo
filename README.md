# Hilton Restaurant Booking System

## Overview
This is a modern web application for managing restaurant bookings at Hilton. It provides two main interfaces:
1. **Guest Interface**: Allows guests to make, update, and cancel bookings.
2. **Admin Interface**: Enables restaurant staff to manage bookings, update statuses, and view booking details.

## Features
### Guest Features
- Create new bookings with personal details
- Input validation for phone numbers
- Select table size and arrival time
- Simple and intuitive booking form

### Admin Features
- View all bookings with filtering options
- Update booking details
- Mark bookings as completed or cancelled
- Modern dashboard with real-time updates

## Technologies Used
- **Frontend**: React, TypeScript, Apollo Client
- **Backend**: Node.js, Express, Apollo Server
- **Database**: MongoDB
- **Styling**: Modern CSS with glassmorphism effects

## Installation
1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add your MongoDB connection string:
        ```
        MONGO_URI=mongodb://localhost:27017/hilton-restaurant
        ```
    - Note: quickly setup a local mongoDB instance using docker
        ```
        docker pull mongo
        docker run -d -p 27017:27017 --name mongodb mongo
        ```
4. Start the development server:
    ```bash
    npm run server
    ```

## Running the Application
- **Development Mode**:
    ```bash
    npm run dev
    ```
- **Production Build**:
    ```bash
    npm run build
    npm start
    ```

## Project Structure
```
hilton-restaurant-booking/
├── server/               # Backend code
│   ├── models/           # MongoDB models
│   ├── resolvers.js      # GraphQL resolvers
│   ├── schema.js         # GraphQL schema
│   └── index.js          # Server entry point
├── src/                  # Frontend code
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point
│   └── App.css           # Global styles
├── package.json          # Project dependencies
├── README.md             # Project documentation
└── .env                  # Environment variables
```

## Usage
1. **Guest Booking**:
    - Visit the guest booking page
    - Fill in the booking form
    - Submit to create a new booking

2. **Admin Dashboard**:
    - Visit the admin dashboard
    - Use filters to view specific bookings
    - Click on a booking to edit details
    - Mark bookings as completed or cancelled

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries, please contact:
- Email: support@hilton.com
- Phone: +1 800-HILTONS
