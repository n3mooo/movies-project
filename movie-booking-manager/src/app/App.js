import AddNew from "../features/Films/pages/Addnew";
import Edit from "../features/Films/pages/Edit";
import LogIn from "../features/LogIn/pages/LogIn";
import ShowTime from "../features/ShowTime/pages/ShowTime";
import Users from "../features/Users/pages/Users";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Films from "../features/Films/pages/Films";
import Navbar from "../common/components/SideBar/index";
import AddUser from "../features/Users/pages/AddUser";
import UpdateUser from "../features/Users/pages/UpdateUser";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} component={LogIn} exact />
        <Route path={"/login"} component={LogIn} />
        <Route path={"/films"} component={Films} exact />
        <Route path={"/films/addnew"} component={AddNew} />
        <Route path={"/films/edit/:id"} component={Edit} />
        <Route path={"/showtime/:id"} component={ShowTime} />
        <Route path={"/users"} component={Users} exact/>
        <Route path={"/users/adduser"} component={AddUser} />
        <Route path={"/users/update/:id"} component={UpdateUser} />
        {/* <Redirect from="/" to="/login" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
