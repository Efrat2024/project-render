import * as React from 'react';
import { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { useEffect } from 'react';
import { removeToken ,removeRole} from '../../../Store/Slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import useAuth from '../../../Store/app/useAuth'
import useAxios from 'axios-hooks'
import { addMany } from '../../../Store/Slices/counterSlice';
function AppUser() {
  const token = localStorage.getItem("token")
  const { _id: userId, firstname, lastname } = useAuth()
  const myCnt = useSelector(x=>x.counter.cnt)
  const [{ data, loading, error}, refetch] = useAxios(
    {
      url: `http://localhost:4444/api/user/${userId}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "authorization": 'Bearer ' + localStorage.getItem("token")
      }
    }
  )
  const username = `${firstname} ${lastname}`
  const [menuClicked, setMenuClicked] = useState(false);
  const handleSignInAlert = () => {

    alert("אתה צריך להרשם בשביל לגשת לאתר. פשוט, רק מייל ושם... בהצלחה!👍");
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (data?.shoppingCart) {
      if (data?.shoppingCart) {
        const len2 = data?.shoppingCart?.length;
        dispatch(addMany({add:len2}))
      }
    }
  }, [data, userId]);


  const shoppingCartIcon = (
    <Button icon="pi pi-shopping-cart">
      <Badge value={myCnt}></Badge>
    </Button>
  );

  const items = [
    {
      label: 'בית',
      icon: 'pi pi-home',
      command: token ? null : handleSignInAlert,
      url: token ? '/' : ''

    },
    {
      label: 'התחבר',
      icon: 'pi pi-star',
      url: '/SignIn'
    },
    {
      label: 'הירשם',
      icon: 'pi pi-user',
      url: '/SignUp'
    },
    {
      label: 'התנתק',
      icon: 'pi pi-lock-open',
      command: () => {
        if (token) {
          dispatch(removeToken());
          dispatch(removeRole());

        } else {
          handleSignInAlert();

        }
      },
      url: token ? '/SignIn' : ''
    },
    {
      label: 'רכישות קודמות',
      icon: 'pi pi-history',
      command: token ? null : handleSignInAlert,
      url: token ? '/Package' : ''
    },
    {
      label: '',
      icon: shoppingCartIcon,
      // command=>():{token? null :handleSignInAlert},
      command: token ? null : () => { handleSignInAlert(); },
      url: token ? '/SideCart' : ''
    },
    {
      label: 'קניות',
      icon: 'pi pi-shopping-cart',
      command: token ? null : handleSignInAlert,
      url: token ? '/BuyVacationShop' : ''
    },

    {
      label: 'צור קשר',
      icon: 'pi pi-envelope',
      command: token ? null : handleSignInAlert,
      url: token ? '/Contact' : ''
    }

  ];

  const handleClick = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <div>
      {/* <AppBar position="fixed"> */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
        <div className="flex items-center justify-between card" style={{ padding: '0.5rem' }}>
          {/* <img className="w-9 sm:w-8em xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={logo} alt="Logo" style={{ width: '3%' }}/> */}
          <Menubar model={items} onClick={handleClick} style={{ width: '100%', backgroundColor: '#fffff', color: '#b12c16' }} />
        </div>
      </div>


    </div>
  );
}

export default AppUser;
