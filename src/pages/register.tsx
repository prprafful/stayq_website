import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Router, { useRouter } from 'next/router';
import { useStores } from '../hooks/useStores';
import Layout from '../components/generics/Layout';
import SignUpForm from '../components/register/SignUpForm';
import SQDialog from '../components/generics/SQDialog';
import OtpPopUp from 'components/register/OtpPopUp';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  signUp: {
    display: 'flex',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paper: {
    borderRadius: 10,
    userSelect: 'none',
    maxWidth: 'unset',
  },
  footerInfo: {
    fontSize: 12,
  }
});

const Register = () => {
  const classes = useStyles();
  const router = useRouter();
  const [showOTPForm, setShowOTPForm] = useState(false);

  const { signUpStore, userStore } = useStores();

  const queryparams = useMemo(() => router.query, [router.query]);

  const nextUrl = queryparams['next'];

  useEffect(() => {
    if (userStore.currentUser) {
      Router.push('/dashboard/');
    }
    if (signUpStore.signupSuccess) {
      Router.push('/dashboard/');
    }
  }, [userStore.currentUser, signUpStore.signupSuccess,]);


  const onFormSubmit = () => {
    signUpStore.guestLogin().then((response) => {
      if (!response.problem) {
        signUpStore.postOtp();
        setShowOTPForm(true);
      }
    });
  }

  return (
    <Layout
      title="Register"
    >

      <div className={classes.container}>
        <SignUpForm
          signUpStore={signUpStore}
          onFormSubmit={onFormSubmit}
        />

        {showOTPForm && (
          <SQDialog
            disableBackdropClick
            disableEscapeKeyDown
            open={true}
            classes={{ paper: classes.paper }}
            onClose={() => { }}
          >
            <OtpPopUp
              signUpStore={signUpStore}
              phoneNumber={signUpStore.countryCode + signUpStore.phone}
              onEditNumber={() => {
                setShowOTPForm(false);
              }}
              onSkipOtp={() => {
                setShowOTPForm(false);
              }}
              onSubmit={() =>
                signUpStore.signup().then(() => {
                  if (signUpStore.errors.size === 0) {
                    userStore.pullUser();
                  } else {
                    if (!signUpStore.errors.has('otp')) {
                      setShowOTPForm(false);
                    }
                  }
                })
              }
            />
          </SQDialog>
        )}
        <div className={classes.footerInfo}>
          <p>
            By registering, I agree to StayQrious{' '}
            <a href="https://stayqrious.com/terms-and-conditions/#tnc" target="_blank" rel="noreferrer">
              Terms &amp; Conditions
            </a>{' '}
            &{' '}
            <a href="https://stayqrious.com/terms-and-conditions/#privacy_policy" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
            <br />
            {/* Already have an account? <Link to={{ pathname: '/login', state: { from: fromLocation } }}>Log in</Link> */}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default observer(Register);
