import styles from './styles.module.css';
import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button';
import cn from 'classnames';
import { useAppStore } from '@/store/useAppStore';

interface FavoriteProps {
  isFavorite: boolean;
  itemId: number;
}

const Favorite: React.FC<FavoriteProps> = ({isFavorite, itemId}) => {
  const toggleFavorite = useAppStore(state => state.toggleFavorite);
  const [isBlocked, setIsBlocked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const onClickFavorite = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    if (isBlocked) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        setIsBlocked(false);
        timerRef.current = null;
      }, 300);
      
      return;
    }
    
    toggleFavorite(itemId);
    setIsBlocked(true);
    
    timerRef.current = setTimeout(() => {
      setIsBlocked(false);
      timerRef.current = null;
    }, 300);
  }

  return (
    <Button 
      className={cn(styles.favorite, isFavorite && styles.favoriteActive)} 
      onClick={onClickFavorite}
      icon="star"
      iconSize="medium"
    />
  )
}

export default Favorite;
