import {useDispatch} from 'react-redux';
import { logout } from '../../features/user/userSlice';


export const Header = () => {
const dispatch = useDispatch()
    const onLogout = () => {
         localStorage.removeItem('token');
    dispatch(logout());
    };

    return (
        <header>
            <button onClick={onLogout}>Выход</button>
        </header>
    )
};