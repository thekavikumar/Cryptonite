# Use an official Node.js runtime as a parent image
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller image for the final build
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json /app/package-lock.json ./

# Install production dependencies
RUN npm install --only=production

# Expose port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
