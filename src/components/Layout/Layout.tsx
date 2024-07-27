import React, { PropsWithChildren } from 'react';
import Toolbar from '../Toolbar/Toolbar';

interface Props extends PropsWithChildren {
  onCLick: VoidFunction;
}

const Layout: React.FC<Props> = ({ children, onCLick }) => {
  return (
    <>
      <header>
        <Toolbar onCLick={onCLick} />
      </header>
      <main className="container pt-3">{children}</main>
    </>
  );
};

export default Layout;
