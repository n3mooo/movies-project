import styles from "./style.module.css";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { editProfileAction } from "features/user/action";
import authSlice from "features/authentication/authSlice";

const schema = yup.object().shape({
    taiKhoan: yup.string().required("This field is required"),
    matKhau: yup
        .string()
        .required("This field is required")
        .min(6, "Password must be at least 6 characters"),
    hoTen: yup
        .string()
        .required("This field is required")
        .matches(/^[A-Za-z ]+$/, "Name is not in the correct format"),
    email: yup
        .string()
        .required("This field is required")
        .email("Please enter the correct email format"),
    soDt: yup
        .string()
        .required("This field is required")
        .matches(/(0)+([0-9]{9})\b/g, "Phone number is not in the correct format"),
});

function User() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, error } = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.auth.profile);

    const [permission, setPermission] = useState(true);

    const formik = useFormik({
        initialValues: {
            taiKhoan: profile?.taiKhoan,
            matKhau: profile?.matKhau,
            hoTen: profile?.hoTen,
            email: profile?.email,
            soDt: profile?.soDT,
        },

        onSubmit: async (values) => {
            const newUser = {
                ...values,
                maNhom: profile?.maNhom,
                maLoaiNguoiDung: profile?.maLoaiNguoiDung,
            };
            console.log(newUser);
            await editProfile(newUser);
            setPermission(true);
        },

        validationSchema: schema,
        validateOnChange: false,
    });

    const editProfile = async (user) => {
        try {
            await dispatch(editProfileAction({ user, history }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(authSlice.actions.clear());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <Container>
                        <Form
                            className={clsx(
                                styles.form,
                                "d-flex flex-column align-items-center align-self-center position-relative w-100 m-auto bg-white"
                            )}
                            onSubmit={formik.handleSubmit}>
                            <div className='d-flex flex-row flex-nowrap justify-content-between align-items-center w-100 h-100 mb-4'>
                                <h2 className='w-100 m-0'>Infomation</h2>
                                {permission && (
                                    <Button
                                        className={styles.btnEdit}
                                        onClick={() => setPermission(false)}>
                                        Edit
                                    </Button>
                                )}
                            </div>

                            <div className='d-block w-100'>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className='d-block mt-4'>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                name='taiKhoan'
                                                type='text'
                                                className={clsx({
                                                    [styles.errorInput]:
                                                        formik.touched.taiKhoan &&
                                                        formik.errors.taiKhoan,
                                                    [styles.errorInput]: error,
                                                })}
                                                value={formik.values.taiKhoan}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={permission}
                                            />
                                            {formik.touched.taiKhoan && formik.errors.taiKhoan && (
                                                <Form.Text className={styles.notiError}>
                                                    {formik.errors.taiKhoan}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className='d-block mt-4'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                name='matKhau'
                                                type='password'
                                                className={clsx({
                                                    [styles.errorInput]:
                                                        formik.touched.matKhau &&
                                                        formik.errors.matKhau,

                                                    [styles.errorInput]: error,
                                                })}
                                                value={formik.values.matKhau}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={permission}
                                            />
                                            {formik.touched.matKhau && formik.errors.matKhau && (
                                                <Form.Text className={styles.notiError}>
                                                    {formik.errors.matKhau}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className='d-block mt-4'>
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control
                                        name='hoTen'
                                        type='text'
                                        className={clsx({
                                            [styles.errorInput]:
                                                formik.touched.hoTen && formik.errors.hoTen,
                                            [styles.errorInput]: error,
                                        })}
                                        value={formik.values.hoTen}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={permission}
                                    />
                                    {formik.touched.hoTen && formik.errors.hoTen && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.hoTen}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className='d-block mt-4'>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                name='email'
                                                type='text'
                                                placeholder='who@gmail.com'
                                                className={clsx({
                                                    [styles.errorInput]:
                                                        formik.touched.email && formik.errors.email,
                                                    [styles.errorInput]: error,
                                                })}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={permission}
                                            />
                                            {formik.touched.email && formik.errors.email && (
                                                <Form.Text className={styles.notiError}>
                                                    {formik.errors.email}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className='d-block mt-4'>
                                            <Form.Label>Phone number</Form.Label>
                                            <Form.Control
                                                name='soDt'
                                                type='text'
                                                placeholder='0999888777'
                                                className={clsx({
                                                    [styles.errorInput]:
                                                        formik.touched.soDt && formik.errors.soDt,
                                                    [styles.errorInput]: error,
                                                })}
                                                value={formik.values.soDt}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={permission}
                                            />
                                            {formik.touched.soDt && formik.errors.soDt && (
                                                <Form.Text className={styles.notiError}>
                                                    {formik.errors.soDt}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button
                                    className={clsx(
                                        "btn btnPrimary btnBlue",
                                        styles.btnFormControl,
                                        {
                                            [styles.visible]: permission,
                                        }
                                    )}
                                    type='submit'
                                    disabled={loading}>
                                    {loading ? <Spinner animation='border' /> : "Submit"}
                                </Button>
                                {error && (
                                    <Form.Text
                                        className={styles.notiError}
                                        style={{
                                            textAlign: "center",
                                            margin: ".25rem 0 32px",
                                        }}>
                                        {error.content}
                                    </Form.Text>
                                )}
                            </div>
                        </Form>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default User;
