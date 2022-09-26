import { faFacebook, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";

function Footer() {
    const history = useHistory();
    const cinemas = useSelector((state) => state.home.cinemas);

    return (
        <div className={styles.bg}>
            <Container>
                <div className={styles.wrapper}>
                    <Row className='py-3 g-3'>
                        <Col
                            xs={12}
                            sm={6}
                            md={3}
                            className='d-flex flex-column justify-content-between align-items-center my-3'>
                            <Button
                                onClick={() => {
                                    history.push("/");
                                }}
                                className={styles.logo}>
                                CINEGRAM
                            </Button>
                        </Col>
                        <Col
                            xs={12}
                            sm={6}
                            md={3}
                            className='d-flex flex-column justify-content-between align-items-center gap-2 my-3'>
                            <span className={styles.nameCol}>Link</span>
                            <ul>
                                <li>
                                    <Button className={styles.link}>Home</Button>
                                    <Button className={styles.link}>Movie</Button>
                                    <Button className={styles.link}>Theater</Button>
                                </li>
                            </ul>
                        </Col>
                        <Col
                            xs={12}
                            sm={6}
                            md={3}
                            className='d-flex flex-column align-items-center gap-2 my-3'>
                            <span className={styles.nameCol}>Contact</span>
                            <div className='d-flex flex-row flex-wrap justify-content-around w-100'>
                                <Row>
                                    <Col xs={4} className='g-3 text-center align-items-center'>
                                        <FontAwesomeIcon
                                            icon={faFacebook}
                                            className={styles.brandIcon}
                                        />
                                    </Col>
                                    <Col xs={4} className='g-3 text-center'>
                                        <FontAwesomeIcon
                                            icon={faGithub}
                                            className={styles.brandIcon}
                                        />
                                    </Col>
                                    <Col xs={4} className='g-3 text-center'>
                                        <FontAwesomeIcon
                                            icon={faYoutube}
                                            className={styles.brandIcon}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            sm={6}
                            md={3}
                            className='d-flex flex-column align-items-center gap-2 my-3'>
                            <span className={styles.nameCol}>Sponsor</span>
                            <div className='d-flex flex-row flex-wrap justify-content-around w-100'>
                                <Row>
                                    {cinemas?.map((item, index) => {
                                        return (
                                            <Col xs={4} className='g-3 text-center' key={index}>
                                                <img
                                                    src={item.logo}
                                                    alt=''
                                                    className={styles.sponsorImg}
                                                />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default Footer;
