import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../../css/components-of-css-temlate/Typography';
import img1 from '../../../images/appFooterFacebook.png'
import img2 from '../../../images/appFooterTwitter.png'
function Copyright() {

  return (
    <React.Fragment>

      תמר נופשים     {'כאן תמיד בשבילכם'}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};



export default function AppFooter() {


  

  const handleLanguageClick = (selectedLanguage) => {
    <Link href={'./Privacy'}>{}</Link>
  //  navigate("./Privacy")
  };


  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
      style={{ color: '#212020', backgroundColor: '#fff5f8' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="https://mui.com/" sx={iconStyle}>
                  <img
                    src={img1}
                    alt="Facebook"
                  />
                </Box>
                <Box component="a" href="https://twitter.com/MUI_hq" sx={iconStyle}>
                  <img src={img2} alt="X" />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
          <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
  {[
    { id: 'terms-link', href: './Terms', text: 'תנאים' },
    { id: 'privacy-link', href: './Privacy', text: 'פרטיות' }
  ].map(item => (
    <Box component="li" key={item.id} sx={{ py: 0.5 }}>
     
    </Box>
  ))}
</Box>
          </Grid>


        </Grid>
      </Container>
    </Typography>
  );
}