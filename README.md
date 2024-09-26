# Animalis

**Description**:  
Briefly describe the purpose and functionality of your project.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **Docker** (version 20.12.2 or higher)
- **npm** (comes with Node.js)
- **NestJS** (if not globally installed: `npm i -g @nestjs/cli`)

---

## Installation and Usage

You have two options to run the application: via Docker or by installing it manually.

### Running the Application via Docker

To run the application via Docker, download the necessary files from the `docker` directory of the repository and place them in the same directory.

1. **Download the Files**  
   Ensure you have the `docker-compose.yml` and `init.sql` files in your directory.

2. **Run the Application**  
   In the same directory as your `docker-compose.yml` and `init.sql`, run the following command:

   - `docker-compose up`

This will launch (you can change ports and environment variables in the docker compose):
- A **MySQL** database on port 3306
- **phpMyAdmin** on port 8080 to manage the MySQL database
- The **Animalis Backend** on port 3000
- The **Animalis Frontend** on port 3001

---


## Running the app  Manually

If you want to run the app  manually  you can use the following configuration in your docker-compose.yml:

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
  phpmyadmin:
    image: phpmyadmin/phpmyadmin  # Uses the official phpMyAdmin image
    container_name: phpmyadmin  # Container name for the phpMyAdmin service
    environment:
      PMA_HOST: mysql  # Hostname of the MySQL server that phpMyAdmin should manage
      PMA_USER: adminAnimalis  # MySQL user to use for connecting to phpMyAdmin
      PMA_PASSWORD: WJAkzemDkxmy2sC  # Password for the MySQL user
    ports:
      - "8080:80"  # Exposes port 80 for phpMyAdmin on port 8080 of the host
    depends_on:
      - mysql  # Ensures that the MySQL container is started before phpMyAdmin

```
in the same folder as the docker compose you just created put the init.sql(https://github.com/ecyriaque/Animalis-Tkorp-back/blob/a00b4611a2bdab9cb63d9292950df67b41346250/docker/init.sql) file that is in the docker folder of the github repository

To start the database, use the following command:
docker-compose up mysql

This will launch only the MySQL container, and you can manage it via phpMyAdmin at http://localhost:8080.

## Setting Up the Backend

1. **Clone the Backend Repository**:
   git clone https://github.com/ecyriaque/Animalis-Tkorp-back.git
   cd Animalis-Tkorp-back

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

   npm install

4. **Start the Backend**:
   After installing the dependencies, start the backend server:

   npm start

## Setting Up the Frontend

1. **Clone the Frontend Repository**:
   Open a new terminal window and run the following commands:

   git clone https://github.com/ecyriaque/animalis-tkorp-front.git
   cd animalis-tkorp-front

2. **Create a `.env` File**:
   In the root of the frontend repository, create a file named `.env` and set the API URL pointing to the backend:
```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
```
3. **Install Dependencies**:
   Run the following command to install the necessary dependencies:

   npm install

4. **Start the Frontend**:
   After installing the dependencies, start the frontend server:

   npm run dev

The frontend should now be accessible at http://localhost:3001.
