import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Typography from '../../css/components-of-css-temlate/Typography';
import AppForm from '../views/AppForm';
import { email, required } from '../form/validation';
import RFTextField from '../../css/components-of-form/RFTextFeild';
import FormButton from '../../css/components-of-form/FormButton';
import FormFeedback from '../../css/components-of-form/FormFeedback';
import withRoot from '../../css/components-of-css-temlate/withRoot';

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['email'], values);
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <React.Fragment>
      
      <AppForm>
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            ?שכחת את הסיסמא שלך
          </Typography>
          <Typography variant="body2" align="center" color="black">
            {"כתוב את המייל שלך ונאפס את הסיסמא שלך"}
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoFocus
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'שילחו קישור לאתחול הסיסמא'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
     
    </React.Fragment>
  );
}

export default withRoot(ForgotPassword);