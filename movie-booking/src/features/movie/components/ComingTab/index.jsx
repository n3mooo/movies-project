import { faPlayCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import styles from "./style.module.css";

function ComingTab(props) {
    const [modalShow, setModalShow] = useState({
        nameMovie: "",
        trailer: "",
        action: false,
    });

    const moviesComingSoon = props.movies.filter((item) => item.sapChieu === true);

    return (
        <div className={styles.main}>
            <Row style={{ margin: 0, width: "100%" }}>
                {moviesComingSoon?.map((item) => (
                    <Col xs={12} sm={6} md={4} lg={3} className='g-4' key={item.maPhim}>
                        <div className={clsx("text-center", styles.cardItem, styles.flag)}>
                            <div className={styles.thumbnail}>
                                <img
                                    src={item.hinhAnh}
                                    alt=''
                                    style={{
                                        width: 240,
                                        height: 350,
                                        objectFit: "cover",
                                    }}
                                />
                            </div>

                            <button
                                className={styles.btnTrailer}
                                onClick={() =>
                                    setModalShow({
                                        nameMovie: item.tenPhim,
                                        trailer: item.trailer,
                                        action: true,
                                    })
                                }>
                                <div className={styles.iconPlay}>
                                    <FontAwesomeIcon icon={faPlayCircle} />
                                </div>
                            </button>

                            <Modal
                                size='lg'
                                centered
                                show={modalShow.action}
                                backdrop='false'
                                onHide={() =>
                                    setModalShow({
                                        nameMovie: "",
                                        trailer: "",
                                        action: false,
                                    })
                                }
                                dialogClassName='modalCustom'>
                                {modalShow.trailer?.startsWith("https") && (
                                    <iframe
                                        width='100%'
                                        height='100%'
                                        src={modalShow.trailer}
                                        title='YouTube video player'
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen></iframe>
                                )}
                            </Modal>

                            <span className={styles.star}>
                                <span className='text-white'>{item.danhGia}</span>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            <div className={styles.text}>
                                <div className={styles.heading}>
                                    <h4>{item.tenPhim.substr(0, 18) + ""}</h4>
                                </div>

                                <div className={styles.description}>
                                    <p>{item.moTa.substr(3, 38) + "..."}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ComingTab;
