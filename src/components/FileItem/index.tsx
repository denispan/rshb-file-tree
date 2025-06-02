"use client";

import styles from './styles.module.css';
import React from 'react';
import Button from '../Button';
import cn from 'classnames';
import { Item } from '@/models/Item';
import { useAppStore } from '@/store/useAppStore';

interface FileItemProps {
  item: Item
}

const FileItem: React.FC<FileItemProps> = ({item}) => {
  const store = useAppStore();

  const toggleFavorite = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    store.toggleFavorite(item.id);
  }

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
      <Button className={cn(styles.favorite, item.isFavorite && styles.favoriteActive)} onClick={(e) => toggleFavorite(e)}>
        <img src="/icons/star.svg" alt="" width={16} height={16}/>
      </Button>
    </a>
  )
}

export default FileItem;
