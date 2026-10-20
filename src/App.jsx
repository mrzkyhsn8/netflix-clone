import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Player from "./pages/Player";
import TvShow from "./pages/TvShow";
import Netflix from "./pages/Netflix";
import MoviePage from "./pages/MoviePage";
import MyListPage from "./pages/MyListPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignUpPage />} />
            <Route exact path="/" element={<Netflix />} />
            <Route exact path="/player" element={<Player />} />
            <Route exact path="/tv" element={<TvShow />} />
            <Route exact path="/movies" element={<MoviePage />} />
            <Route exact path="/movie" element={<MoviePage />} />
            <Route exact path="/myList" element={<MyListPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
