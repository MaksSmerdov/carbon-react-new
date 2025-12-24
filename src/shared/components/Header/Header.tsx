import React from 'react';
import styles from './header.module.scss';
import Timer from './Timer';

interface HeaderProps {
  title: string;
  mode?: boolean;
  workMode?: string;
  notisStatus?: string;
}

const Header: React.FC<HeaderProps> = ({ title, mode, workMode, notisStatus }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        <span className={styles.header__titleSpan}>Карбон</span>
        {title}
        {mode && (
          <>
            <div className={styles.header__titleDiv}>
              Режим работы:
              <span className={styles.header__titleSubSpan}> {workMode || '-'}</span>
            </div>
            <div className={styles.header__titleDiv}>
              Статус НОТИС:
              <span className={styles.header__titleSubSpan}> {notisStatus || '-'}</span>
            </div>
          </>
        )}
      </div>
      <div className={styles.header__box}>
        <Timer />
      </div>
    </div>
  );
};

export default Header;
