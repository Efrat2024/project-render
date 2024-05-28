import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../../css/components-of-css-temlate/Typography';
import TextField from './TextField';
import Snackbar from './Snackbar';
import Button from '../../css/components-of-css-temlate/Button';
import { useGetUserQuery,useKeepMeUpdateMutation } from '../../../Store/Slices/authApiSlice';
import useAuth from '../../../Store/app/useAuth'
import { useState } from 'react';



function ProductCTA() {
  const [open, setOpen] = React.useState(false);
  const { data: dataUsers, isErroru, erroru, isLoadingu, isSuccessu } = useGetUserQuery();
  //const [keepMeUpdate, { isError2, error2, isLoading2, isSuccess2, data2 }] = useKeepMeUpdateQuery();
  console.log("dataUsers",dataUsers);
  const  { _id,firstname,lastname, email,roles}=useAuth()
  const username=`${firstname} ${lastname}`
  const [email2, setEmail2] = useState('');
  const[emailInput,setEmailInput]=useState(email)
 
 
  const [keepMeUpdate,{ isError, error, isLoading, isSuccess, data }] =useKeepMeUpdateMutation()
  const handleChange = (e) => {
    setEmail2(e.target.value);
  };
  const handleSubmit = () => {
    // כאן אתה יכול להשתמש בערך המצוי במשתנה email ולעשות איתו מה שתרצה
console.log("rr",email2);
    // ניתן לשלוח את הערך לפונקציה שמתעדכנת את המייל
     toRegister(email);
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const toRegister = (e) => {
    console.log("Id",_id);
    keepMeUpdate({_id,e});
    //  setEmailInput("")
    console.log("emailll",email);
    
  };

  return (
    <>
    <Container component="section" sx={{ mt: 10, display: 'flex' }} >
      <Grid container style={{color:'#212020'}}>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box style={{color:'#212020',backgroundColor:'#ffc071'}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'warning.main',
              py: 8,
              px: 3,
              
            }}
          >
            <Box component="form" onSubmit={handleSubmit2} sx={{ maxWidth: 400 }} style={{color:'#212020',backgroundColor:'#ffc071'}}>
              <Typography variant="h2" component="h2" gutterBottom>
                קבל הצעות במייל
              </Typography>
              <Typography variant="h5">
               טעם של חג קרוב לבית
              </Typography>
              <TextField
                noBorder
                placeholder="Your email"
                variant="standard"
                sx={{ width: '100%', mt: 3, mb: 2 }}
                style={{color:'#212020',backgroundColor:'#ffc071'}}
                value={emailInput}
                onChange={handleChange}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: '100%' }}
                style={{color:'#ffffff',backgroundColor:'#28282a'}}
                onClick={handleSubmit}
              >
                 תעדכן את המייל שלי
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="נרשמת בהצלחה לרשימת הדיוור"
      />
      
    </Container>
    
   
   </>
  );
}

export default ProductCTA;