import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./style.module.css";
import { FaBars } from "react-icons/fa";
import {
  AiOutlineClose,
  AiFillCalendar,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsFilm } from "react-icons/bs";
import { useSelector } from "react-redux";

function Navbar() {
  const [sidebar, setSideBar] = useState(false);
  const logInData = useSelector((state) => {
    return state.auth.profile;
  });
  const showSideBar = () => {
    setSideBar(!sidebar);
  };

  const SideBarData = [
    {
      title: "List Film",
      path: "/films",
      icon: <BsFilm />,
    },
    {
      title: "Add new film",
      path: "/films/addnew",
      icon: <BsFilm />,
    },

    {
      title: "User List",
      path: "/users",
      icon: <AiOutlineUserAdd />,
    },
    {
      title: "Add User",
      path: "/users/adduser",
      icon: <AiOutlineUserAdd />,
    },

    {
      title: "Show Time",
      path: "/showtime",
      icon: <AiFillCalendar />,
    },
  ];

  return (
    <div>
      <div className={style.navbar}>
        <Link to={"#"} className={style.menubar}>
          <FaBars onClick={showSideBar} />
        </Link>
      </div>
      <div
        className={
          sidebar ? `${style.navMenu} ${style.active}` : `${style.navMenu}`
        }
      >
        <ul className={style.navMenuItem}>
          <div className={style.navBarToggle}>
            <Link to={"#"} className={style.menubar} onClick={showSideBar}>
              <AiOutlineClose />
            </Link>
            <li className={style.navText}>
              <NavLink to={SideBarData[0].path} activeClassName={style.active} exact>
                {SideBarData[0].icon}
                <span>{SideBarData[0].title}</span>
              </NavLink>
            </li>
            <li className={style.navText}>
              <NavLink to={SideBarData[1].path} activeClassName={style.active} exact>
                {SideBarData[1].icon}
                <span>{SideBarData[1].title}</span>
              </NavLink>
            </li>
            <li className={style.navText}>
              <NavLink to={SideBarData[2].path} activeClassName={style.active} exact>
                {SideBarData[2].icon}
                <span>{SideBarData[2].title}</span>
              </NavLink>
            </li>
            <li className={style.navText}>
              <NavLink to={SideBarData[3].path} activeClassName={style.active} exact>
                {SideBarData[3].icon}
                <span>{SideBarData[3].title}</span>
              </NavLink>
            </li>
            <li className={style.navText}>
              <NavLink to={SideBarData[4].path} activeClassName={style.active} exact>
                {SideBarData[4].icon}
                <span>{SideBarData[4].title}</span>
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
