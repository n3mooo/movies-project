import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./style.module.css";
import { FaBars } from "react-icons/fa";
import {
  AiOutlineClose,
  AiFillSetting,
  AiFillCalendar,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsFilm } from "react-icons/bs";
import { useSelector } from "react-redux";

function Navbar() {
  const [sidebar, setSideBar] = useState(false);
  const showSideBar = () => {
    setSideBar(!sidebar);
  };
  const userProfile = useSelector((state) => {
    return state.auth.profile;
  });
  const rederInfo = () => {
    if (!userProfile) {
      return (
        <>
          <NavLink activeClassName={style.active} to={"#"}>
            Hi, {userProfile.hoTen}
          </NavLink>
          <NavLink to={"./"}>Log Out</NavLink>
        </>
      );
    }
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
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={style.navText}>
                  <NavLink to={item.path} activeClassName={style.active} exact>
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
