import { PATH } from "constants/paths";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRoute from "routes/homeRoute";
import LoginRoute from "routes/loginRoute";
import SignupRoute from "routes/signupRoute";
import ShowMovieRoute from "routes/showMovieRoute";
import SingleMovieRoute from "routes/singleMovieRoute";
import BookNowRoute from "./booknowRoute";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.SIGNUP} element={<SignupRoute />} />
        <Route path={PATH.BOOKNOW} element={<BookNowRoute />} />
        <Route path={PATH.LOGIN} element={<LoginRoute />} />
        <Route path={PATH.HOME} element={<HomeRoute />} />
        <Route path={PATH.SHOWMOVIE} element={<ShowMovieRoute />}>
          <Route path=":movieId" element={<SingleMovieRoute />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
