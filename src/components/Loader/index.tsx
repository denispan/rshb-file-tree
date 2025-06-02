import styles from './styles.module.css';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      {Array(3).fill(0).map((_, index) => (
        <div className={styles.loaderItem} key={index}>
          <div className={styles.loaderItemLeftBlock}>
            <Skeleton circle width={24} height={24} />
            <Skeleton width={150} height={14} />
          </div>
          <Skeleton circle width={24} height={24} style={{ marginRight: 16 }} />
        </div>
      ))}
    </div>
  )
}

export default Loader;
