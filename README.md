# Cryptonite

**Cryptonite** is a web application designed to track live cryptocurrency prices and view historical data. It leverages the CoinGecko API to provide up-to-date and historical information on various cryptocurrencies.

## Features

- **Live Cryptocurrency Tracking**: Monitor real-time price updates for a wide range of cryptocurrencies.
- **Historical Data**: Access historical price data for selected cryptocurrencies over specified time ranges.
- **Search Functionality**: Quickly find cryptocurrencies and view their current and historical data.
- **Drag-and-Drop Watchlist**: Add cryptocurrencies to a watchlist using a drag-and-drop interface.
- **Next.js Server Components**: Utilizes Next.js server components for improved performance and server-side rendering.

## API Endpoints

The application uses the following CoinGecko API endpoints:

- **Get Coin Data**:

  - Endpoint: `https://api.coingecko.com/api/v3/coins/{id}`
  - Description: Fetches detailed information about a specific cryptocurrency.

- **Search for Coins**:

  - Endpoint: `https://api.coingecko.com/api/v3/search`
  - Description: Provides search functionality to find cryptocurrencies based on user queries.

- **Market Chart Data**:
  - Endpoint: `https://api.coingecko.com/api/v3/coins/{id}/market_chart/range`
  - Description: Obtains market chart data for a cryptocurrency over a specified date range.

## Installation

To get started with Cryptonite, clone the repository and install the necessary dependencies:

```bash copy
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
