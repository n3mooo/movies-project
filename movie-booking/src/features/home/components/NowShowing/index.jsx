/* eslint-disable jsx-a11y/anchor-is-valid */
import { faPlayCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { fetchMovieDetailAction } from "features/home/action";
import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";

function NowShowing(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [modalShow, setModalShow] = useState({
        trailer: "",
        action: false,
    });

    const moviesShowing = props.movies?.filter((item) => item.dangChieu === true);

    const fetchMovieDetail = async (id) => {
        await dispatch(fetchMovieDetailAction(id));
    };

    return (
        <div className='sectionContent'>
            <div className='sectionInfo'>
                <div className='sectionInfoWrapper'>
                    <h2>Now Showing</h2>
                    <button onClick={() => history.push("/movie")}>View all</button>
                </div>
            </div>
            <Row>
                {moviesShowing?.slice(0, 8).map((item) => (
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
                                        trailer: item.trailer,
                                        action: true,
                                    })
                                }>
                                <div className={styles.iconPlay}>
                                    <FontAwesomeIcon icon={faPlayCircle} />
                                </div>
                            </button>

                            <Modal
                                centered
                                show={modalShow.action}
                                backdrop='false'
                                onHide={() =>
                                    setModalShow({
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

                                    <div className={styles.actionCard}>
                                        <button
                                            className={clsx("btn btnPrimary btnOutLine")}
                                            onClick={async () => {
                                                await fetchMovieDetail(item.maPhim);
                                                history.push("/detail/" + item.biDanh);
                                            }}>
                                            Detail
                                        </button>
                                        <button
                                            className={clsx("btn btnPrimary btnBlue")}
                                            onClick={async () => {
                                                await fetchMovieDetail(item.maPhim);
                                                history.push("/book/" + item.biDanh);
                                            }}>
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default NowShowing;
