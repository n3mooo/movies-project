import clsx from "clsx";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";

function TheaterBrand(props) {
    const history = useHistory();

    return (
        <div className='sectionContent'>
            <Row>
                {props.cinemas?.map((item) => (
                    <Col
                        xs={12}
                        sm={6}
                        md={4}
                        className={clsx("g-4 text-center", styles.brand)}
                        key={item.maHeThongRap}>
                        <div className={styles.brandItem}>
                            <button
                                className={styles.btnCard}
                                onClick={() => history.push("/theater")}>
                                <img src={item.logo} alt='' />
                                <span>{item.tenHeThongRap}</span>
                            </button>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default TheaterBrand;
