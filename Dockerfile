# Stage 1: Build React frontend with Vite
FROM node:18-alpine AS frontend

WORKDIR /app/client

# Install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm install

# Copy the rest of the client code and build the frontend using Vite
COPY client/ ./
RUN npm run build

# Stage 2: Setup Express backend
FROM node:18-alpine AS backend

WORKDIR /app/server

# Install dependencies
COPY server/package.json server/package-lock.json ./
RUN npm install

# Copy the server source code
COPY server/ ./

# Create the public directory
RUN mkdir -p /app/server/public

# Copy the built React app from the dist folder in the frontend to the backend's public directory
COPY --from=frontend /app/client/dist /app/server/public

# Expose the backend port
EXPOSE 3000

# Start the backend
CMD ["npm", "start"]
