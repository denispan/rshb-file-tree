import styles from './styles.module.css';
import React from 'react';

interface ErrorDisplayProps {
    errorMessage?: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => {
    return (
      <div className={styles.error}>
        <h3><span role="img" aria-label="error">❌</span> Произошла ошибка!</h3>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    )
  }

export default ErrorDisplay;
