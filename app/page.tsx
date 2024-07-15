import ImgBox from "./ImgBox";
import styles from "./page.module.css";
import UploadBox from "./UploadBox";

export default function Home() {
  return (
    <main className={styles.main}>
      <UploadBox />
      <ImgBox />
    </main>
  );
}
