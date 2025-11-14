# MongoDB Atlas Setup Instructions

## How to Set Up MongoDB Atlas Database:

1. **Create a MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database)
   - Sign up for a free account

2. **Create a New Cluster**:
   - Click on "Build a Database"
   - Select the "Shared" option for a free tier
   - Choose a cloud provider and region
   - Select the cluster tier (M0 for free)
   - Name your cluster (e.g., "cheque-verification-cluster")

3. **Set Up Database Access**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose a username and password (or use AWS IAM if applicable)
   - Give the user "Read and Write" permissions

4. **Set Up IP Whitelist**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - For production, add specific IP addresses

5. **Get Connection String**:
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (format: mongodb+srv://...)
   - Replace `<username>` and `<password>` with your database user credentials

6. **Update Environment Variables**:
   - In your `.env` file, update the `MONGODB_URI` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/cheque_verification_db?retryWrites=true&w=majority
   ```

7. **Create the Cheques Collection**:
   - Once connected, the application will automatically create the `cheques` collection when it first stores a document

## Environment Variables:
Create a `.env` file in the backend directory with the following:
```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```