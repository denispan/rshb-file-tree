"use client";

import styles from './styles.module.css';
import React, { useEffect } from 'react';
import Button from '@/components/Button';
import FileItem from '@/components/FileItem';
import { useAppStore } from '@/store/useAppStore';
import ErrorDisplay from '../ErrorDisplay';
import Loader from '../Loader';
import Icon from '../Icon';
import { ButtonProps } from '../Button';

export interface HeaderButton extends ButtonProps {
  key: string;
}

interface FileTreeProps {
  buttons?: HeaderButton[];
}

const FileTree: React.FC<FileTreeProps> = ({ buttons }) => {
  const store = useAppStore();

  useEffect(() => {
    store.fetchItems();
  }, []);

  const currentItems = store.currentFolder?.children;
  const showUpButton = Boolean(store.currentFolder?.parentId);

  const handleUpClick = () => {
    store.navigateUp();
  };

  const renderHeaderButtons = () => {
    if (!buttons || buttons.length === 0) {
      return null;
    }

    return (
      <div className={styles.buttons}>
        {buttons.map((button) => (
          <Button 
            key={button.key}
            title={button.title}
            bgColor={button.bgColor}
            onClick={button.onClick}
            icon={button.icon}
            iconSize={button.iconSize}
          />
        ))}
      </div>
    );
  }

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

  const renderList = () => {
    if (!currentItems || currentItems.length === 0) {
      return <p className={styles.textEmpty}>Папка пуста</p>;
    }

    return (
      <ul className={styles.list}>
        {currentItems.map((item) => (
          <li className={styles.listItem} key={item.id}>
            <FileItem item={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
        <Icon name="files" size="large" />
          <h3>{store.currentFolder?.name}</h3>
        </div>
        {renderHeaderButtons()}
      </header>
      {renderUpButton()}
      <div className={styles.listContainer}>
        {store.isLoading ? (
          <Loader />
        ) : store.error ? (
          <ErrorDisplay errorMessage={store.error} />
        ) : (
          renderList()
        )}
      </div>
    </div>
  )
}

export default FileTree;
