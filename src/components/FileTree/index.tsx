"use client";

import styles from './styles.module.css';
import React from 'react';
import Button from '../Button';
import { filesMocks } from '@/app/mocks/filesMocks';
import FileItem from '../FileItem';

interface FileTreeProps {
  title?: string;
}

const FileTree: React.FC<FileTreeProps> = ({title}) => {
  const files = filesMocks;

  return (
    <>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.buttons}>
          <Button title='Создать папку' bgColor='yellow' onClick={() => {}} />
          <Button title='Загрузить файл' bgColor='lightGreen' onClick={() => {}} />
        </div>
      </header>
      
      <div>
        {files?.length > 0 ? (
          <ul>
            {files.map((item) => (
              <li className={styles.listItem} key={item.id}>
                <FileItem item={item} />
              </li>
            ))}
          </ul>
        ) : <p>Папка пуста</p>}
      </div>
    </>
  )
}

export default FileTree;
