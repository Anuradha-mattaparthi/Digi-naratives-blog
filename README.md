Backend (Laravel):

Install Dependencies:
Install XAMPP and Composer if you haven’t already.
Make sure XAMPP is running with Apache and MySQL.

Database Setup:
Open MySQL admin by visiting http://localhost/phpmyadmin/.

Create a new database.
Environment Configuration:


Edit the following lines in .env:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=

Run Migrations:
In your terminal, run:
php artisan migrate:fresh

Start Laravel:
Run:
php artisan serve


Frontend (React)
Install Node.js:
Make sure you have the latest version of Node.js installed.

Navigate to Your React Project:
Open a terminal and go to your React project directory.

Install Dependencies:
Run:
npm install

Run React:
Start the development server:
npm run dev

Open in browser:- http://localhost:5173
