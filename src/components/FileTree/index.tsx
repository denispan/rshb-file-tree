"use client";

import styles from './styles.module.css';
import React, { useEffect } from 'react';
import Button from '@/components/Button';
import FileItem from '@/components/FileItem';
import { useAppStore } from '@/store/useAppStore';


const FileTree: React.FC = () => {
  const store = useAppStore();

  useEffect(() => {
    store.fetchItems();
  }, []);

  console.log('store', store);

  const currentItems = store.currentFolder?.children;
  const showBackButton = Boolean(store.currentFolder?.parentId);

  const handleBackClick = () => {
    store.navigateUp();
  };

  const renderUpButton = () => {
    if (!showBackButton) {
      return null;
    }
    
    return (
        <Button 
          title="..."
          bgColor="default"
          onClick={handleBackClick}
        />
      );
  }

  return (
    <>
      <header className={styles.header}>
        <h3 className={styles.title}>{store.currentFolder?.name}</h3>
        <div className={styles.buttons}>
          <Button title='Создать папку' bgColor='yellow' onClick={() => {}} />
          <Button title='Загрузить файл' bgColor='lightGreen' onClick={() => {}} />
        </div>
      </header>
      
      <div>
      {renderUpButton()}
      {store.isLoading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : store.error ? (
          <div className={styles.error}>{store.error}</div>
        ) : (
        currentItems && currentItems.length > 0 ? (
          <ul>
            {currentItems.map((item) => (
              <li className={styles.listItem} key={item.id}>
                <FileItem item={item} />
              </li>
            ))}
          </ul>
        ) : <p>Папка пуста</p>
        )}
      </div>
    </>
  )
}

export default FileTree;
