import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import {
  onAuthStateChangedLIstener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils';

import Home from './routes/home/Home';
import Shop from './routes/shop/Shop';
import Checkout from './routes/checkout/Checkout';
import NavigationBar from './routes/navigation/Navigation';
import SignIn from './routes/authentication/Authentication';
import { setCurrentUser } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedLIstener((user) => {
      dispatch(setCurrentUser(user));
      if (user) createUserDocumentFromAuth(user);
    });
    return unsubscribe;
  }, [dispatch]);

  //

  return (
    <Routes>
      <Route path='/' element={<NavigationBar />}>
        <Route index element={<Home />}></Route>
        <Route path='shop/*' element={<Shop />}></Route>
        <Route path='auth' element={<SignIn />}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
