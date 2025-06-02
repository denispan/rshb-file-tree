"use client";

import styles from './styles.module.css';
import React, { useEffect } from 'react';
import Button from '@/components/Button';
import FileItem from '@/components/FileItem';
import { useAppStore } from '@/store/useAppStore';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';


const FileTree: React.FC = () => {
  const store = useAppStore();

  useEffect(() => {
    store.fetchItems();
  }, []);

  const currentItems = store.currentFolder?.children;
  const showUpButton = Boolean(store.currentFolder?.parentId);

  const handleUpClick = () => {
    store.navigateUp();
  };

  const renderUpButton = () => {
    if (!showUpButton) {
      return null;
    }
    
    return (
      <div className={styles.upButtonContainer}>
        <Button 
          title="..."
          bgColor="default"
          onClick={handleUpClick}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <img src="/icons/files.svg" alt="current folder title" width={24} height={24} />
          <h3>{store.currentFolder?.name}</h3>
        </div>
      
        <div className={styles.buttons}>
          <Button title='Создать папку' bgColor='yellow' onClick={() => {}}>
            <img src="/icons/folder-plus.svg" alt="icon" width={12} height={12} />
          </Button>
          <Button title='Загрузить файл' bgColor='lightGreen' onClick={() => {}}>
            <img src="/icons/upload.svg" alt="icon" width={12} height={12} />
          </Button>
        </div>
      </header>
      
      {renderUpButton()}
      
      <div className={styles.listContainer}>
        {store.isLoading ? (
          <Loader />
        ) : store.error ? (
          <ErrorDisplay errorMessage={store.error} />
        ) : (
          currentItems && currentItems.length > 0 ? (
            <ul className={styles.list}>
              {currentItems.map((item) => (
                <li className={styles.listItem} key={item.id}>
                  <FileItem item={item} />
                </li>
              ))}
            </ul>
          ) : <p className={styles.textEmpty}>Папка пуста</p>
        )}
      </div>
    </div>
  )
}

export default FileTree;
