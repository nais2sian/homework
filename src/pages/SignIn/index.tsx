import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { loginUserThunk, getUserThunk } from '../../features/user/userSlice';

export const SignIn = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) => state.user.isLoading);
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<string | null>(null); // Вот здесь добавляется состояние токена

    const onChangeLogin: React.ReactEventHandler<HTMLInputElement> = (e) => {
        setLogin(e.currentTarget.value);
    };

    const onChangePassword: React.ReactEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmit: React.ReactEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(loginUserThunk({ login, password }))
            .unwrap()
            .then(token => {
                setToken(token);
                localStorage.setItem('token', token);
                dispatch(getUserThunk({ token }))
                    .unwrap()
                    .then(() => {
                        navigate('/');
                    })
                    .catch(({ message }) => alert(message));
            })
            .catch(({ message }) => alert(message));
    };

    return (
        <main className="container small">
            <h1>Вход:</h1>
            <form onSubmit={onSubmit} className="column">
                <label>
                    <span>Логин</span>
                    <input type="text" onChange={onChangeLogin} value={login} />
                </label>
                <label>
                    <span>Пароль</span>
                    <input type="password" onChange={onChangePassword} value={password} />
                </label>
                <button disabled={isLoading}>Отправить</button>
            </form>
        </main>
    );
};
