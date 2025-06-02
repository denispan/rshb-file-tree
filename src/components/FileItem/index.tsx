"use client";

import styles from './styles.module.css';
import React from 'react';
import { Item } from '@/models/Item';
import { useAppStore } from '@/store/useAppStore';
import Favorite from '../Favorite';

interface FileItemProps {
  item: Item
}

const FileItem: React.FC<FileItemProps> = ({item}) => {
  const store = useAppStore();

  const navigateToFolder = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (item.type === 'dir') {
      store.navigateToFolder(item);
    }
  }

  return (
    <a href="#" onClick={(e) => navigateToFolder(e)} className={styles.item}>
      <div className={styles.title}>
        {item.type === 'dir' ? (
          <img src="/icons/folder.svg" width={24} height={24} alt="folder" />
        ) : item.isImage() ? (
          <img src="/icons/file-image.svg" width={24} height={24} alt="image" />
        ) : (
          <img src="/icons/file.svg" width={24} height={24} alt="file" />
        )}
        <p className={styles.name}>{item.name}</p>
      </div>
      <Favorite item={item} />
    </a>
  )
}

export default FileItem;
