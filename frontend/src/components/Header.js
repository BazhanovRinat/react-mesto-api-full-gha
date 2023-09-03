import logo from '../images/logo.svg';
import NavBar from './NavBar';
import { Route, Routes } from 'react-router-dom';


function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <div className="header__navbar">
                <h2 className="header__email-adress">{props.loggedIn ? props.email : ""}</h2>
                <Routes>
                    <Route path="/" element={<NavBar name={"Выход"} path={"sign-in"} signOut={props.signOut} className={"navigation__link"}/>} />
                    <Route path="/sign-in" element={<NavBar name={"Регистрация"} path={"sign-up"} className={"navigation__link"} />} />
                    <Route path="/sign-up" element={<NavBar name={"Войти"} path={"sign-in"} className={"navigation__link"} />} />
                </Routes>
            </div>
        </header>
    )
}

export default Header

