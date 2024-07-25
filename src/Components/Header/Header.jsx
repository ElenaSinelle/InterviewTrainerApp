import "./Header.scss";
import { CloseOutlined,
  MenuOutlined,
  SettingOutlined,
  LogoutOutlined
 } from '@ant-design/icons';
import img_logo from "../../assets/images/logo_it.png";
import img_profile from "../../assets/images/img_profile_big.svg";
import img_profileLittle from "../../assets/images/img_profile.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
const [isOpen, setIsOpen] = useState(false);
const [burgerActive, setBurgerActive] = useState(false);

  return (
    <header className="header">
        <div className="header__body">
      <NavLink className="header__logo" to="/home"><img src={img_logo} alt="Перейти на главную страницу" /></NavLink>
        <div 
        className="header__links"
        >
          <NavLink  to="/home">Выбор градации</NavLink>
          <NavLink  to="/instructions">Инструкции</NavLink>
            <div
            onClick={() => setIsOpen(!isOpen)}>
            <img 
            className="profile__img"
            src={img_profile} alt="Профиль" />
            </div>
        </div>
        <button 
        onClick={() => setBurgerActive(!burgerActive)}
        className={`burger__img ${!burgerActive ? "menu" : "close"}`}>

        </button>
        </div>
      <div 
      className={` ${isOpen ? "overlay" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
      >
            <div className={`header__popup ${isOpen ? "active" : ""}`}>
            <div>UserName</div>
            <div className="popup__raitinginfo">
            <div>Градация 1</div>
            <div className="popup__percent">50%</div>
            <progress className="popup__progress" max="100" value="50"></progress>
            </div>
            <NavLink className="popup__link" to="/profile">
            <img src={img_profileLittle} alt="Мой профиль" />
            Мой профиль</NavLink>
            <NavLink className="popup__link" to="">
              <SettingOutlined className="icon" />
              Настройки</NavLink>
            <NavLink className="popup__link" to="/signin">
            <LogoutOutlined className="icon" />
            Выйти</NavLink>
          </div>
          </div>
          <div 
          className={`burger ${burgerActive ? "active" : ""}`}
          onClick={() => setBurgerActive(!burgerActive)}>
            <div className="burger__username">
            <img 
            className="profile__img"
            src={img_profile} alt="Профиль" />
            <div>UserName</div>
            </div>
            <div className="burger__raiting">
              <div className="rainting__intro">
                <div className="active__status">Active</div>
                <div>Градация 1</div>
                <div className="burger__percent">50%</div>
              </div>
            <progress className="burger__progress" max="100" value="50"></progress>
            </div>
            <NavLink className="burger__line"  to="/home">Выбор градации</NavLink>
            <NavLink className="burger__line" to="/instructions">Инструкции</NavLink>
            <NavLink className="popup__link burger__line" to="/profile">
            <img src={img_profileLittle} alt="Мой профиль" />
            Мой профиль</NavLink>
            <NavLink className="popup__link burger__line" to="">
            <SettingOutlined className="icon" />
            Настройки</NavLink>
            <NavLink className="popup__link" to="/signin">
            <LogoutOutlined className="icon" />
            Выйти</NavLink>
          </div>
      </header>
  )
}
