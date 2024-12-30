import * as React from 'react';
import styles from './Footer.module.css';
import { ContactItemProps } from './types';

export const ContactItem: React.FC<ContactItemProps> = ({ label, value }) => (
  <div className={styles.contactItem}>
    <span className={styles.contactLabel}>{label}</span>
    <span className={styles.contactValue}>{value}</span>
  </div>
);