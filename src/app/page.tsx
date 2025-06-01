import styles from "./page.module.css";
import FileTree from "@/components/FileTree";

export default function Home() {
  return (
      <main className={styles.main}>
        <FileTree />
      </main>
  );
}