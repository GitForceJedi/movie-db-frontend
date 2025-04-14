## My Movie DB - FrontEnd

This is a TypeScript-based React application built with Vite that serves as the user interface for a full-stack movie and review management system. The app allows users to browse, filter, and explore movies and reviews, with a developer-focused feature: real-time SQL query visibility.

The purpose of the full stack app is to showcase how a Frontend, Backend, and Database work together to deliver the data and interactivty to the end user.
The frontend showcases the interaction with the database, upon interactions with the frontend, via dynamic SQL queries displayed directly in the webpage.

This way a user can see eaxctly how each of their actions interacts with a relational database.

## Tech Stack

React 18 + TypeScript

Vite (ultra-fast dev/build tool)

Tailwind CSS (utility-first styling)

Custom React Hooks for clean state logic

Service Layer for API separation

GitHub Pages for deployment (custom domain: kenwillcode.com)

## Key Features

Movie Explorer: Browse all movies with title, description, genre, rating, theater status

View average review stars calculated from submitted ratings

## Intelligent Filtering

Movies: Dynamically select filters by rating, genre, average stars, and in-theaters status

Reviews: Dynamically select filters by reviewer type (audience/critic), movie, rating, and stars

## SQL Query Transparency

See the actual SQL query sent to the database for each dynamic filter/search

Showcases what request are sent to the database (via the Backend) when interacting with the Frontend

Parameters used in each query are displayed below the SQL block

## Custom Hooks, Modular, & Scalable Design

useFetchMovies and useFetchReviews hooks abstract fetch logic

movieService.ts and reviewService.ts encapsulate API interaction

Components are cleanly split (e.g. MovieList, ReviewList, FilterPanel)

## Deployment

Front-End: GitHub Pages
kenwillcode.com/movie-db-frontend

Back-End: Node.js + PostgreSQL hosted on Render

API URL managed via VITE_API_URL environment variable

## How Filtering Flows:

1. MovieList.tsx (componenet)
   ➤ Uses useFetchMovies() custom hook
   ➤ Renders <FilterPanel onFilter={fetchMovies} />
2. FilterPanel.tsx (component)
   ➤ Calls onFilter(filters) when the form is submitted
3. useFetchMovies.ts (custom hook)
   ➤ Exposes fetchMovies() which uses movieService.getMovies(filters)
4. movieService.ts (service)
   ➤ Builds a URL with the filters
   ➤ Calls the API service, which uses fetch(...)

---

## In Code:

## 1. You Submit the Filter Form

Inside FilterPanel.tsx:

onFilter({
rating: rating || undefined,
genre: genre || undefined,
inTheaters: inTheaters || undefined,
stars: stars || undefined,
});
This calls the onFilter function passed from MovieList, with all selected filters.

---

## 2. onFilter is Actually fetchMovies from useFetchMovies

In MovieList.tsx:

const { movies, sql, params, fetchMovies } = useFetchMovies();
<FilterPanel onFilter={fetchMovies} />
So onFilter(...) becomes fetchMovies(filters).

---

## 3. fetchMovies(filters) Calls movieService.getMovies(filters)

In useFetchMovies.ts:

const fetchMovies = (filters = {}) => {
movieService.getMovies(filters).then((data) => {
setMovies(data.data || []);
setSql(data.sql || '');
setParams(data.params || []);
});
};

---

## 4. movieService.getMovies(filters) Builds the URL

In movieService.ts:
ts
CopyEdit
export const getMovies = async (filters: Record<string, any> = {}) => {
const url = new URL(`${import.meta.env.VITE_API_URL}/movies`);
Object.entries(filters).forEach(([key, val]) => {
if (val !== undefined && val !== '') {
url.searchParams.append(key, val.toString());
}
});

const res = await fetch(url.toString());
return res.json();
};

## Example:

The user chooses:
• Rating = PG-13
• In Theaters = ✅
• Genre = Horror
• Stars = 4
Then the final API call becomes:
GET https://your-backend.com/api/movies?rating=PG-13&inTheaters=true&genre=Horror&stars=4

## Reviews

\*The same flow is executed for Reviews to deliver the same result.
