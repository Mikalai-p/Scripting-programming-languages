import React from 'react';
import classNames from 'classnames';
import styles from './Badge.module.css';

interface BadgeProps {
  color: 'green' | 'red' | 'orange' | 'blue';
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ color, text }) => {
  const badgeClass = classNames(styles.badge, styles[color]);
  return <span className={badgeClass}>{text}</span>;
};

export default Badge;
