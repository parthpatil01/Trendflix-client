# Entertainment App Client

Welcome to the Entertainment App Client! This README will guide you through the setup, usage, and structure of the application. This app is built using modern frontend technologies including React, Redux, React-Router-Dom, Tailwind CSS, and several React utility libraries.

#### Live link: https://entertainment-app-9jvl.onrender.com

## Table of Contents
* Features 
* Technologies Used 
* Installation
* Running the App 
* Project Structure 
* Usage 
* Screenshots 

## Features
#### Trending and Recommended Shows: View the latest and recommended TV series and movies.
#### TV Series and Movies Pages: Separate pages to explore TV series and movies. 
#### Bookmarking: Bookmark your favorite shows and movies. 
#### User Authentication: Login and signup functionality to personalize user experience. 
#### Infinite Scroll: Smooth infinite scrolling for content lists. 
#### Search: Find your favorite TV series or movies by title. <br/>

## Technologies Used
* React
* Redux
* React-Router-Dom
* React Hooks
* Tailwind CSS
* React Icons
* React Infinite Scroll

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
```bash
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
```

## Usage
### Homepage
 Trending and Recommended: Displays trending and recommended TV series and movies. <br/>
 Bookmarking: Click the bookmark icon on any show or movie to add it to your bookmarks. 
### TV Series and Movies Pages
 Browse through a list of TV series or movies with infinite scroll.
### Bookmarks
 View all your bookmarked shows and movies on the Bookmarks page.
### Authentication
 Login: Access the login page to sign in with your credentials. <br/>
 Signup: Register a new account using the signup page.
### Search
 Search Functionality: Use the search bar to find your favorite TV series or movies by title.

 ## Screenshots
 ![homepage](https://imgur.com/rIrNuPb.png)
 ![movies](https://imgur.com/nCHVLod.png)
 ![search](https://imgur.com/nL0xuO2.png)
 ![tvseries](https://imgur.com/trn93Gx.png)
 ![bookmarks](https://imgur.com/xV7tpC1.png)
 ![signup](https://imgur.com/rszQNQN.png)
 ![signin](https://imgur.com/Xnh00JS.png)
 
 
