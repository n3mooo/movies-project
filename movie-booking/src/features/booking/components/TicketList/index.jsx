import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { bookingTicketAction } from "features/booking/action";
import bookingSlice from "features/booking/bookingSlice";
import { fetchBoxOfficeAction } from "features/home/action";
import React, { useState } from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";

function TicketList(props) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const { loading, status } = useSelector((state) => state.booking);

    const countPrice = () => {
        let totalPrice = 0;
        props.ticketMovie?.map((item) => +(totalPrice += item.giaVe));

        return totalPrice;
    };

    const handleEvent = (item) => {
        dispatch(bookingSlice.actions.updateTicket(item));
    };

    const currentTicket = {
        maLichChieu: props.thongTinPhim?.maLichChieu,
        danhSachVe: [],
    };

    const bookingTicket = () => {
        dispatch(bookingTicketAction(currentTicket));
        dispatch(bookingSlice.actions.clearTicket([]));
        dispatch(fetchBoxOfficeAction(props.thongTinPhim?.maLichChieu));
    };

    const setStatus = () => {
        dispatch(bookingSlice.actions.setStatus());
    };

    return (
        <Col lg={4}>
            <Row className='mt-3 justify-content-center align-items-center m-auto'>
                <Col
                    xs={12}
                    className={clsx(
                        "d-flex flex-column justify-content-center justify-content-lg-end align-items-center align-items-sm-start mb-3 mb-sm-3 ms-lg-3",
                        styles.boxTicket
                    )}>
                    <span
                        className='text-white mb-3'
                        style={{
                            fontSize: ".65rem",
                            fontWeight: 600,
                            letterSpacing: 1,
                        }}>
                        SELECTED SEATS:
                    </span>
                    {props.ticketMovie?.map((item, index) => {
                        return (
                            <div
                                className='d-flex flex-row justify-content-between align-items-center w-100 mt-2'
                                key={index}>
                                <button
                                    key={item.stt}
                                    type='submit'
                                    className={clsx(styles.seatBox)}
                                    disabled={item.daDat}
                                    onClick={() => handleEvent(item)}>
                                    <div
                                        className={clsx(
                                            `text-white`,
                                            styles.seat,
                                            styles.unselected,
                                            {},
                                            {
                                                [styles.vip]: item.loaiGhe === "Vip",
                                            }
                                        )}
                                        style={{ fontSize: "0.7rem" }}>
                                        {item.stt}
                                    </div>
                                    <div
                                        className={clsx(
                                            styles.seat,
                                            styles.seattt,
                                            styles.unselected,
                                            {
                                                [styles.vip]: item.loaiGhe === "Vip",
                                            }
                                        )}
                                    />
                                </button>
                                <span
                                    className='text-white'
                                    style={{ fontSize: ".9rem", fontWeight: 200 }}>
                                    {item.giaVe}
                                    <button
                                        style={{
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                            border: "none",
                                        }}
                                        onClick={() => handleEvent(item)}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            style={{ color: "#4d4d4d", marginLeft: 5 }}
                                        />
                                    </button>
                                </span>
                            </div>
                        );
                    })}
                    <div
                        className='d-flex flex-row justify-content-between align-items-center w-100 mt-3'
                        style={{ borderTop: "1px solid #4d4d4d" }}>
                        <span
                            className='text-white'
                            style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                            Total:
                        </span>
                        <span className='text-white' style={{ fontSize: ".9rem", fontWeight: 200 }}>
                            {countPrice()}
                        </span>
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center w-100 mt-3'>
                        <Button
                            className='btn btnPrimary btnBlue w-100'
                            onClick={() => {
                                setShow(true);
                            }}
                            style={{
                                border: "none",
                                backgroundColor: "#000 !important",
                            }}>
                            Payment
                        </Button>
                    </div>
                    {status && (
                        <Modal show={status} onHide={() => setStatus()}>
                            <Modal.Body>
                                <p className='text-center'>Ticket booking successful</p>
                            </Modal.Body>
                        </Modal>
                    )}

                    <Modal show={show} onHide={() => setShow(false)} centered>
                        {+props.ticketMovie === 0 ? (
                            <>
                                <Modal.Body>
                                    <p className='text-center'>You haven't chosen a seat yet</p>
                                </Modal.Body>
                            </>
                        ) : (
                            <>
                                <Modal.Header>
                                    <Modal.Title style={{ fontSize: "1rem" }}>
                                        Your ticket
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Col xs={4}>
                                            <img
                                                src={props.thongTinPhim?.hinhAnh}
                                                alt=''
                                                style={{ borderRadius: "10px" }}
                                            />
                                        </Col>
                                        <Col className='d-flex flex-column justify-content-end'>
                                            <h2
                                                style={{
                                                    fontSize: "2rem",
                                                    fontWeight: 700,
                                                }}>
                                                {props.thongTinPhim?.tenPhim}
                                            </h2>
                                            <span
                                                style={{
                                                    fontSize: ".9rem",
                                                    color: "rgba(0,0,0,0.9)",
                                                }}>
                                                {props.thongTinPhim?.ngayChieu}
                                            </span>
                                            <span style={{ fontWeight: 700 }}>
                                                {props.thongTinPhim?.gioChieu}
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row
                                        className='my-3 py-3'
                                        style={{
                                            borderTop: "1px solid rgba(0,0,0,.2)",
                                            borderBottom: "1px solid rgba(0,0,0,.2)",
                                        }}>
                                        <Col xs={8}>
                                            <h3
                                                style={{
                                                    fontSize: "1.2rem",
                                                    fontWeight: 600,
                                                    color: "#000",
                                                }}>
                                                {props.thongTinPhim?.tenCumRap}
                                            </h3>
                                            <p style={{ fontSize: "0.95rem" }}>
                                                {props.thongTinPhim?.diaChi}
                                            </p>
                                        </Col>
                                        <Col className='d-flex flex-column'>
                                            <span style={{ fontSize: "0.95rem" }}>Theater No</span>
                                            <h1
                                                style={{
                                                    fontSize: "2.5rem",
                                                    fontWeight: 700,
                                                    color: "#000",
                                                }}>
                                                {props.thongTinPhim?.tenRap}
                                            </h1>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                                            <span
                                                className='text-black'
                                                style={{
                                                    fontSize: "1rem",
                                                    fontWeight: 500,
                                                }}>
                                                Seat:
                                            </span>
                                            <span
                                                className='text-black d-flex'
                                                style={{
                                                    fontSize: "1rem",
                                                    fontWeight: 200,
                                                }}>
                                                {props.ticketMovie?.map((item, index) => {
                                                    currentTicket.danhSachVe.push({
                                                        maGhe: item.maGhe,
                                                        giaVe: item.giaVe,
                                                    });

                                                    return (
                                                        <p className='ms-2' key={index}>
                                                            {item.tenGhe}
                                                        </p>
                                                    );
                                                })}
                                            </span>
                                        </div>
                                        <div className='d-flex flex-row justify-content-between align-items-center w-100 mt-2'>
                                            <span
                                                className='text-black'
                                                style={{
                                                    fontSize: "1rem",
                                                    fontWeight: 500,
                                                }}>
                                                Total price:
                                            </span>
                                            <span
                                                className='text-black'
                                                style={{
                                                    fontSize: "1rem",
                                                    fontWeight: 200,
                                                }}>
                                                {countPrice()}
                                            </span>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='d-flex flex-row justify-content-center align-items-center w-100'>
                                            <span
                                                className='text-black'
                                                style={{
                                                    fontSize: "1rem",
                                                    fontWeight: 500,
                                                }}></span>
                                        </div>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        className='btn btnPrimary btnBlue w-100'
                                        disabled={loading}
                                        onClick={() => {
                                            bookingTicket();
                                            setShow(false);
                                        }}>
                                        {loading ? <Spinner animation='border' /> : "Book"}
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal>
                </Col>
            </Row>
        </Col>
    );
}

export default TicketList;
