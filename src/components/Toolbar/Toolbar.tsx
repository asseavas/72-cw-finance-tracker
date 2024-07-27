import { NavLink } from 'react-router-dom';
import React from 'react';

interface Props {
  onCLick: VoidFunction;
}

const Toolbar: React.FC<Props> = ({ onCLick }) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <NavLink to="/" className="navbar-brand fs-3">
          Finance tracker
        </NavLink>
        <ul className="navbar-nav d-flex flex-row gap-4 flex-nowrap">
          <li className="nav-item">
            <NavLink className="nav-link" to="/categories">
              Categories
            </NavLink>
          </li>
          <li className="nav-item">
            <button className="nav-link" type="button" onClick={onCLick}>
              Add transaction
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
