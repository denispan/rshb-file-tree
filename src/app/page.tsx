"use client";

import Button from "@/components/Button";
import styles from "./page.module.css";

export default function Home() {
  return (
      <main className={styles.main}>
        <Button title="Создать папку" bgColor="yellow" onClick={() => {}} />
        <Button title="Загрузить файл" onClick={() => {}} />
      </main>
  );
}