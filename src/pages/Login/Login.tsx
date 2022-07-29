import React, {useState} from "react";
import styles from './Login.module.scss';
import sharedStyles from '../../styles/shared.module.scss';
import {useDispatch} from "react-redux";
import {setAuth} from "../../store/auth/authActions";
import AuthService from "../../store/auth/authService";
import {useLocation, useNavigate} from "react-router-dom";

const Login = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState<{ email: string, password: string}>({email: '', password: ''});
    const role = (state as {role: string}).role;

    const submitLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        AuthService.login(form.email, form.password).then((response) => {
            if (response) {
                dispatch(setAuth(response));
                navigate(`/dashboard`, {state: {role}})
            }
        })
    }

    return (
        <form className={styles.form}>
            <h1>{`Login as ${role}`}</h1>
            <input className={styles.input} type="text" onChange={(e) => setForm((prev) => ({...prev, email: e.target.value}))}/>
            <input className={styles.input} type="password" onChange={(e) => setForm((prev) => ({...prev, password: e.target.value}))}/>
            <button className={sharedStyles.button} onClick={(e) => submitLogin(e)} type="submit">Submit</button>
        </form>
    )
}

export default Login;