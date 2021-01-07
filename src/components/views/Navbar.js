import mainLogo from '../../assets/KafKareTsmall.png';
import React from 'react';
function NavBar() {
  return (
    <nav className="logo-container">
      <img src={mainLogo} width="168" height="65" />
    </nav>
  );
}
export default NavBar;
