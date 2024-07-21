# Cryptonite

**Cryptonite** is a web application designed to track live cryptocurrency prices and view historical data. It leverages the CoinGecko API to provide up-to-date and historical information on various cryptocurrencies.

## Features

- **Live Cryptocurrency Tracking**: Monitor real-time price updates for a wide range of cryptocurrencies.
- **Public Companies Holding**: View public companies holding cryptocurrencies.
- **Historical Data**: Access historical price data for selected cryptocurrencies over specified time ranges.
- **Search Functionality**: Quickly find cryptocurrencies and view their current and historical data.

## Extra Features

- **Search Bar**: Search for cryptocurrencies with suggestions and recent searches.
- **Drag-and-Drop Watchlist**: Add cryptocurrencies to a watchlist using a drag-and-drop interface.
- **Server Side Rendering**: Utilizes Next.js server components for improved performance and server-side rendering.

## API Endpoints

The application uses the following CoinGecko API endpoints:

- **Get Coin Data**:

  - **Endpoint**: `https://api.coingecko.com/api/v3/coins/{id}`
  - **Description**: Fetches detailed information about a specific cryptocurrency.

- **Search for Coins**:

  - **Endpoint**: `https://api.coingecko.com/api/v3/search`
  - **Description**: Provides search functionality to find cryptocurrencies based on user queries.

- **Market Chart Data**:
  - **Endpoint**: `https://api.coingecko.com/api/v3/coins/{id}/market_chart/range`
  - **Description**: Obtains market chart data for a cryptocurrency over a specified date range.

## Installation

To get started with Cryptonite, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/thekavikumar/Cryptonite.git
cd Cryptonite
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to access the application.

## Docker Instructions

**Cryptonite** is dockerized for easier deployment and development. Follow these instructions to run the application using Docker:

### Prerequisites

- Make sure Docker is installed on your machine. You can download Docker from [here](https://www.docker.com/products/docker-desktop).

### Running with Docker

1. **Build the Docker Image**

   Navigate to the root directory of the Cryptonite project and build the Docker image using the following command:

   ```bash
   docker build -t cryptonite .
   ```

2. **Run the Docker Container**

   After building the image, you can run the application in a Docker container with the following command:

   ```bash
   docker run -p 3000:3000 cryptonite
   ```

   This maps port 3000 of the container to port 3000 on your host machine.

3. **Access the Application**

   Open your browser and navigate to `http://localhost:3000` to access the Cryptonite application.

### Docker Compose

If you prefer to use Docker Compose, you can use the provided `docker-compose.yml` file to simplify the process.

1. **Start the Application**

   Run the following command in the root directory of the project:

   ```bash
   docker-compose up
   ```

2. **Access the Application**

   Open your browser and navigate to `http://localhost:3000` to access the Cryptonite application.
