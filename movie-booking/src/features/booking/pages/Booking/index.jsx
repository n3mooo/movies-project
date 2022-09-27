import clsx from "clsx";
import SeatList from "features/booking/components/SeatList";
import TicketList from "features/booking/components/TicketList";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";

function Booking() {
    const history = useHistory();

    const ticketMovie = useSelector((state) => state.booking.ticketMovie);
    const { thongTinPhim, danhSachGhe } = useSelector((state) => state.home.boxOffice);

    useEffect(() => {
        setTimeout(() => {
            if (!thongTinPhim || !danhSachGhe) history.push("/");
        });

        clearTimeout();
    });

    return (
        <div className={styles.body}>
            <div className={styles.banner}>
                <div
                    className={styles.bg}
                    style={{
                        backgroundImage: `url(${thongTinPhim?.hinhAnh})`,
                    }}></div>

                <div className={styles.main}>
                    <Container>
                        <Row className={styles.wrapper}>
                            <Col sm={4} lg={3} className={styles.boxImg}>
                                <img src={thongTinPhim?.hinhAnh} alt='' />
                            </Col>
                            <Col className={styles.textInfo}>
                                <div className='d-flex flex-row align-items-center gap-2'>
                                    <span className={styles.tag}>2D</span>
                                    <p className={styles.minute}>120 minute</p>
                                </div>
                                <h2>{thongTinPhim?.tenPhim}</h2>
                                <div className={styles.content}>
                                    <div className={styles.info}>
                                        <span>Theater</span>
                                        <h3>{thongTinPhim?.tenCumRap}</h3>
                                        <p>{thongTinPhim?.diaChi}</p>
                                    </div>
                                    <div className={styles.timeInfo}>
                                        <div className={styles.date}>
                                            <span>Date</span>
                                            <p style={{ lineBreak: "anywhere" }}>
                                                {thongTinPhim?.ngayChieu}
                                            </p>
                                        </div>

                                        <div className={styles.time}>
                                            <span>Time</span>
                                            <p>{thongTinPhim?.gioChieu}</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Container>
                <Row>
                    <Col lg={8}>
                        <Row className='mt-3 justify-content-center align-items-center m-auto'>
                            <Col
                                xs={12}
                                sm={4}
                                className='d-flex flex-column justify-content-center align-items-center align-items-sm-start mb-3 mb-sm-3'>
                                <span style={{ fontSize: ".75rem", color: "#8d8d8f" }}>
                                    MOVIE THEATER NO:
                                </span>
                                <p style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 700 }}>
                                    {thongTinPhim?.tenRap}
                                </p>
                            </Col>
                            <Col xs={2}>
                                <div className={styles.note}>
                                    <div
                                        className={clsx(styles.seatBox)}
                                        style={{ maxWidth: "38px" }}>
                                        <div className={styles.seat}></div>
                                        <div className={clsx(styles.seat, styles.seattt)} />
                                    </div>
                                    <span>Regular</span>
                                </div>
                            </Col>

                            <Col xs={2}>
                                <div className={styles.note}>
                                    <div
                                        className={clsx(styles.seatBox)}
                                        style={{ maxWidth: "38px" }}>
                                        <div className={clsx(styles.seat, styles.vip)}></div>
                                        <div
                                            className={clsx(styles.seat, styles.seattt, styles.vip)}
                                        />
                                    </div>
                                    <span>Vip</span>
                                </div>
                            </Col>

                            <Col xs={2}>
                                <div className={styles.note}>
                                    <div
                                        className={clsx(styles.seatBox)}
                                        style={{ maxWidth: "38px" }}>
                                        <div className={clsx(styles.seat, styles.selected)}></div>
                                        <div
                                            className={clsx(
                                                styles.seat,
                                                styles.seattt,
                                                styles.selected
                                            )}
                                        />
                                    </div>
                                    <span>Selected</span>
                                </div>
                            </Col>
                            <Col xs={2}>
                                <div className={styles.note}>
                                    <div
                                        className={clsx(styles.seatBox)}
                                        style={{ maxWidth: "38px" }}>
                                        <div className={clsx(styles.seat, styles.booked)}></div>
                                        <div
                                            className={clsx(
                                                styles.seat,
                                                styles.seattt,
                                                styles.booked
                                            )}
                                        />
                                    </div>
                                    <span>Booked</span>
                                </div>
                            </Col>
                        </Row>
                        <div className={styles.screen}>
                            <span
                                style={{
                                    color: "#fff",
                                    marginBottom: "5px",
                                    letterSpacing: "5px",
                                    textTransform: "uppercase",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                }}>
                                Screen
                            </span>
                            <div className={styles.monitor} />
                            <div className={styles.light} />
                        </div>

                        {/* Seat List */}
                        <SeatList danhSachGhe={danhSachGhe} ticketMovie={ticketMovie} />
                    </Col>

                    {/* Ticket List */}
                    <TicketList ticketMovie={ticketMovie} thongTinPhim={thongTinPhim} />
                </Row>
            </Container>
        </div>
    );
}

export default Booking;
