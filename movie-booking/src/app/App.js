import { Spinner } from "react-bootstrap";
import Header from "common/components/Header";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./Guard";
import { useDispatch } from "react-redux";
import { fetchProfileAction } from "features/authentication/action";
import Theater from "features/theater/pages/Theater";
import Footer from "common/components/Footer";

const Home = lazy(() => import("features/home/pages/Home"));
const Detail = lazy(() => import("features/home/pages/Detail"));
const Booking = lazy(() => import("features/booking/pages/Booking"));
const Movie = lazy(() => import("features/movie/pages/Movie"));
const SignIn = lazy(() => import("features/authentication/pages/SignIn"));
const SignUp = lazy(() => import("features/authentication/pages/SignUp"));

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfileAction());
    });

    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            paddingTop: "20vh",
                            height: "100vh",
                        }}>
                        <Spinner animation='border' />
                    </div>
                }>
                <Header />
                <Switch>
                    <Route path='/' component={Home} exact></Route>
                    <PrivateRoute path='/detail/:alias' component={Detail} redirectPath='/signin' />
                    <PrivateRoute path='/book/:alias' component={Detail} redirectPath='/signin' />
                    <PrivateRoute
                        path='/booking/:alias'
                        component={Booking}
                        redirectPath='/signin'
                    />
                    <PrivateRoute path='/movie' component={Movie} redirectPath='/signin' />
                    <PrivateRoute path='/theater' component={Theater} redirectPath='/signin' />
                    <AuthRoute path='/signin' component={SignIn} redirectPath='/' />
                    <AuthRoute path='/signup' component={SignUp} redirectPath='/' />
                    <Redirect to='/' />
                </Switch>
                <Footer />
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
