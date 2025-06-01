"use client";

import styles from './styles.module.css';
import React from 'react';
import Button from '../Button';

interface FileTreeProps {
  title?: string;
}

const FileTree: React.FC<FileTreeProps> = ({title}) => {
  return (
    <>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.buttons}>
          <Button title='Создать папку' bgColor='yellow' onClick={() => {}} />
          <Button title='Загрузить файл' bgColor='lightGreen' onClick={() => {}} />
        </div>
      </header>
      
      <div className={styles.content}>
        <p>Папка пуста</p>
      </div>
    </>
  )
}

export default FileTree;
