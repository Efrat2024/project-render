import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../../css/components-of-css-temlate/Typography';
import useAxios from 'axios-hooks'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageBackdrop = styled('div')(({ theme }) => ({
  
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));




export default function ProductCategories() {
  const navigate = useNavigate()
  console.log(localStorage.getItem("token"));
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: 'https://server2-efrat.onrender.com/api/vacation',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "authorization": 'Bearer ' + localStorage.getItem("token")
      }
    }
  )
  
  useEffect(() => { console.log('dataCategories', data) }, [data])
  useEffect(() => { console.log('errorCategories', error) }, [error])
  useEffect(() => { console.log('loadingCategories', loading) }, [loading])
  const func2=(e)=>{
    if(e!="nullo"){
      
     navigate(`/info?e=${e}`);
  }
  }
  const images = [
    
    
    {
      url: data && data[0]?.images[0] ? `https://server2-efrat.onrender.com/uploads/${data[0].images[0].split("\\")[2]}` : '../../../a/logo.png',
      title: data && data[0]?.images[0] ? data[0].name : "",
      width: '40%',
      id:  data && data[0]?.images[0] ? data[0]._id : "nullo"

    },
    
    {
      url: data && data[1]?.images[1] ? `https://server2-efrat.onrender.com/uploads/${data[1].images[0].split("\\")[2]}` : 'https://images.unsplash.com/photo-1531299204812-e6d44d9a185c?auto=format&fit=crop&w=400',
      title: data && data[1]?.images[0] ? data[1].name : 'Massage',
      width: '20%',
      id:  data && data[1]?.images[0] ? data[1]._id : "nullo"
      
    },
    {
      url: data && data[2]?.images[0] ? `https://server2-efrat.onrender.com/uploads/${data[2].images[0].split("\\")[2]}`: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400',
      title: data && data[2]?.images[0] ? data[2].name :'Hiking',
      width: '40%',
      id:  data && data[2]?.images[0] ? data[2]._id : "nullo"
    },
    {
      url: data && data[3]?.images[0] ? `https://server2-efrat.onrender.com/uploads/${data[3].images[0].split("\\")[2]}`: 'https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400',
      title: data && data[3]?.images[0] ? data[2].name:'Tour',
      width: '38%',
      id:  data && data[3]?.images[0] ? data[3]._id : "nullo"
    },
    {
      url: data && data[4]?.images[0] ? `https://server2-efrat.onrender.com/uploads/${data[4].images[0].split("\\")[2]}`:'https://images.unsplash.com/photo-1523309996740-d5315f9cc28b?auto=format&fit=crop&w=400',
      title: data && data[4]?.images[0] ? data[4].name:'Gastronomy',
      width: '38%',
      id:  data && data[4]?.images[0] ? data[4]._id : "nullo"
    },
    {
      url: data && data[5]?.images[0] ? `https://server2-efrat.onrender.com/uploads/${data[5].images[0].split("\\")[2]}`:'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400',
      title: data && data[5]?.images[0] ? data[5].name:'Shopping',
      width: '24%',
      id:  data && data[5]?.images[0] ? data[5]._id :"nullo"
    },
    {
      url:  data && data[6]?.images[0] ? `https://server2-efrat.onrender.com/uploads/${data[6].images[0].split("\\")[2]}`:'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400',
      title: data && data[6]?.images[0] ? data[6].name:'Walking',
      width: '40%',
      id:  data && data[6]?.images[0] ? data[6]._id :"nullo"
    },
    {
      url: data && data[7]?.images[0] ? `https://server2-efrat.onrender.com/uploads/${data[7].images[0].split("\\")[2]}`:'https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400',
      title: data && data[7]?.images[0] ? data[7].name:'Fitness',
      width: '20%',
      id:  data && data[7]?.images[0] ? data[7]._id :"nullo"
    },
    {
      url: data && data[8]?.images[0] ? `https://server2-efrat.onrender.com/uploads/${data[8].images[0].split("\\")[2]}`:'http://localhost:3000/logo192.png',
      title: data && data[8]?.images[0] ? data[8].name:'Reading',
      width: '40%',
      id:  data && data[8]?.images[0] ? data[8]._id :"nullo"
    },
  ];
  return (
    
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        לכל הסוגים והטעמים...
      </Typography>
      
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
  {images.map((image) => (
    <ImageIconButton
      key={image.title}
      style={{
        width: image.width,
      }}
      onClick={() => func2(image.id)} // Wrap func2 call in an arrow function
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundImage:  `url(${image.url})`,
        }}
      />
      <ImageBackdrop className="imageBackdrop" />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'common.white',
        }}
      >
        <Typography
          component="h3"
          variant="h6"
          color="inherit"
          className="imageTitle"
        >
          {image.title}
          <div className="imageMarked" />
        </Typography>
      </Box>
    </ImageIconButton>
  ))}
</Box>

    </Container>
  );

}
