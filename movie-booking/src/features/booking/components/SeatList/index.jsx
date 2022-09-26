import clsx from "clsx";
import bookingSlice from "features/booking/bookingSlice";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styles from "./style.module.css";

function SeatList(props) {
    const dispatch = useDispatch();

    const handleEvent = (item) => {
        dispatch(bookingSlice.actions.updateTicket(item));
    };

    return (
        <Row>
            <Col className='g-3'>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}>
                    {props.danhSachGhe?.map((item) => {
                        const foundSeat = props.ticketMovie?.findIndex(
                            (x) => x.maGhe === item.maGhe
                        );

                        return (
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
                                            [styles.selected]: foundSeat !== -1,
                                            [styles.booked]: item.daDat === true,
                                        }
                                    )}
                                    style={{ fontSize: "0.7rem" }}>
                                    {item.stt}
                                </div>
                                <div
                                    className={clsx(styles.seat, styles.seattt, styles.unselected, {
                                        [styles.vip]: item.loaiGhe === "Vip",
                                        [styles.selected]: foundSeat !== -1,
                                        [styles.booked]: item.daDat === true,
                                    })}
                                />
                            </button>
                        );
                    })}
                </div>
            </Col>
        </Row>
    );
}

export default SeatList;
