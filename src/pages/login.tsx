import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import GoogleLogin from 'react-google-login';

import { useStores } from '../hooks/useStores';
import clsx from 'clsx';
// import Loading from '../components/Loading';
import Button from '@material-ui/core/Button';
import Config from '../config';
import GoogleIcon from 'assets/googleIcon.svg';
// import * as Sentry from '@sentry/browser';

// import { Location } from 'history';
// import HeaderTitle from 'components/HeaderTitle';
import Layout from 'components/generics/Layout';
import { useRouter } from 'next/router';
import Loading from 'components/generics/Loading';
import Link from 'next/link';

const useStyles = createUseStyles({
  signIn: {
    margin: 'auto',
    width: '90%',
    maxWidth: 588,
    height: 360,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  formContainer: {
    background: '#fbfbfb',
    height: 300,
    borderRadius: 30,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative',
    zIndex: 2,
    '& h2': {
      margin: 0,
    },
  },
  field: {
    background: '#e6e6e6',
    height: '3rem',
    borderRadius: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    padding: [0, '1rem'],
    '& input': {
      border: 'none',
      background: 'none',
      fontSize: '1rem',
      paddingLeft: '1rem',
      fontFamily: "'Lato', sans-serif",
      outline: 'none',
      width: '100%',
    },
  },
  loginButton: {
    position: 'relative',
    left: 'calc(100% - 12rem)',
    top: '-2em',
    zIndex: 1,
    background: 'hsl(240, 100%, 35%)',
    textTransform: 'uppercase',
    border: 'none',
    fontFamily: 'Cabin',
    fontSize: '1.5rem',
    fontWeight: 100,
    width: '12rem',
    height: '6rem',
    borderRadius: '2rem',
    boxShadow: '0 0.125rem 0.125rem 0.125rem rgba(0, 0, 0, 0.05)',
    outline: 'none',
    cursor: 'pointer',
    color: 'white',
    paddingTop: '2em',
    '& .dot-typing': {
      margin: 'auto',
    },
    '&:disabled': {
      cursor: 'default',
    },
  },
  helpText: {
    color: '#444',
    textAlign: 'center',
  },
  errMsg: {
    color: 'red',
    textAlign: 'center',
    fontSize: '1.2em',
  },
  errorShake: {
    animation: '$shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  },
  '@keyframes shake': {
    '10%, 90%': {
      transform: 'translate3d(-1px, 0, 0)',
    },

    '20%, 80%': {
      transform: 'translate3d(2px, 0, 0)',
    },

    '30%, 50%, 70%': {
      transform: 'translate3d(-4px, 0, 0)',
    },

    '40%, 60%': {
      transform: 'translate3d(4px, 0, 0)',
    },
  },
  togglePassword: {
    cursor: 'pointer',
  },
  loginOtpLink: {
    fontSize: '0.9rem',
    textDecoration: 'underline',
    background: 'transparent',
    outline: 0,
    border: 0,
    color: '#49f',
    userSelect: 'none',
  },
  hide: {
    display: 'none',
  },
  googleLogin: {
    width: '12rem',
    left: 'calc(100% - 12rem)',
    '& svg': {
      marginRight: '1rem',
    },
  },
});

function isValidPhonenumber(value: string) {
  return /^\d{7,}$/.test(value.replace(/[\s()+\-.]|ext/gi, ''));
}

function LoginPage({ location }: { location: Location }) {
  const router = useRouter();
  console.log('router', router)

  // const { state } = location;
  // const { from: fromLocation, phone = '' } = (state || { from: undefined }) as { from: Location; phone?: string };
  const nextUrl: any = router.query['next'];
  const phone: any = router.query['phone'];

  const classes = useStyles();
  const { authStore, userStore } = useStores();
  const [pwdVisible, setPwdVisible] = useState(false);
  const [loginWithOTP, setLoginWithOTP] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(-1);
  const [isStaffMember, setIsStaffMember] = useState(false);


  function handleSendOTP(e: any) {
    authStore.postOtp().then((response) => {
      if (response && response.status === 201) {
        setOTPSent(true);
        setSecondsLeft(response.data.retry_in);
      } else if (response && response.status === 208) {
        setOTPSent(true);
        setSecondsLeft(response.data.retry_in);
        authStore.setErrors(response.data.message);
      } else if (response && response.status === 403) {
        authStore.setErrors('Phone number not registered');
      } else {
        authStore.setErrors('Oops! We messed up something!!');
      }
    });
  }

  const responseGoogle = (response: any) => {
    if (!response) {
      return;
    }
    if (response?.error) {
      if (response.error === 'idpiframe_initialization_failed') {
        authStore.setErrors('Please enable third party cookies in your browser');
      } else if (response.error === 'popup_closed_by_user') {
        authStore.setErrors('Login failed');
      } else {
        authStore.setErrors('Login Error');
      }
      return;
    }
    if (!response.accessToken) {
      authStore.setErrors('Unknown error');
      // Sentry.withScope((scope) => {
      //   scope.setExtra('GoogleOAuth', {
      //     response: response,
      //     username: authStore.username,
      //   });
      //   Sentry.captureMessage('Google OAuth failed');
      // });
      return;
    }

    authStore.setToken(response.accessToken);
    authStore.setPassword('!');
    authStore.login();
  };

  useEffect(() => {
    if (secondsLeft > 0) {
      const iid = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(iid);
    }
  }, [secondsLeft]);

  useEffect(() => {
    authStore.setErrors('');
    authStore.setPassword('');
    setPwdVisible(loginWithOTP);

    if (loginWithOTP) {
      if (!isValidPhonenumber(authStore.username)) {
        authStore.setUsername('');
      }
    }
  }, [authStore, loginWithOTP]);

  useEffect(() => {
    if (authStore.username.endsWith('@stayqrious.com')) {
      setIsStaffMember(true);
    } else {
      setIsStaffMember(false);
    }
  }, [authStore.username]);

  useEffect(() => {
    if (phone) {
      authStore.setUsername(phone);
    }
  }, [phone, authStore]);

  useEffect(() => {
    if (userStore.currentUser) {
      router.push(nextUrl || '/');
    }
  }, [userStore.currentUser, nextUrl]);

  return (
    <Layout
      title="Login :: StayQrious"
    >
      <section className={classes.signIn}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authStore.login();
          }}
        >
          <div
            className={clsx(classes.formContainer, {
              [classes.errorShake]: !!authStore.errors,
            })}
          >
            <h2>Sign in</h2>
            <label htmlFor="email" className={classes.field}>
              <i className="material-icons">phone_iphone</i>
              <input
                type="text"
                id="email"
                value={authStore.username}
                placeholder={loginWithOTP ? 'Phone Number' : 'Phone No. or Email'}
                onChange={(e) => authStore.setUsername(e.target.value)}
                required
              />
            </label>

            {!isStaffMember && (
              <label
                htmlFor="password"
                className={clsx(classes.field, {
                  [classes.hide]: loginWithOTP && !OTPSent,
                })}
              >
                <i className="material-icons">lock</i>
                <input
                  type={pwdVisible ? 'text' : 'password'}
                  id="password"
                  value={authStore.password}
                  placeholder={loginWithOTP ? 'OTP' : 'Password'}
                  onChange={(e) => authStore.setPassword(e.target.value)}
                />
                <span
                  className={classes.togglePassword}
                  onClick={() => setPwdVisible(!pwdVisible)}
                  title={pwdVisible ? 'Hide password' : 'Show password'}
                >
                  <i className="material-icons">{pwdVisible ? 'visibility_off' : 'visibility'}</i>
                </span>
              </label>
            )}
            {loginWithOTP && (
              <Button
                onClick={(e) => {
                  handleSendOTP(e);
                }}
                variant="outlined"
                disabled={OTPSent ? secondsLeft !== 0 : !Boolean(authStore.username.length >= 5)}
              >
                {OTPSent ? (secondsLeft > 0 ? 'OTP Sent. Try again in ' + secondsLeft : 'Resend OTP') : 'Send OTP'}
              </Button>
            )}

            <span className={classes.errMsg}>{authStore.errors ? authStore.errors : ' '}</span>
            {!isStaffMember && (
              <button
                className={classes.loginOtpLink}
                type="button"
                onClick={(e) => {
                  setLoginWithOTP(!loginWithOTP);
                  e.preventDefault();
                }}
              >
                {loginWithOTP ? 'Login with Password' : 'Login with OTP'}
              </button>
            )}
          </div>
          {isStaffMember ? (
            <GoogleLogin
              className={classes.loginButton}
              clientId={Config.GOOGLE_OAUTH_CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              hostedDomain="stayqrious.com"
              loginHint={authStore.username}
              render={(renderProps) => (
                <button
                  className={clsx(classes.loginButton, classes.googleLogin)}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <GoogleIcon /> Login
                </button>
              )}
            />
          ) : (
            <button className={classes.loginButton} type="submit" disabled={authStore.loading}>
              {authStore.loading ? <Loading /> : 'Login'}
            </button>
          )}
        </form>
        <div className={classes.helpText}>
          Facing trouble? Call us on {Config.SUPPORT_PHONE_NUMBER} <br />
          Have no account yet? <Link href={{ pathname: "/register", query: { next: nextUrl } }}>Sign up</Link>
          {/* {{ pathname: , state: { from: fromLocation } }} */}
        </div>
      </section>
    </Layout>
  );
}

export default observer(LoginPage);
