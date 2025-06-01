"use client";

import styles from './styles.module.css';
import React from 'react';
import Button from '../Button';
import cn from 'classnames';

interface FileItemProps {
  item: {
    id: number;
    type: 'dir' | 'file';
    parentId: number | null;
    name: string;
    isFavorite: boolean;
  }
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
