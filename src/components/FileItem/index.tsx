"use client";

import styles from './styles.module.css';
import React from 'react';
import Button from '../Button';
import cn from 'classnames';
import { FileItemRaw } from '@/types';

interface FileItemProps {
  item: FileItemRaw
}

const FileItem: React.FC<FileItemProps> = ({item}) => {
  const [isFavorite, setIsFavorite] = React.useState(item.isFavorite);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={styles.item}>
      <p>{item.name}</p>
      <Button className={cn(styles.favorite, isFavorite && styles.favoriteActive)} onClick={toggleFavorite}>
        <img src="/icons/star.svg" alt="" width={24} height={24}/>
      </Button>
    </div>
  )
}

export default FileItem;
