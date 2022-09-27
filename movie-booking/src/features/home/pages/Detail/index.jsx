import clsx from "clsx";
import { fetchBoxOfficeAction } from "features/home/action";
import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion, Button, Col, Container, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";

function Detail() {
    const history = useHistory();
    const dispatch = useDispatch();

    const selectedMovie = useSelector((state) => state.home.selectedMovie);
    const cinemas = useSelector((state) => state.home.cinemas);

    const { loading } = useSelector((state) => state.home);
    const [key, setKey] = useState();

    const fetchBoxOffice = async (id) => {
        await dispatch(fetchBoxOfficeAction(id));
    };

    const descFormat = selectedMovie?.moTa.slice(3, selectedMovie?.moTa.length - 4);

    setTimeout(() => {
        if (!selectedMovie || !cinemas) history.push("/");
    }, 2000);

    useEffect(() => {
        setTimeout(() => {
            if (!selectedMovie || !cinemas) history.push("/");
        });

        clearTimeout();
    });

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
                <section className='position-relative' style={{ backgroundColor: "#f3f3f3" }}>
                    <div className={styles.bg}>
                        <div
                            style={{
                                backgroundImage: `url(${selectedMovie?.hinhAnh})`,
                            }}></div>
                    </div>
                    <div className={styles.main}>
                        <Container>
                            <div className={styles.wrapper}>
                                <Row>
                                    <Col xs={12} sm={6} md={4} className={styles.imgBox}>
                                        <div style={{ margin: "auto", width: "fit-content" }}>
                                            <img
                                                src={selectedMovie?.hinhAnh}
                                                alt=''
                                                className={clsx("fadeInLeft")}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className={clsx("fadeInRight", styles.text)}>
                                            <span>
                                                <Moment format='DD-MM-YYYY'>
                                                    {selectedMovie?.ngayKhoiChieu}
                                                </Moment>
                                            </span>
                                            <div
                                                className='d-flex align-items-center'
                                                style={{ marginTop: 1 }}>
                                                <span className={styles.tag}>2D</span>
                                                <p>120 minute</p>
                                            </div>
                                            <h2>{selectedMovie?.tenPhim}</h2>
                                            <p>{descFormat}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </div>

                    <Container className='my-4'>
                        <Row>
                            <Col>
                                <div className={clsx("fadeInRight", styles.textMb)}>
                                    <span>
                                        <Moment format='DD-MM-YYYY'>
                                            {selectedMovie?.ngayKhoiChieu}
                                        </Moment>
                                    </span>
                                    <div
                                        className='d-flex align-items-center'
                                        style={{ marginTop: "1rem" }}>
                                        <span className={styles.tag}>2D</span>
                                        <p>120 minute</p>
                                    </div>
                                    <h2>{selectedMovie?.tenPhim}</h2>
                                    <p>{descFormat}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <Container className='my-4'>
                        <Row>
                            <Col>
                                <div
                                    style={{
                                        maxWidth: "992px",
                                        width: "100%",
                                        margin: "auto",
                                        backgroundColor: "#fff",
                                        borderRadius: "10px",
                                        padding: "1rem",
                                    }}>
                                    <Tabs
                                        activeKey={key}
                                        onSelect={(key) => {
                                            setKey(key);
                                        }}
                                        style={{ marginBottom: "0.3rem" }}>
                                        {selectedMovie?.heThongRapChieu.map((theater) => (
                                            <Tab
                                                eventKey={theater.maHeThongRap}
                                                tabClassName={styles.tabLink}
                                                title={
                                                    <img
                                                        style={{
                                                            height: "4em",
                                                            width: "4em",
                                                            transition: ".2s all",
                                                        }}
                                                        src={theater.logo}
                                                        alt=''
                                                    />
                                                }
                                                key={theater.maHeThongRap}>
                                                <Row
                                                    className='flex-column'
                                                    style={{ margin: 0, width: "100%" }}>
                                                    <Accordion>
                                                        {theater.cumRapChieu.map((cinemas) => {
                                                            return (
                                                                <Accordion.Item
                                                                    eventKey={cinemas.maCumRap}
                                                                    className={styles.accordionItem}
                                                                    key={cinemas.maCumRap}>
                                                                    <Accordion.Header
                                                                        className={styles.boxBtn}>
                                                                        <div
                                                                            className='d-flex flex-column g-4 w-100'
                                                                            style={{ gap: "1rem" }}>
                                                                            <h2
                                                                                style={{
                                                                                    fontSize:
                                                                                        "1.2rem",
                                                                                    fontWeight:
                                                                                        "600",
                                                                                }}>
                                                                                {cinemas.tenCumRap}
                                                                            </h2>
                                                                            <span>
                                                                                {cinemas.diaChi}
                                                                            </span>
                                                                        </div>
                                                                    </Accordion.Header>
                                                                    <Accordion.Body>
                                                                        <Col
                                                                            className='w-100 g-4'
                                                                            key={
                                                                                selectedMovie?.maPhim
                                                                            }>
                                                                            <div
                                                                                className={
                                                                                    styles.content
                                                                                }>
                                                                                <div
                                                                                    className={
                                                                                        styles.imageBox
                                                                                    }>
                                                                                    <img
                                                                                        src={
                                                                                            selectedMovie?.hinhAnh
                                                                                        }
                                                                                        alt=''
                                                                                    />
                                                                                </div>
                                                                                <div
                                                                                    className={
                                                                                        styles.sideContent
                                                                                    }>
                                                                                    <div
                                                                                        className='d-flex align-items-center'
                                                                                        style={{
                                                                                            marginTop: 1,
                                                                                        }}>
                                                                                        <span
                                                                                            className={
                                                                                                styles.tag
                                                                                            }>
                                                                                            2D
                                                                                        </span>
                                                                                        <p>
                                                                                            120
                                                                                            minute
                                                                                        </p>
                                                                                    </div>
                                                                                    <h2
                                                                                        className={
                                                                                            styles.name
                                                                                        }>
                                                                                        {
                                                                                            selectedMovie?.tenPhim
                                                                                        }
                                                                                    </h2>
                                                                                    <div
                                                                                        className={
                                                                                            styles.schedule
                                                                                        }>
                                                                                        {cinemas?.lichChieuPhim.map(
                                                                                            (
                                                                                                schedule
                                                                                            ) => {
                                                                                                return (
                                                                                                    <Button
                                                                                                        className={
                                                                                                            styles.scheduleBtn
                                                                                                        }
                                                                                                        key={
                                                                                                            schedule.maLichChieu
                                                                                                        }
                                                                                                        onClick={async () => {
                                                                                                            await fetchBoxOffice(
                                                                                                                schedule.maLichChieu
                                                                                                            );
                                                                                                            history.push(
                                                                                                                "/booking/" +
                                                                                                                    selectedMovie?.biDanh
                                                                                                            );
                                                                                                        }}>
                                                                                                        <Moment format='DD-MM-YY ~ HH:mm'>
                                                                                                            {
                                                                                                                schedule.ngayChieuGioChieu
                                                                                                            }
                                                                                                        </Moment>
                                                                                                    </Button>
                                                                                                );
                                                                                            }
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            );
                                                        })}
                                                    </Accordion>
                                                </Row>
                                            </Tab>
                                        ))}
                                    </Tabs>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}
        </>
    );
}

export default Detail;
