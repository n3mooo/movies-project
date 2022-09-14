import { Spinner } from "react-bootstrap";
import Header from "common/components/Header";
import { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("features/booking/pages/Home"));
const SignIn = lazy(() => import("features/authentication/pages/SignIn"));
const SignUp = lazy(() => import("features/authentication/pages/SignUp"));

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Suspense
                fallback={
                    <div style={{ textAlign: "center" }}>
                        <Spinner animation='border' />
                    </div>
                }>
                <Switch>
                    <Route path='/' component={Home} exact></Route>
                    <Route path='/signin' component={SignIn} redirectPath='/' />
                    <Route path='/signup' component={SignUp} redirectPath='/' />

                    <Redirect to='/' />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
