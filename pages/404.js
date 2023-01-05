import Link from "next/link";
import styles from "./styles.module.css";
const NotFound = () => {
  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={styles.img_wrapper}>
            <img src="/404.png" alt="" />
          </div>
          <div>
            <h1>Oops!</h1>
            <p>We can&quot;t seem to find the page you are looking for</p>
          </div>
          <div className={styles.footer}>
            <Link href={"/dashboard/"}>
              <a>Dashboard</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
//
export default NotFound;
