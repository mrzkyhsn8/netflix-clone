import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const TMDB_BASE_URL = import.meta.env.VITE_API_URL;
const MY_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  try {
    const [movieGenresRes, tvGenresRes] = await Promise.all([
      axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`),
      axios.get(`${TMDB_BASE_URL}/genre/tv/list?api_key=${MY_API_KEY}`),
    ]);
    const combined = [...(movieGenresRes.data?.genres || [])];
    (tvGenresRes.data?.genres || []).forEach((tg) => {
      if (!combined.some((g) => g.id === tg.id)) {
        combined.push(tg);
      }
    });
    return combined;
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    return [];
  }
});

const arrayOfMovieData = (array, moviesArray, genres) => {
  array?.forEach((movie) => {
    if (!movie || !movie.backdrop_path) return;

    const moviesGenres = [];
    movie.genre_ids?.forEach((genre) => {
      const name = genres?.find(({ id }) => id === genre);
      if (name) moviesGenres.push(name.name);
    });

    if (!moviesArray.some((m) => m.id === movie.id)) {
      moviesArray.push({
        id: movie.id,
        name: movie?.title || movie?.name || movie?.original_title || movie?.original_name || "Unknown",
        image: movie.backdrop_path,
        genres: moviesGenres.slice(0, 2),
      });
    }
  });
};

const getMovieData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
    try {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      if (results && Array.isArray(results)) {
        arrayOfMovieData(results, moviesArray, genres);
      }
    } catch (err) {
      console.error(`Error fetching page ${i}:`, err);
      break;
    }
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, myThunk) => {
    const {
      netflix: { genres },
    } = myThunk.getState();
    return getMovieData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`,
      genres,
      true
    );
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      console.error("fetchMovies rejected:", action.error);
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
