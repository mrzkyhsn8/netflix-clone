import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Player from "./pages/Player";
import TvShow from "./pages/TvShow";
import Netflix from "./pages/Netflix";
import MoviePage from "./pages/MoviePage";
import Header from "./components/Header";
import BackgroundImage from "./components/BackgroundImage";
import ErrorBoundary from "./components/ErrorBoundary";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/" element={<Netflix />} />
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/tv" element={<TvShow />} />
          <Route exact path="/movie" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
