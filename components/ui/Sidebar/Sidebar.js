import React, { useEffect, useRef, useState } from "react";
import { setCookie } from "cookies-next";
import Link from "next/link";
import styles from "./Sidebar.module.css";
//Icons
import * as Md from "react-icons/md";
//
import useSideMenuData from "../../../hooks/useSideMenuData";
import { useRouter } from "next/router";
//
const Sidebar = (props) => {
  //
  const [sidebarOptions, setSidebarOptions] = useSideMenuData();
  const route = useRouter();
  //
  const [activeLink, setActiveLink] = useState({ activeObject: 0 });
  const [subActiveLink, setSubActiveLink] = useState({ activeObject: 0 });
  //
  const classToggler = (id) => {
    setActiveLink({ activeObject: id });
    localStorage.setItem("active", id);
  };
  //
  const toggleActiveStyles = (id) => {
    if (id === activeLink.activeObject) {
      return `${styles.navigation_list} ${styles.active}`;
    } else {
      return styles.navigation_list;
    }
  };
  //
  const toggleSubActiveStyles = (id) => {
    if (id === subActiveLink.activeObject) {
      return `${styles.sub_navigation_list} ${styles.active}`;
    } else {
      return styles.sub_navigation_list;
    }
  };
  //
  const subTogglerClass = (id) => {
    setSubActiveLink({ activeObject: id });
    localStorage.setItem("sub_active", id);
  };
  //
  useEffect(() => {
    const active = localStorage.getItem("active");
    const sub_active = localStorage.getItem("sub_active");
    //
    setActiveLink(
      active == undefined || active == null
        ? { activeObject: 0 }
        : { activeObject: active }
    );
    //
    setSubActiveLink(
      sub_active == undefined || sub_active == null
        ? { activeObject: 0 }
        : { activeObject: sub_active }
    );
  }, []);
  //
  const logoutFunction = () => {
    setCookie("token", "");
    setCookie("type", "");
    setCookie("user_id", "");
    setCookie("account_number", "");
    //
    route.push("/login");
  };
  //
  return (
    <>
      <div
        className={
          props.val ? `${styles.container} ${styles.active}` : styles.container
        }
      >
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <div className={styles.logo_div}>
              <img src="/chickoo_logo.png" className={styles.logo} />
            </div>
            <button
              onClick={() => {
                props.func();
              }}
              className={styles.close_btn}
            >
              <Md.MdClose />
            </button>
          </div>
          <div className={styles.body}>
            <ul className={styles.navigation}>
              {/*  */}
              {sidebarOptions.map((list) => {
                return (
                  <li
                    key={list.id}
                    id={list.id}
                    onClick={() => classToggler(list.id)}
                    className={toggleActiveStyles(list.id)}
                  >
                    {list.home ? (
                      <Link href={list.link}>
                        <a className={styles.sidebar_link}>
                          <span className={styles.icon}>{list.icon}</span>
                          <span className={styles.text}>{list.text}</span>
                        </a>
                      </Link>
                    ) : (
                      <button className={styles.sidebar_link}>
                        <span className={styles.icon}>{list.icon}</span>
                        <span className={styles.text}>{list.text}</span>
                        <span className={styles.arrow}>
                          <Md.MdKeyboardArrowRight />
                        </span>
                      </button>
                    )}
                    <ul className={styles.sub_navigation}>
                      {list.home
                        ? ""
                        : list.sub.map((subList, key) => {
                            return (
                              <li
                                id={subList.subtext}
                                onClick={() => subTogglerClass(subList.subtext)}
                                key={key}
                                className={toggleSubActiveStyles(
                                  subList.subtext
                                )}
                              >
                                <Link href={subList.link}>
                                  <a className={styles.sub_sidebar_link}>
                                    <span className={styles.icon}>
                                      <Md.MdCircle />
                                    </span>
                                    <span className={styles.text}>
                                      {subList.subtext}
                                    </span>
                                  </a>
                                </Link>
                              </li>
                            );
                          })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.footer}>
            <button className={styles.logout_btn} onClick={logoutFunction}>
              <span className={styles.icon}>
                <Md.MdLogout />
              </span>
              <span className={styles.text}>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
