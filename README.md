# DeepESG Challenge

This repository contains my solution for the [DeepESG Challenge](https://github.com/deepesg/desafio-frontend)

Live version avaible at: https://deepesg-challenge.vercel.app/

# About the Project

The core application is built around the [NextJS](https://nextjs.org/). A very powerful React framework.

## Core features

- Search for weather information about brazilian cities.
- Fuzzy Search functionality on a list of all cities in the country.
- Save cities weather information to compare.
- Comparison table with sorting
- Data persistence. The saved cities will persist on browser.

## Front-End

[NextJS](https://nextjs.org/) comes with a number of tools and features which help the development proccess, perfomance and quality of the app. Furthermore is possible to create an API direct in the project, making NextJS a good choice for the problem.

[Typescript](https://www.typescriptlang.org/) for better control of the application and a safety layer while writing code, saving hours of bug hunting.

[TailwindCSS](https://tailwindcss.com/) is a CSS utility framework used for an quickly app Design.

[fuse.js](https://fusejs.io/) is a powerful fuzzy-search library. Used for fuzzy-search an list with 5000+ cities. (you can check the list of the cities in the file public/listacidades.json

[react-error-boundary](https://github.com/bvaughn/react-error-boundary) to protect the state of application without crash everything when something unexpected occurs. The library also provides an Fallback functionality while waiting for the API response.

## Server (API)

Using `NextJS API Routes` it's make easier to create an almost zero configuration API. Basically the API accept `POST` requests from the Front-End and return the weather information about the queried city. The API start together with the development script `$npm run dev`.

## Getting Started

### Installation

1. clone the repository
   ```sh
   git clone https://github.com/murilo-arruda/deepesg-challenge.git
   cd deepesg-challenge
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

3. Get your API Key creating a free tier account at [HGBrasil](https://console.hgbrasil.com/)

4. Create a file `.env.local` in the root directory to store the API key

   ```sh
   touch .env.local
   ```

5. Set the API Key inside the file `.env.local`
   ```sh
   HG_API_KEY=YOUR_KEY_HERE
   ```

### Develop

1. Start the development envoriment
   ```sh
   npm run dev
   ```
2. the app should be running on `localhost:3000`

### Notes

- Due the limitation of the [HGBrasil](https://console.hgbrasil.com/) API it's only possible to query for 10 unique cities per day.
