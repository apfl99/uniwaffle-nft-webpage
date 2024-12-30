export interface ContactItemProps {
  label: string;
  value: string;
}
  
export interface FooterContactProps {
  items: ContactItemProps[];
  companyName: string;
  copyright: string;
}