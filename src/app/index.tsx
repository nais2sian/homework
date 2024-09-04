import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { getUserThunk, init } from '../features/user/userSlice';
import { AppDispatch, RootState } from '../store';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { ROLE } from '../constants';
import { AdminPage } from '../pages/AdminPage';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const isInit = useSelector((state: RootState) => state.user.isInit);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUserThunk({ token }))
        .unwrap()
        .then((user) => {
          if (user.role === ROLE.ADMIN) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        })
        .catch(() => {
          navigate('/sign-in');
        });
    } else {
      dispatch(init());
      navigate('/sign-in');
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/' element={<ProtectedRoute accessRoles={[ROLE.USER]} />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/admin' element={<ProtectedRoute accessRoles={[ROLE.ADMIN]} />}>
          <Route path='/admin' element={<AdminPage />} />
        </Route>
      </Routes>
    </>
  );
};
