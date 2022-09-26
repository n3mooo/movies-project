import clsx from "clsx";
import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

function CarouselBs(props) {
    return (
        <section className='position-relative'>
            <Carousel className={styles.carousel}>
                {props.banners?.map((item) => {
                    return (
                        <Carousel.Item key={item.maBanner} style={{ height: "100vh" }}>
                            <div
                                className={styles.carourelItem}
                                style={{
                                    backgroundImage: `url(${item.hinhAnh})`,
                                }}></div>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
            <div className={styles.main}>
                <Container>
                    <div className={styles.content}>
                        <h1 className={clsx("fadeInLeft", styles.title)}>
                            Booking movies ticket online website
                        </h1>

                        <span
                            className={clsx("fadeInLeft", styles.article)}
                            style={{ animationDelay: "200ms" }}>
                            The fastest, most convenient and easy to use movie ticket booking
                            system. Choose a seat and fully enjoy a work of cinematic art.
                        </span>
                        <Link
                            to='/'
                            className={clsx("btn btnPrimary btnBlue fadeInLeft", styles.btnStarted)}
                            style={{ animationDelay: "400ms" }}>
                            Get started
                        </Link>
                    </div>
                </Container>
                <Link className={styles.btnScroll} to='#section-2'></Link>
            </div>
        </section>
    );
}

export default CarouselBs;
