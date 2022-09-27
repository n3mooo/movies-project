import clsx from "clsx";
import React from "react";
import styles from "./style.module.css";

function P404() {
    return (
        <div style={{ background: "#181828", overflow: "hidden", height: "100vh" }}>
            <a href='' target='_blank'>
                <header className={styles.topHeader} />
                <div>
                    <div className={styles.starsec} />
                    <div className={styles.starthird} />
                    <div className={styles.starfourth} />
                    <div className={styles.starfifth} />
                </div>
                <div className={styles.lampWrap}>
                    <div className={styles.lamp}>
                        <div className={styles.cable} />
                        <div className={styles.cover} />
                        <div className={styles.inCover}>
                            <div className={styles.bulb} />
                        </div>
                        <div className={styles.light} />
                    </div>
                </div>
            </a>
            <section className={styles.error}>
                <div className={styles.errorContent}>
                    <a href='https://codepen.io/uiswarup/full/yLzypyY' target='_blank'>
                        <div className={clsx(styles.errorMessage, styles.message)}>
                            <h1 className={styles.messageTitle}>Page Not Found</h1>
                            <p className={styles.messageText}>
                                We're sorry, the page you were looking for isn't found here. The
                                link you followed may either be broken or no longer exists. Please
                                try again, or take a look at our.
                            </p>
                        </div>
                    </a>
                    <div className={clsx(styles.errorNav, styles.eNav)}>
                        <a href target='_blank' className={styles.eNavLink} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default P404;
