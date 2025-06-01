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
      <p>{item.name}</p>
      <Button className={cn(styles.favorite, item.isFavorite && styles.favoriteActive)} onClick={(e) => toggleFavorite(e)}>
        <img src="/icons/star.svg" alt="" width={24} height={24}/>
      </Button>
    </a>
  )
}

export default FileItem;
