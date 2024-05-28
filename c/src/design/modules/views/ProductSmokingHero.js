import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../../css/components-of-css-temlate/Typography';
import img from '../../../images/productBuoy.svg'
import { Editor } from "primereact/editor";
import { useState } from 'react';
import useAuth from '../../../Store/app/useAuth'
import {useAddQuestionToTamarMutation} from '../../../Store/Slices/authApiSlice'
function ProductSmokingHero() {
  const  {email}=useAuth()
  const [AddQuestionToTamar,{ data, isLoading, isError, error } ]= useAddQuestionToTamarMutation();
  
  const sendMessegeTamar=()=>{
console.log("setShowElement");
    setShowElement(true);
    setShowElement1(true);
  }
  const sendMessegeTamar1=()=>{
    setShowElement(false);
    setShowElement1(false);
     AddQuestionToTamar({text,email});
   
      }
  const [text, setText] = useState('');
  const [showElement, setShowElement] = React.useState(false);
  const [showElement1, setShowElement1] = React.useState(false);
  return (
    <>
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        
        }}
        onClick={()=>sendMessegeTamar()}
      >
        <Typography variant="h4" component="span">
         יש לך שאלה? צריך עזרה?
        </Typography>
       
      </Button>
      <div className="card"  >
{showElement?(
<Editor value={text} 
onTextChange={(e) => {
    const html = e.htmlValue;
    const div = document.createElement('div');
    div.innerHTML = html;
    setText(div.innerText);
}} 
style={{ height: '320px' }} 
/>
):null
}
{showElement?(<Button sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 1,
          px: 2,
        
        }}
        onClick={()=>sendMessegeTamar1()}>לשלוח</Button> ) :null  }
        </div>
      <Typography variant="subtitle1" sx={{ my: 3 }}>
אנחנו כאן בשביל לעזור , תשמור על קשר!      </Typography>
      <Box
        component="img"
        src={img}
        alt="buoy"
        sx={{ width: 60 }}
      />
      
    </Container>
    
    </>
  );
}

export default ProductSmokingHero;