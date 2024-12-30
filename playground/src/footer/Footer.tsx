import * as React from 'react';
import styles from './Footer.module.css';
import { ContactItem } from './ContactItem';
import { FooterContactProps } from './types';

export const Footer: React.FC = () => {
  const contactInfo: FooterContactProps = {
    companyName: '(주)엘티씨웨어',
    items: [
      { label: '전화', value: '02-2220-4016' },
      { label: '이메일', value: 'uniwaffle@uniwaffle.com' },
      { label: '주소', value: '서울특별시 성동구 왕십리로 222 한양대학교 IT/BT관 819호' }
    ],
    copyright: 'Copyright © LTCware, Inc. All rights reserved.'
  };

  return (
    <footer className={styles.footer}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/156eb7e17836fd2c79366af924b007a19bd346ccc9c66ee406e2a0da663e2920?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
        className={styles.headerImage}
        alt="Footer header"
      />
      <div className={styles.contentWrapper}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a915c9753666999befb9c76475b509d34c9011cdc9597afa1f9f1b4a03fb1d8d?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
          className={styles.logo}
          alt="Company logo"
        />
        <div className={styles.contactContainer}>
          <div className={styles.contactInfo}>
            <div className={styles.companyName}>{contactInfo.companyName}</div>
            {contactInfo.items.map((item, index) => (
              <ContactItem key={index} {...item} />
            ))}
          </div>
          <div className={styles.copyright}>{contactInfo.copyright}</div>
        </div>
      </div>
    </footer>
  );
};