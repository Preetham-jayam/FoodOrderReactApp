import React from "react";
import meals from "../../assets/meals.jpg";
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>MealsShop</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={meals} alt="Food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
