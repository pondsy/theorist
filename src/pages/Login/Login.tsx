import React, {useEffect, useState} from "react";
import styles from './Login.module.scss';
import {useDispatch} from "react-redux";
import {setAuth} from "../../store/auth/authActions";
import AuthService from "../../store/auth/authService";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import {toast} from "react-toastify";
import useValidation from "../../hooks/useValidation";

const Login = () => {

    const {state} = useLocation();
    const {validateEmail, validatePassword} = useValidation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState<{ email: string, password: string}>({email: '', password: ''});
    const [errors, setErrors] = useState<{email: string|undefined, password: string|undefined}>()
    const role = (state as {role: string}).role;

    const submitLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const errors = {
            email: validateEmail(form.email),
            password: validatePassword(form.password)
        };
        setErrors(errors);
        if (errors.email || errors.password) return;

        AuthService.login(form.email, form.password, role)
            .then((response) => {
                dispatch(setAuth(response));
                navigate(`/dashboard`, {state: {role}})
            }).catch((error) => toast.error(error.message))
    }

    useEffect(() => {
        if (!errors?.email && !errors?.password) return;
        const timeoutID = window.setTimeout(() => {
            setErrors(undefined)
        }, 3000);

        return () => window.clearTimeout(timeoutID);
    }, [errors]);

    return (
        <div className={styles.page}>
            <form className={styles.form}>
                <h1>{`Login as ${role}`}</h1>
                <input className={styles.input} type="email" onChange={(e) => setForm((prev) => ({...prev, email: e.target.value}))}/>
                {errors?.email && <ErrorMessage error={errors.email}/>}
                <input className={styles.input} type="password" onChange={(e) => setForm((prev) => ({...prev, password: e.target.value}))}/>
                {errors?.password && <ErrorMessage error={errors.password}/>}
                <Button text="Submit" onClick={(e) => submitLogin(e)}/>
            </form>
        </div>
    )
}

export default Login;