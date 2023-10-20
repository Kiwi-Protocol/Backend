# Use an official Node.js runtime as the base image
FROM node:18

# Set the environment variables
ENV PORT=3001
ENV MONGO_URI=mongodb+srv://KiwiProtocol:KiwiProtocol@cluster0.upplpbi.mongodb.net/?retryWrites=true&w=majority

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the TypeScript source code to the container
COPY . .

# Build the TypeScript code to JavaScript using the tsconfig.json file
RUN npm run build -- --project tsconfig.json

# Expose the port that the Express app listens on
EXPOSE 3001

# Start the Express app
CMD ["node", "release/server.js"]
