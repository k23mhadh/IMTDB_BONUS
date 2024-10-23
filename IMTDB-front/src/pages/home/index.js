import { useEffect, useState } from "react";
import { NavbarFooterIncluded, MovieContainer } from "layouts";
import {
  getPopularMovies,
} from "services/api";

const Homepage = () => {
  const [popularMovies, setPopularMovies] = useState();

  useEffect(() => {
    (async function () {
      const {all_movies : populaMovieResults}  = await getPopularMovies();
      populaMovieResults && setPopularMovies(populaMovieResults);
      

        
    })();
  }, []);
  
  return (
    <>
      <NavbarFooterIncluded>
        <div className="pt-10">
          
          <MovieContainer
            sectionTitle="Popular Movies"
            moviesList={popularMovies}
            btnText="View All popular Movies"
            btnLink="/popular"
          />
          
        </div>
      </NavbarFooterIncluded>
    </>
  );
};

export default Homepage;
