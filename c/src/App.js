import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import AppFooter from './design/modules/views/AppFooter';
import AppAppBar from './design/modules/views/AppAppBarManager';
import SignUp from './design/modules/views/SignUp';
import UserSlice from '../src/Store/Slices/UserSlice'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Routes } from 'react-router-dom';
import SignIn from './design/modules/views/SignIn';
import Home from './design/modules/components/HomeProduct';
import ErrorPages from './design/modules/components/ErrorPages';
import authSlice from './Store/Slices/authSlice';
import VacationSlice from './Store/Slices/VacationSlice';
import apiSlice from './Store/Slices/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import HomeManager from './design/modules/components/HomeManager'
import UserList from './Store/app/AcssesDBVacations-AddVacation';
import StatusSlice from './Store/Slices/StatusSlice'
import  BuyVacationShop from './design/modules/components/BuyVacationShop'
import Enter from './design/modules/components/Enter'
import HomeBeforeSingIn from './design/modules/components/HomeBeforeRegister'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import FinishBuying from './design/modules/components/FinishBuying'
import './design/css/index.css';
import Info from './Store/app/GetVacationInfo';
import Package from './design/modules/components/Package';
import MNGUser from './design/modules/components/MNGUser'
import SideCart from './design/modules/components/SideCart ';
import useAuth from './Store/app/useAuth'
import AppUser from './design/modules/views/AppAppBarUser';
import ForgotPassword from './design/modules/components/ForgotPassword';
import MNGUserRegister from './design/modules/components/MNGUserRegistered';
import Contact from './design/modules/components/Contact';
import PayPal from './design/modules/components/PayPal';
import Terms from './design/modules/views/Terms'
import Privacy from '../src/design/modules/views/Privacy'
import GetAllVacationListList from '../src/Store/app/AcssesDBVacation'
const myStore = configureStore({
  reducer: {
    //  TaskSlice, 
    UserSlice,
    //ProductSlice,
    authSlice,StatusSlice,



    [apiSlice.reducerPath]: apiSlice.reducer,
    VacationSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false
});

setupListeners(myStore.dispatch);
 
function App() {
  const  { _id:userId,firstname,lastname, email,roles}=useAuth()
  const token =localStorage.getItem("token")
  return (
    <div className="App">
      
      {roles==='Manager'?<AppAppBar/>:<AppUser/>}
    
      <React.Fragment>
        <Provider store={myStore}>
          <Router>
          <Routes>
            <Route path='/' element={token?<Home/>:<HomeBeforeSingIn/>} />
            <Route path='/UserList' element={<UserList />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/Enter' element={<Enter />} />
            <Route path="/BuyVacationShop" element={<BuyVacationShop />} />
            <Route path="/GetAllVacationListList" element={<GetAllVacationListList />} />
            <Route path='/User' element={<SignIn />} />
            <Route path='/info' element={<Info />} />
            <Route path='/PayPal' element={<PayPal />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/homemanage' element={<HomeManager />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/Package' element={<Package />} />
            <Route path='/SideCart ' element={<SideCart />} />
            <Route path='/MNGUser' element={<MNGUser />} />
            <Route path='/MNGUserRegister' element={<MNGUserRegister />} />
            <Route path='/Terms' element={<Terms />} />
            <Route path='/Privacy' element={<Privacy />} />
            <Route path='/SideCart' element={<SideCart />} />
            <Route path='*' element={<ErrorPages />} />
            <Route path='/FinishBuying' element={<FinishBuying />} />
          </Routes>
          </Router>
          <AppFooter />
        </Provider>
      </React.Fragment>
    </div>
  );
}
 
export default App;
