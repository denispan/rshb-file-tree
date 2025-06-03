import React from 'react';
import styles from './styles.module.css';

const ErrorText: React.FC = () => {
  return (
    <div className={styles.errorText}>
      <div className={styles.errorContent}>
        <h2>Что-то пошло не так</h2>
        <p className={styles.errorMessage}>
          Попробуйте перезагрузить страницу
        </p>
      </div>
    </div>
  );
};

export default ErrorText;
