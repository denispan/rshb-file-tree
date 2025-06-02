import { useAppStore } from '@/store/useAppStore';
import styles from './styles.module.css';
import React from 'react';
import { Item } from '@/models/Item';
import Button from '../Button';
import cn from 'classnames';

interface FavoriteProps {
  item: Item;
}

const Favorite: React.FC<FavoriteProps> = ({item}) => {
  const store = useAppStore();
  
  const toggleFavorite = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    store.toggleFavorite(item.id);
  }

  return (
    <Button 
      className={cn(styles.favorite, item.isFavorite && styles.favoriteActive)} 
      onClick={(e) => toggleFavorite(e)}
    >
      <img src="/icons/star.svg" alt="" width={16} height={16}/>
    </Button>
  )
}

export default Favorite;
