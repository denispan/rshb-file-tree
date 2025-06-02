import React from 'react';
import styles from './styles.module.css';
import Button from '@/components/Button';

interface ErrorPageProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, resetError }) => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorContent}>
        <h2>Что-то пошло не так</h2>
        <p className={styles.errorMessage}>
          {error?.message || 'Произошла непредвиденная ошибка в приложении'}
        </p>
        {resetError && (
          <Button 
            className={styles.rebootButton}
            title="Перезагрузить страницу" 
            bgColor="deepGreen" 
            onClick={resetError}
          />
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
