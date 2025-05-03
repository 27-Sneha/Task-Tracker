## Installation

### Backend

1. Clone the repository:

   ```sh
   git clone https://github.com/27-Sneha/Task-Tracker.git
   cd Task-Tracker
   ```

2. Navigate to the backend directory:

   ```sh
   cd backend
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Update MongoDB configuration:

   - Open `backend/.env` and modify the following :

     ```javascript
        mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority&appName=<appname>
     ```

     Replace the following placeholders in your configuration files:

     - `<username>`: Your MongoDB username
     - `<password>`: Your MongoDB password
     - `<cluster>`: The MongoDB cluster URL
     - `<database>`: The MongoDB database name
     - `<appname>`: Optional. The name of your application

5. Start the backend server:
   ```sh
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.
