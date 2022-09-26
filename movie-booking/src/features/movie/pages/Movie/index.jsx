import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import bgMovies from "assets/bg-movies.jpg";
import ComingTab from "features/movie/components/ComingTab";
import ShowingTab from "features/movie/components/ShowingTab";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

function Movie() {
    const history = useHistory();
    const movies = useSelector((state) => state.home.movies);

    const [key, setKey] = useState("showing");

    if (!movies) {
        history.push("/");
    }

    return (
        <>
            <div className='h-100'>
                <div className='position-relative' style={{ backgroundColor: "#f3f3f3" }}>
                    <div className={styles.bg}>
                        <div
                            style={{
                                backgroundImage: `url(${bgMovies})`,
                            }}></div>
                    </div>
                </div>
                <div className='position-relative' style={{ height: "100vh" }}>
                    <div className={styles.main}>
                        <Container>
                            <div className={styles.content}>
                                <div className='fadeInDown'>
                                    <h1
                                        className={clsx("fadeInDown", styles.title)}
                                        style={{ animationDelay: "20ms" }}>
                                        All movies
                                    </h1>

                                    <span className={styles.article}>
                                        The greatest cinematic works of art of the era were created.
                                    </span>
                                </div>
                            </div>
                        </Container>

                        <div>
                            <div className='fadeInUp'>
                                <Tabs
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    style={{ marginBottom: "0.3rem" }}>
                                    <Tab eventKey='showing' title='Now showing'>
                                        <ShowingTab movies={movies} />
                                    </Tab>
                                    <Tab eventKey='coming-soon' title='Coming soon'>
                                        <ComingTab movies={movies} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Movie;
