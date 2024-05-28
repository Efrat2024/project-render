import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../../css/components-of-css-temlate/Typography';
import AppForm from './AppForm';
import { email, required, DuplicateEmail } from '../form/validation';
import RFTextField from '../../css/components-of-form/RFTextFeild';
import FormButton from '../../css/components-of-form/FormButton';
import FormFeedback from '../../css/components-of-form/FormFeedback';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../Store/Slices/authApiSlice';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../Store/Slices/authSlice';
import useAxios from 'axios-hooks'
function SignUp() {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [registerFunc, { isErrorReg, isSuccessReg, isLoadingReg, dataReg, errorReg }] = useRegisterMutation()
  const [{ data: dataUsers, loading, error: error2 }, refetch] = useAxios(
    {
      url: 'http://localhost:4444/api/user',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "authorization": 'Bearer ' + localStorage.getItem("token")
      }
    }
  )

  const validate = (values) => {
    console.log("datarrr", dataUsers);
    const errors = required(['firstname', 'lastname', 'email', 'password'], values);
    if (!errors.email) {
      const emailError = email(values.email, dataUsers);
      if (emailError) {
        errors.email = emailError;
      }
      const emailError2 = DuplicateEmail(values.email, dataUsers);
      if (emailError2) {
        errors.email = emailError2;
      }
    }

    return errors;
  };


  useEffect(() => {
    if (isSuccessReg) {
      dispatch(setToken(dataReg))
      navigate("/Enter")
    }
  }, [isSuccessReg]);
  useEffect(() => {
    if (isErrorReg) {
      alert("i have eroor in register func");
    }

  }, [isErrorReg])
  const handleSubmit = async (e) => {
    // debugger;
    registerFunc(e)
    setSent(true);
    navigate("/signIn");

  };


  useEffect(() => {
    if (errorReg) {
      alert("שם משתמש קיים כבר במערכת")
    }

  }, [errorReg])

  return (
    <React.Fragment>
      {/* <AppAppBar /> */}
      <AppForm>
        <Typography variant="h3" gutterBottom marked="center" align="center" style={{ color: '#28282a' }}>
          לכניסה
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/signIn" align="center" underline="always" style={{ color: '#28282a' }}>
            כבר יש לך חשבון? הכנס
          </Link>
          <Routes>
            <Route path='/signIn' element={<SignIn />} />
          </Routes>
        </Typography>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit, submitting }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="שם פרטי"
                    name="firstname"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="שם משפחה"
                    name="lastname"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="מייל"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="סיסמא"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
                style={{ color: '#ffffff', backgroundColor: '#ff3366' }}
              >
                {submitting || sent ? 'בתהליך...' : 'להרשם'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>

    </React.Fragment>
  );
}

export default SignUp;
