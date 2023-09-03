import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import useForm from "../hooks/useForm"

const Register = ({ onRegister }) => {
    const navigate = useNavigate();
    const { values, handleChange, setValues } = useForm({});

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(values, setValues)
    }


    return (
        <div className="sign-data">
            <h2 className="sign-data__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="sign-data__form">
                <input onChange={handleChange} name="email" className="sign-data__input" type="email" placeholder="Email" />
                <input onChange={handleChange} name="password" className="sign-data__input" type="password" placeholder="Пароль" />
                <button className="sign-data__submit" type="submit">Зарегистрироваться</button>
            </form>
            <NavBar name={"Уже зарегистрированы? Войти"} path={"sign-in"} className={"sign-data__under-submit-link"} />
        </div>
    )
}

export default Register