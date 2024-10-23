import React, { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";


/**
 * Components and layouts...
 */
import {
  MaxWidthLayout,
  NavbarFooterIncluded,
  TopSection,
} from "layouts";
import {
  getSingleMovie,
} from "services/api";
import { truncateString } from "utils/truncateString";
import { BsStarFill } from "react-icons/bs";

const SingleMovie = () => {
  const [singleMovie, setSingleMovie] = useState();
  const { movieId } = useParams();
  useEffect(() => {
    (async function () {
      const result = await getSingleMovie(movieId);
      result && setSingleMovie(result);
    })();
  }, [movieId]);

  if (!singleMovie) return null;
  return (
    <NavbarFooterIncluded>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.8953956582633054) 0%, rgba(0,0,0,0.7469362745098039) 50%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
        className="min-h-[60vh] w-full flex items-center py-28 md:py-36 space-y-10"
      >
        <MaxWidthLayout>
          <div className="grid grid-cols-1 md:grid-cols-[28%_70%] gap-[2%]">
            {/* Poster Section */}
            <div className="flex items-center justify-center md:justify-start">
              <img
                src={singleMovie.poster}
                alt={singleMovie.title}
                className="rounded-md shadow-lg"
              />
            </div>

            {/* Content Section */}
            <div className="self-center space-y-5">
              <h1 className="text-center md:text-left custom-movie-title">
                {singleMovie.title}
              </h1>
              <p className="flex items-center space-x-2">
                <span className="text-2xl text-yellow-500">
                  <BsStarFill />
                </span>
                <span className="pt-1">{singleMovie.rating}</span>
              </p>
              <p className="leading-7">
                {truncateString(singleMovie.overview)}
              </p>
              {/* <button className="custom-green-btn">View Details</button> */}
            </div>
          </div>
          <div className="text-center mt-20">
              <Link to={`/booknow/${singleMovie.id}`}>
                <button className="custom-green-btn">Book Now</button>
              </Link>
            </div>
        </MaxWidthLayout>
      </div>

      <TopSection>
        <MaxWidthLayout>
          <div className="grid grid-cols-1 md:grid-cols-[76%_20%] gap-[4%]">
            <div className="space-y-8">

              <div className="space-y-2">
                <h2 className="custom-minor-title">Actors</h2>
                <div>
                  <div id="animation-carousel" className="relative w-full" data-carousel="static">
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                      {singleMovie.actors.map((actor, index) => (
                        <div
                          key={actor.id}
                          className={`duration-200 ease-linear ${index === 0 ? 'block' : 'hidden'}`}
                          data-carousel-item
                        >
                          <img
                            src={actor.image}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt={`${actor.firstname} ${actor.lastname}`}
                          />
                          
                        </div>

                      ))}
                    </div>
                    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                      </span>
                    </button>
                    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </MaxWidthLayout>
      </TopSection>

    </NavbarFooterIncluded>
  );
};

export default SingleMovie;
