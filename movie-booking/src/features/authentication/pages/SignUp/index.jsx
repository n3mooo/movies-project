import clsx from "clsx";
import React, { useEffect } from "react";
import styles from "./style.module.css";
import bg from "assets/bg-cinemas.jpg";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { signUpAction } from "features/authentication/action";
import { useDispatch, useSelector } from "react-redux";
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

function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, error } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            email: "",
            soDt: "",
        },

        onSubmit: (values) => {
            const newUser = { ...values, maNhom: "GP05" };
            signUp(newUser);
        },

        validationSchema: schema,
        validateOnChange: false,
    });

    const signUp = async (user) => {
        try {
            await dispatch(signUpAction({ user, history }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(authSlice.actions.clear());
    }, []);

    return (
        <div className='position-relative w-100 h-100' style={{ zIndex: 1031 }}>
            <div className='d-flex justify-content-center bg-black'>
                <div className={clsx("flex-shrink-0 position-relative h-100", styles.sideBar)}>
                    <img src={bg} alt='background' className='img-fluid' />
                    <div
                        className='d-flex flex-column justify-content-end h-100 position-absolute top-0'
                        style={{ padding: 40, minHeight: "100vh", zIndex: 1032 }}>
                        <div className={styles.title}>Booking movie ticket online</div>
                    </div>
                </div>
                <div className={clsx("d-flex flex-column flex-grow-1", styles.main)}>
                    <div
                        className={clsx(
                            styles.content,
                            "d-flex flex-column justify-content-center align-items-center"
                        )}>
                        <Form
                            className={clsx(
                                styles.form,
                                "d-flex flex-column align-items-center align-self-center position-relative w-100 m-auto bg-white"
                            )}
                            onSubmit={formik.handleSubmit}>
                            <h2 className='w-100 m-0'>
                                Create your free account to use us service
                            </h2>
                            <div className='d-block w-100'>
                                <Form.Group className='d-block'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        name='taiKhoan'
                                        type='text'
                                        className={clsx({
                                            [styles.errorInput]:
                                                formik.touched.taiKhoan && formik.errors.taiKhoan,
                                            [styles.errorInput]: error,
                                        })}
                                        value={formik.values.taiKhoan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.taiKhoan && formik.errors.taiKhoan && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.taiKhoan}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className='d-block' style={{ marginTop: 16 }}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name='matKhau'
                                        type='password'
                                        className={clsx({
                                            [styles.errorInput]:
                                                formik.touched.matKhau && formik.errors.matKhau,

                                            [styles.errorInput]: error,
                                        })}
                                        value={formik.values.matKhau}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.matKhau && formik.errors.matKhau && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.matKhau}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className='d-block' style={{ marginTop: 16 }}>
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
                                    />
                                    {formik.touched.hoTen && formik.errors.hoTen && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.hoTen}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className='d-block' style={{ marginTop: 16 }}>
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
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.email}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className='d-block' style={{ marginTop: 16 }}>
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
                                    />
                                    {formik.touched.soDt && formik.errors.soDt && (
                                        <Form.Text className={styles.notiError}>
                                            {formik.errors.soDt}
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <Button
                                    className={clsx(
                                        "btn btnPrimary btnBlue",
                                        styles.btnFormControl
                                    )}
                                    type='submit'
                                    disabled={loading}>
                                    {loading ? <Spinner animation='border' /> : "Submit"}
                                </Button>
                                {error && (
                                    <Form.Text
                                        className={styles.notiError}
                                        style={{ textAlign: "center", margin: ".25rem 0 32px" }}>
                                        {error.content}
                                    </Form.Text>
                                )}
                                <Form.Text style={{ marginTop: "32px" }}>
                                    Already have an account?
                                    <button
                                        onClick={() => {
                                            history.push("/signin");
                                        }}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            boxShadow: "none",
                                            color: "rgba(0,0,0,0.6)",
                                            fontSize: 12,
                                            textDecoration: "underline",
                                        }}>
                                        Sign in
                                    </button>
                                </Form.Text>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
