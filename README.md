# Full Stack Project Setup Guide

This guide will help you set up the full stack project, covering all possible errors and setup issues. Follow the steps carefully to ensure everything works smoothly.

---

## Frontend Setup

1. **Install Node.js**

   - Download and install Node.js from the official [Node.js website](https://nodejs.org/en/download/prebuilt-installer).
   - After installation, verify that Node.js is installed by running the following command in your terminal:
     ```sh
     node -v
     ```
     You should see the version number if Node.js is installed correctly.

2. **Navigate to the Client Directory**

   - Open your terminal and navigate to the client directory of your project:
     ```sh
     cd /client
     ```

3. **Install Dependencies**

   - Run the following command to install all necessary dependencies:

     ```sh
     npm install
     ```

   - If you encounter any errors during installation, try deleting the `node_modules` folder and `package-lock.json` file, then run the command again:
     ```sh
     rm -rf node_modules package-lock.json
     npm install
     ```

4. **Create Environment Variables File**

   - Copy the contents from `.env.example` to a new file named `.env`:
     ```sh
     cp .env.example .env
     ```

5. **Run the Development Server**
   - Start the frontend development server by running:
     ```sh
     npm run dev
     ```
   - Open your browser and go to `http://localhost:3000` to see the frontend application.

---

## Backend Setup

1. **Install Docker Desktop**

   - Follow the [official Docker installation guide for Windows](https://docs.docker.com/desktop/install/windows-install/) to install Docker Desktop.
   - After installation, open Docker Desktop and ensure it is running.

2. **Pull the Latest MySQL Image**

   - Run the following command to pull the latest MySQL image:
     ```sh
     docker pull mysql:latest
     ```

3. **Run the MySQL Container**

   - Run the following command to start the MySQL container:
     ```sh
     docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mydatabase -p 3306:3306 -d mysql:latest
     ```

4. **Ensure the Container is Running**

   - Ensure the container is running correctly by checking Docker Desktop or running:
     ```sh
     docker ps
     ```

5. **Navigate to the Backend Directory**

   - Open your terminal and navigate to the backend directory of your project:
     ```sh
     cd /backend
     ```

6. **Create Environment Variables File**

   - Copy the contents from `.env.example` to a new file named `.env`:
     ```sh
     cp .env.example .env
     ```

7. **Create an Account in Zoho Mail**

   - Sign up for a personal mail account on [Zoho Mail](https://www.zoho.com/mail/).
   - Update the `.env` file with your Zoho Mail details and other required environment variables.

8. **Install Dependencies**

   - Run the following command to install all necessary dependencies:
     ```sh
     npm install
     ```

9. **Run Migrations**

   - Run the database migrations to set up the initial schema:

     ```sh
     npm run migrate
     ```

   - If you encounter any errors, make sure your MySQL container is running and the connection details in the `.env` file are correct.

10. **Run the Backend Server**
    - Start the backend development server by running:
      ```sh
      npm run dev
      ```

---

### Common Issues and Troubleshooting

- **Node.js Installation Issues:**

  - Ensure you have downloaded the correct installer for your operating system.
  - Restart your terminal or computer after installation.

- **npm Install Errors:**

  - Delete `node_modules` and `package-lock.json`, then try `npm install` again.
  - Ensure your internet connection is stable.

- **Docker Issues:**

  - Ensure Docker Desktop is running.
  - If the MySQL container fails to start, check for port conflicts (port 3306 might be in use).

- **MySQL Connection Errors:**

  - Verify the MySQL container is running with `docker ps`.
  - Double-check the MySQL connection details in the `.env` file.

- **Backend Server Errors:**
  - Ensure all environment variables are correctly set in the `.env` file.
  - Check the terminal output for specific error messages and address them accordingly.

By following these steps and troubleshooting tips, you should be able to set up and run your full stack project successfully.
