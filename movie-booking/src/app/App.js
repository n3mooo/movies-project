import { Spinner } from "react-bootstrap";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./Guard";
import { useDispatch } from "react-redux";
import { fetchProfileAction } from "features/authentication/action";
// import P404 from "common/components/404";

const Header = lazy(() => import("common/components/Header"));
const Footer = lazy(() => import("common/components/Footer"));
const Home = lazy(() => import("features/home/pages/Home"));
const User = lazy(() => import("features/user/pages/User"));
const Detail = lazy(() => import("features/home/pages/Detail"));
const Booking = lazy(() => import("features/booking/pages/Booking"));
const Movie = lazy(() => import("features/movie/pages/Movie"));
const Theater = lazy(() => import("features/theater/pages/Theater"));
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
                    <AuthRoute path='/user' component={User} redirectPath='/' />
                    <Route path='/detail/:alias' component={Detail} redirectPath='/' />
                    <Route path='/book/:alias' component={Detail} redirectPath='/' />
                    <PrivateRoute
                        path='/booking/:alias'
                        component={Booking}
                        redirectPath='/signin'
                    />
                    <Route path='/movie' component={Movie} redirectPath='/signin' />
                    <Route path='/theater' component={Theater} redirectPath='/signin' />
                    <AuthRoute path='/signin' component={SignIn} redirectPath='/' />
                    <AuthRoute path='/signup' component={SignUp} redirectPath='/' />

                    {/* <Route path='*' component={P404}></Route> */}

                    <Redirect to='/' />
                </Switch>
                <Footer />
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
