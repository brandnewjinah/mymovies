# 🎬 &nbsp; What is Movies?

**Movies** is a fully responsive app that lets you rate movies you've watched. All you have to do is to rate at least 10 movies, and it will give you a personalized movie profile and recommendations based on your ratings.

## ⌨️ &nbsp; Technologies

#### Backend

- Node.js
- Express
- Mongoose
- MongoDB

#### Frontend

- React
- Redux (Redux Toolkit)
- TypeScript
- Styled Components

## ⚡️ &nbsp; How it works

- Rate at least 10 movies and get a personalized movie profile and recommendations.
- Movie profile stores and organizes all your rated movies. It also predicts your favorite genres and directors.
- You get movie recommendations based on movies, genres and subjects you liked.
- If you save keywords that describe why you liked movies, it helps you get more granular recommendations.
- You can view curated collections like Oscar Winners, Feel Good Movies, etc.
- As an admin, you can create collections in an admin panel.

## 🧩 &nbsp; Features

#### Rate Movies

- Rate movies by simply cliking like or dislike button.
- A counter helps you keep track of the number of movies you've rated

#### View Personalized Profile

- Track movies you rated.
- Get predictions on genres and directors you might like.
- See what languages you liked watching movies in.
- See what subjects you might have enjoyed.

#### View Personalized Recommendations

- View recommendations based movies, genres and subjects you liked.

#### View Movie Details

- View basic informations, watch trailer, see where to stream, and see if it belongs to any collections.
- Rate movies.
- Indicate why you liked the movie.
- View similar movies.

#### View Collections

- View curated collections such as Oscar Winners, 100 Movies You Must Watch, etc.

#### Search Movies

- Search by movie title.

#### Continue Rating

- Continue rating movies.
- Sort movies by popularity, revenue, vote count, etc.
- Exclude any genres you don't want to rate.

#### Create a Collection

- An admin can
  - create a collection page
  - search and add movies to the collection
  - create a cover image for the collection

## 🧐 &nbsp; Challenges

#### Predicting Favorite Genres

- All genres are collected from liked movies. Then the favorite genres are predicted by counting the number of repeats of each genre.
- From the TMDB movie details API, genres for each movies are in an array. Some movies have an array with just genre ids and some with an array of objects with id and name.
- It was a challenge to analyze the format and conditionally apply slightly different functions to count the repeats.

#### Movie Recommendations

- To populate movie recommendations, I used TMDB's discover API extensively.
- Each time you land on the recommendations page, a random genre/keyword/movie is selected from your favorite movies. Then recommended movies based on the selection are populated on the page.
- This page seems to perform slightly differently across browsers. I would like to dive deeper to solve performance issues.
