# Entertainment App Client

Welcome to the Entertainment App Client! This README will guide you through the setup, usage, and structure of the application. This app is built using modern frontend technologies including React, Redux, React-Router-Dom, Tailwind CSS, and several React utility libraries.

## Table of Contents
* Features
* Technologies Used
* Installation
* Running the App
* Project Structure
* Usage
* Contributing

## Features
* Trending and Recommended Shows: View the latest and recommended TV series and movies.
* TV Series and Movies Pages: Separate pages to explore TV series and movies.
* Bookmarking: Bookmark your favorite shows and movies.
* User Authentication: Login and signup functionality to personalize user experience.
* Infinite Scroll: Smooth infinite scrolling for content lists.

## Technologies Used
* React: JavaScript library for building user interfaces.
* Redux: State management library for React applications.
* React-Router-Dom: Declarative routing for React applications.
* React Hooks: Modern way to use state and lifecycle features in functional components.
* Tailwind CSS: Utility-first CSS framework for styling.
* React Icons: Collection of popular icons for React.
* React Infinite Scroll: Component for implementing infinite scrolling.

## Installation
To get started with the project, follow these steps:

#### 1. Clone this repository to your local machine.
    https://github.com/parthpatil01/entertainment-app-client.git
#### 2. Install dependencies using npm: 
    npm install
#### 3. Environment Variables: 
    
    VITE_APP_API_URL=http://localhost:5000/api 
   
####  4. Start the app:
    npm run dev
    
## Project Structure
Here is an overview of the project structure:

entertainment-app-client/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   │   ├── ...
│   ├── components/
│   │   ├── BookmarButton.jsx
│   │   ├── GridItem.jsx
|   |   ├── SearchInput.jsx
|   |   ├── SearchProp.jsx
│   ├── helper/
│   │   ├── makeRequestWithToeken.js
│   ├── pages/
│   │   ├── Bookmarks.jsx
│   │   ├── Details.jsx
│   │   ├── Home.jsx
│   │   ├── HomePage.jsx
│   │   ├── Login.jsx
│   │   ├── Movies.jsx
│   │   ├── Signup.jsx
│   │   ├── TvSeries.jsx
│   ├── reducer/
│   │   ├── index.js
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── bookmarkSlice.js
│   │   ├── moviesSlice.js
│   │   ├── trendingSlice.js
│   │   ├── tvseriesSlice.js
│   ├── App.js
│   ├── main.jsx
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
├── package.json
├── package-lock.json
└── ...


