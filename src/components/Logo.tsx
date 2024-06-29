import { FC } from 'react';
import logo from '@/assets/icon.jpeg';

const Logo: FC = () => {
  return (
    <>
      <img src={logo} style={{ width: '100%', objectFit: 'contain' }} />
    </>
  );
};

export default Logo;
