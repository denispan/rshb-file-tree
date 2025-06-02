"use client";

import styles from './styles.module.css';
import React, { useEffect } from 'react';
import Button from '@/components/Button';
import FileItem from '@/components/FileItem';
import { useAppStore } from '@/store/useAppStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ErrorDisplay from '../ErrorDisplay';


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
  
  const renderSkeletons = () => {
    return (
      <div className={styles.loading}>
        {Array(3).fill(0).map((_, index) => (
          <div className={styles.skeletonItem} key={index}>
            <div className={styles.skeletonLeft}>
              <Skeleton circle width={24} height={24} />
              <Skeleton width={150} height={14} style={{ marginLeft: 6 }} />
            </div>
            <Skeleton circle width={24} height={24} style={{ marginRight: 16 }} />
          </div>
        ))}
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
          renderSkeletons()
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
