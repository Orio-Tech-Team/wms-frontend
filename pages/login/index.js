import { Alert } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./Login.module.css";
import axiosFunction from "../../functions/axios";
import { setCookie } from "cookies-next";
//
const Index = () => {
  //
  const route = useRouter();
  //
  const [userId, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  //
  const loginHandler = async (e) => {
    e.preventDefault();
    if (userId === "" || password === "") {
      setIsEmpty(true);
      return null;
    }
    //
    const res = await axiosFunction({
      urlPath: "/login/",
      method: "POST",
      data: { user_id: userId, password },
    });

    console.log(res);
    if (res.status === 402) {
      return setIsIncorrect(true);
    }
    setCookie("token", res.data.token, { secure: false });
    setCookie("type", res.data.type, { secure: false });
    setCookie("user_id", res.data.user_id, { secure: false });
    setCookie("account_number", res.data.account_number, {
      secure: false,
    });
    if (res) return route.push("/dashboard/");
    //
  };
  //

  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.login_div}>
            <Link href={"#"}>
              <a className={styles.forget_password_link}>Forget password?</a>
            </Link>
            <div className={styles.logo_wrapper}>
              <img src="/chickoo_logo.png" alt="" />
            </div>
            <div className={styles.header_wrapper}>
              <h1>Login to your account</h1>
              <p>and let&apos;s get those orders moving!</p>
            </div>
            <form onSubmit={loginHandler}>
              <Alert hidden={!isEmpty} severity="error">
                Fields below cannot be empty!
              </Alert>
              <Alert hidden={!isIncorrect} severity="error">
                Incorrect Credentials
              </Alert>
              <div className={styles.input_div}>
                <label htmlFor="">Email Address</label>
                <input
                  value={userId}
                  onChange={(e) => {
                    setUserID(e.target.value);
                    setIsEmpty(false);
                    setIsIncorrect(false);
                  }}
                  type="text"
                  placeholder="Enter your User ID"
                />
              </div>
              <div className={styles.input_div}>
                <label htmlFor="">Password</label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsEmpty(false);
                    setIsIncorrect(false);
                  }}
                  type="password"
                  placeholder="*******"
                />
              </div>
              <button>Sign in</button>
              {/* Hello */}
              <p>
                Don&apos;t have an account?
                <Link href="#">
                  <a>Create an Account</a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
