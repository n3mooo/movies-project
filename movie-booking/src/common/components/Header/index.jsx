import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import authSlice from "features/authentication/authSlice";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import styles from "./style.module.css";

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.auth.profile);

    const goHome = () => {
        history.push("/");
    };

    const handleLogOut = (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        dispatch(authSlice.actions.logOut(null));

        goHome();
    };

    const renderUserInfo = () => {
        if (userProfile) {
            return (
                <>
                    <Nav.Link
                        href=''
                        className='text-black'
                        style={{
                            fontSize: 14,
                            fontWeight: 700,
                            lineHeight: "22px",
                            padding: "0.5rem",
                        }}>
                        Hi, {userProfile.hoTen}
                    </Nav.Link>
                    <Nav.Link
                        href=''
                        className={clsx("btn btnPrimary btnGray", styles.btnNav)}
                        onClick={handleLogOut}>
                        Log out
                    </Nav.Link>
                </>
            );
        }
        return (
            <>
                <NavLink to='/signin' className={clsx("btn btnPrimary btnGray", styles.btnNav)}>
                    Sign In
                </NavLink>
                <NavLink to='/signup' className={clsx("btn btnPrimary btnBlue", styles.btnNav)}>
                    Sign Up
                </NavLink>
            </>
        );
    };

    return (
        <Navbar collapseOnSelect expand='lg' variant='dark' fixed='top'>
            <Container className={styles.container}>
                <div className={styles.navBar}>
                    <div className='d-flex justify-content-between'>
                        <Navbar.Brand href='/' className={styles.navBrand}>
                            iMovie
                        </Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls='responsive-navbar-nav'
                            style={{ boxShadow: "none", border: "none", color: "#000" }}>
                            <FontAwesomeIcon icon={faBars} />
                        </Navbar.Toggle>
                    </div>

                    <Navbar.Collapse id='responsive-navbar-nav' className='position-relative'>
                        <Nav className={clsx("m-auto", styles.navLink)}>
                            <NavLink activeClassName={styles.active} to='/' exact>
                                Home
                            </NavLink>
                            <NavLink activeClassName={styles.active} to='/movie'>
                                Movie
                            </NavLink>
                            <NavLink activeClassName={styles.active} to='/theater'>
                                Theater
                            </NavLink>
                        </Nav>
                        <Nav className={styles.navAction}>{renderUserInfo()}</Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;
