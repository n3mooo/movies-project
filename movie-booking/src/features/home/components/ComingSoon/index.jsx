/* eslint-disable jsx-a11y/anchor-is-valid */
import { faArrowLeft, faArrowRight, faPlayCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import styles from "./style.module.css";

function ComingSoon(props) {
    const history = useHistory();
    const [modalShow, setModalShow] = useState({
        trailer: "",
        action: false,
    });

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={"slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")}
            aria-hidden='true'
            aria-disabled={currentSlide === 0 ? true : false}
            type='button'>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={
                "slick-next slick-arrow" +
                (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden='true'
            aria-disabled={currentSlide === slideCount - 1 ? true : false}
            type='button'>
            <FontAwesomeIcon icon={faArrowRight} />
        </button>
    );

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        nextArrow: <SlickArrowRight />,
        prevArrow: <SlickArrowLeft />,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const moviesComingSoon = props.movies?.filter((item) => item.sapChieu === true);

    return (
        <div className='sectionContent'>
            <div className='sectionInfo'>
                <div className='sectionInfoWrapper'>
                    <h2>Coming Soon</h2>
                    <button onClick={() => history.push("/movie")}>View all</button>
                </div>
            </div>
            <Row>
                <Slider {...settings} className={styles.slider}>
                    {moviesComingSoon?.map((item) => (
                        <div key={item.maPhim}>
                            <Col style={{ display: "block", padding: "0 12px" }}>
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
                                        size='lg'
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
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    ))}
                </Slider>
            </Row>
        </div>
    );
}

export default ComingSoon;
