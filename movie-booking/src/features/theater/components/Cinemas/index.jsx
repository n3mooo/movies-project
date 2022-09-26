import { fetchBoxOfficeAction } from "features/home/action";
import React from "react";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";

function Cinemas(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    let { lstCumRap } = props.theater;

    const fetchBoxOffice = async (id) => {
        await dispatch(fetchBoxOfficeAction(id));
    };

    return (
        <div className={styles.main}>
            <Row className='flex-column' style={{ margin: 0, width: "100%" }}>
                <Accordion>
                    {lstCumRap?.map((item) => {
                        return (
                            <Accordion.Item
                                eventKey={item.maCumRap}
                                className={styles.accordionItem}
                                key={item.maCumRap}>
                                <Accordion.Header className={styles.boxBtn}>
                                    <div
                                        className='d-flex flex-column g-4 w-100'
                                        style={{ gap: "1rem" }}>
                                        <h2
                                            style={{
                                                fontSize: "1.2rem",
                                                fontWeight: "600",
                                            }}>
                                            {item.tenCumRap}
                                        </h2>
                                        <span>{item.diaChi}</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row className='flex-column'>
                                        {item.danhSachPhim.map((movie) => {
                                            return (
                                                <Col className='w-100 g-4' key={movie.maPhim}>
                                                    <div className={styles.content}>
                                                        <div className={styles.imageBox}>
                                                            <img src={movie.hinhAnh} alt='' />
                                                        </div>
                                                        <div className={styles.sideContent}>
                                                            <div
                                                                className='d-flex align-items-center'
                                                                style={{ marginTop: 1 }}>
                                                                <span className={styles.tag}>
                                                                    2D
                                                                </span>
                                                                <p>120 minute</p>
                                                            </div>
                                                            <h2 className={styles.name}>
                                                                {movie.tenPhim}
                                                            </h2>
                                                            <div className={styles.schedule}>
                                                                {movie.lstLichChieuTheoPhim.map(
                                                                    (schedule) => {
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
                                                                                            movie.maPhim
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
                                            );
                                        })}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
            </Row>
        </div>
    );
}

export default Cinemas;
