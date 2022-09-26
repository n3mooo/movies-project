import { Button, Form, Spinner } from "react-bootstrap";
import styles from "./style.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import bg from "assets/bg-cinemas.jpg";
import { signInAction } from "features/authentication/action";
import authSlice from "features/authentication/authSlice";
import { useEffect } from "react";

const schema = yup.object().shape({
    taiKhoan: yup.string().required("This field is required"),
    matKhau: yup.string().required("This field is required"),
});

function SignIn() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, error } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },

        onSubmit: (values) => {
            const user = { ...values };
            signIn(user);
        },

        validationSchema: schema,
        validateOnChange: false,
    });

    const signIn = async (user) => {
        try {
            await dispatch(signInAction({ user, history }));
        } catch (error) {
            return error;
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
                            <h2 className='w-100 m-0'>Log in</h2>
                            <div className='d-block w-100'>
                                <Form.Group className='d-block'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        name='taiKhoan'
                                        type='text'
                                        className={clsx(
                                            {
                                                [styles.errorInput]:
                                                    formik.touched.taiKhoan &&
                                                    formik.errors.taiKhoan,
                                            },
                                            {
                                                [styles.errorInput]: error,
                                            }
                                        )}
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
                                        className={clsx(
                                            {
                                                [styles.errorInput]:
                                                    formik.touched.matKhau && formik.errors.matKhau,
                                            },
                                            {
                                                [styles.errorInput]: error,
                                            }
                                        )}
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
                                    Don't have an account?
                                    <button
                                        onClick={() => {
                                            history.push("/signup");
                                        }}
                                        style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                            boxShadow: "none",
                                            color: "rgba(0,0,0,0.6)",
                                            fontSize: 12,
                                            textDecoration: "underline",
                                        }}>
                                        Sign up
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

export default SignIn;
