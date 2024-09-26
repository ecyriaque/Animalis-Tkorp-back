# Animalis

## Description
Animalis is a platform to manage animals and their owners. It includes features to add, edit, view, and delete animals. The project is built using Next.js for the frontend and NestJS for the backend.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **Docker** (version 20.12.2 or higher)
- **npm** (comes with Node.js)
- **NestJS** (if not globally installed: `npm i -g @nestjs/cli`)

---

## Installation and Usage

You have two options to run the application: running the backend via Docker or installing it manually.

### Running the Backend via Docker

To run the backend via Docker, download the necessary files from the [docker directory](/docker) of the repository and place them in the same directory.

1. **Download the Files**  
   Ensure you have the [docker-compose.yml](/docker/docker-compose.yml) and [init.sql](/docker/init.sql) files in your directory.


2. **Run the Application**  
   In the same directory as your `docker-compose.yml` and `init.sql`, follow these steps:

   1. Start the MySQL service first by running the following command:

   ```bash
   docker-compose up mysql
   ```

   Wait until MySQL is fully launched and ready.

   2. Once MySQL is up and running, start the other services with the command:

   ```bash
   docker-compose up
   ```

This will launch:
- A **MySQL** database on port 3306
- **phpMyAdmin** on port 8080 to manage the MySQL database
- The **Animalis Backend** on port 3000

---



### Running the Frontend

Once the backend is running with Docker Compose go back to the animails folder , follow these steps to run the frontend:

1. **Clone the Frontend Repository**:  
   Open a new terminal window and run the following commands:
   ```bash
   git clone https://github.com/ecyriaque/animalis-tkorp-front.git
   cd animalis-tkorp-front
   ```

2. **Create a `.env` File**:  
   In the root of the frontend repository, create a file named `.env` and set the API URL pointing to the backend:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Install Dependencies**:  
   Run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```

4. **Start the Frontend**:  
   After installing the dependencies, start the frontend server:
   ```bash
   npm run build
   npm run start -- -p<port>
   ```
   The frontend should now be accessible at http://localhost:<port>.

---
Voici la version modifiée des instructions pour créer un dossier `animalis`, un sous-dossier `bdd`, et y placer le fichier `docker-compose.yml` ainsi que `init.sql` :

---

## Running the App Manually

If you want to run the app manually, follow these steps:

1. **Create Directories**  
   First, create a folder named `animalis`, then navigate into it and create a folder named `bdd` where you'll place your Docker configuration:

   ```bash
   mkdir animalis
   cd animalis
   mkdir bdd
   ```

2. **Create the `docker-compose.yml` File**  
   In the `bdd` folder, create a file named `docker-compose.yml` with the following configuration:

   ```yaml
   services:
     mysql:
       image: mysql:8.0  # Uses the official MySQL image version 8.0
       container_name: mysql  # Container name for the MySQL service
       environment:
         MYSQL_ROOT_PASSWORD: rootpassword  # Root password for MySQL
         MYSQL_DATABASE: animalis  # Name of the database to create
         MYSQL_USER: adminAnimalis  # MySQL user for the application
         MYSQL_PASSWORD: WJAkzemDkxmy2sC  # Password for the MySQL user
       ports:
         - "3306:3306"  # Exposes the MySQL port
       volumes:
         - ./mysql-data:/var/lib/mysql  # Volume for MySQL data persistence
         - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Initialization SQL script
   ```

3. **Place the `init.sql` File**  
   In the `bdd` folder, put the [init.sql](/docker/init.sql) file that is in the docker folder of the GitHub repository.

4. **Start the Database**  
   In the `bdd` directory, use the following command to start the MySQL container:

   ```bash
   docker-compose up mysql
   ```

   This will launch only the MySQL container

## Setting Up the Backend

1. **Clone the Backend Repository**:

   go back to the animalis folder and do the folowing commands
   ```bash
   git clone https://github.com/ecyriaque/Animalis-Tkorp-back.git
   cd Animalis-Tkorp-back
   ```

2. **Create a `.env` File**:  
   In the root of the backend repository, create a file named `.env` and add the following connection details for MySQL:

   ```env
   DATABASE_TYPE=mysql
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USERNAME=adminAnimalis
   DATABASE_PASSWORD=WJAkzemDkxmy2sC
   DATABASE_NAME=animalis
   ```

3. **Install Dependencies**:  
   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

4. **Start the Backend**:  
   After installing the dependencies, start the backend server:

   ```bash
   npm start
   ```

## Setting Up the Frontend

1. **Clone the Frontend Repository**:  
   Open a new terminal window and run the following commands:

   ```bash
   git clone https://github.com/ecyriaque/animalis-tkorp-front.git
   cd animalis-tkorp-front
   ```

2. **Create a `.env` File**:  
   In the root of the frontend repository, create a file named `.env` and set the API URL pointing to the backend:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Install Dependencies**:  
   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

4. **Start the Frontend**:  
   After installing the dependencies, start the frontend server:

   ```bash
   npm run build
   npm run start -- -p <port>
   ```

The frontend should now be accessible at http://localhost:port.

---
