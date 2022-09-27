import { fetchCinemasAction, fetchMoviesAction } from "features/home/action";
import { fetchBannersAction } from "features/home/action";
import CarouselBs from "features/home/components/CarouselBs";
import ComingSoon from "features/home/components/ComingSoon";
import HotMovies from "features/home/components/HotMovies";
import NowShowing from "features/home/components/NowShowing";
import TheaterBrand from "features/home/components/TheaterBrand";
import { fetchMovieScheduleAction } from "features/theater/action";
import React, { useEffect, useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function Home() {
    const dispatch = useDispatch();

    const banners = useSelector((state) => state.home.banners);
    const movies = useSelector((state) => state.home.movies);
    const cinemas = useSelector((state) => state.home.cinemas);

    const myRef = useRef(null);
    const executeScroll = () => myRef?.current.scrollIntoView();

    const fetchBanner = async () => {
        await dispatch(fetchBannersAction());
    };

    const fetchMovies = async () => {
        await dispatch(fetchMoviesAction());
    };

    const fetchCinemas = async () => {
        const res = await dispatch(fetchCinemasAction());
        dispatch(fetchMovieScheduleAction(res.payload[0].maHeThongRap));
    };

    useEffect(() => {
        fetchBanner();
        fetchMovies();
        fetchCinemas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!movies || !banners || !cinemas) {
        return (
            <div
                style={{ width: "100%", textAlign: "center", paddingTop: "20vh", height: "100vh" }}>
                <Spinner animation='border' />
            </div>
        );
    }
    return (
        <div>
            <CarouselBs banners={banners} executeScroll={executeScroll} />
            <section className='section' ref={myRef}>
                <Container>
                    <div className='title'>
                        <span>LET EXPLORE</span>
                        <h2>The Movie</h2>
                        <p>
                            The movies that are showing and coming out below will definitely make
                            you feel excited.
                        </p>
                    </div>
                    <NowShowing movies={movies} />
                    <div className='separator'></div>
                    <ComingSoon movies={movies} />
                    <div className='separator'></div>
                    <HotMovies movies={movies} />
                </Container>
                <div style={{ backgroundColor: "#f3f3f3", width: "100%", display: "inline-block" }}>
                    <Container>
                        <div className='title' style={{ paddingTop: "40px" }}>
                            <span>Cooperation</span>
                            <h2>The Theater</h2>
                            <p>
                                Development cooperation units, responsible for bringing your seating
                                position.
                            </p>
                        </div>
                        <TheaterBrand cinemas={cinemas} />
                    </Container>
                </div>
            </section>
        </div>
    );
}

export default Home;
