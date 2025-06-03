"use client";

import styles from './styles.module.css';
import React from 'react';
import { Item } from '@/models/Item';
import { useAppStore } from '@/store/useAppStore';
import Favorite from '../Favorite';
import Icon from '../Icon';

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

  const renderIcon = () => {
    let iconName = '';
    if (item.type === 'dir') {
      iconName = 'folder';
    } else if (item.isImage()) {
      iconName = 'fileImage';
    } else {
      iconName = 'file';
    }

    return <Icon name={iconName} size="large" />
  }

  return (
    <a 
      href="#" 
      onClick={(e) => navigateToFolder(e)} 
      className={styles.item}
    >
      <div className={styles.title}>
        <div>
          {renderIcon()}
        </div>
        <p className={styles.name}>
          {item.name}
        </p>
      </div>
      <Favorite isFavorite={item.isFavorite} itemId={item.id} />
    </a>
  )
}

export default FileItem;
