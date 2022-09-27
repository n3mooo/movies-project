import React, { useState } from "react";
import styles from "./style.module.css";
import bgCinemas from "assets/bg-cinemas.jpg";
import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieScheduleAction } from "features/theater/action";
import clsx from "clsx";
import Cinemas from "features/theater/components/Cinemas";
import { useHistory } from "react-router-dom";

function Theater() {
    const dispatch = useDispatch();
    const history = useHistory();
    const cinemas = useSelector((state) => state.home.cinemas);
    const theater = useSelector((state) => state.theaters.theater);
    const { loading } = useSelector((state) => state.home);

    const [key, setKey] = useState();

    const fetchMovieSchedule = async (id) => {
        await dispatch(fetchMovieScheduleAction(id));
    };

    if (!cinemas && !theater) {
        history.push("/");
    }

    return (
        <>
            {loading ? (
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        paddingTop: "20vh",
                        height: "100vh",
                    }}>
                    <Spinner animation='border' />
                </div>
            ) : (
                <>
                    <div className='position-relative' style={{ backgroundColor: "#f3f3f3" }}>
                        <div className={styles.bg}>
                            <div
                                style={{
                                    backgroundImage: `url(${bgCinemas})`,
                                }}></div>
                        </div>
                    </div>
                    <div className='position-relative' style={{ height: "120vh" }}>
                        <div className={styles.main}>
                            <Container>
                                <div className={styles.content}>
                                    <div className='fadeInDown'>
                                        <h1
                                            className={clsx("fadeInDown", styles.title)}
                                            style={{ animationDelay: "20ms" }}>
                                            Theater
                                        </h1>

                                        <span className={styles.article}>
                                            Development cooperation units, responsible for bringing
                                            your seating position.
                                        </span>
                                    </div>
                                </div>
                            </Container>
                            <div>
                                <div className='fadeInUp'>
                                    <Tabs
                                        activeKey={key}
                                        onSelect={async (key) => {
                                            setKey(key);
                                            await fetchMovieSchedule(key);
                                        }}
                                        style={{ marginBottom: "0.3rem" }}>
                                        {cinemas?.map((item) => (
                                            <Tab
                                                eventKey={item.maHeThongRap}
                                                tabClassName={styles.tabLink}
                                                title={
                                                    <img
                                                        style={{
                                                            height: "4em",
                                                            width: "4em",
                                                            transition: ".2s all",
                                                        }}
                                                        src={item.logo}
                                                        alt=''
                                                    />
                                                }
                                                key={item.maHeThongRap}>
                                                <Cinemas theater={theater} />
                                            </Tab>
                                        ))}
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Theater;
