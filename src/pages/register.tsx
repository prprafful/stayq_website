// function register() {
//   return (
//     <>Register</>
//   )
// }

// export default register;
import { InputAdornment, TextField, Button, Typography, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import Router, { useRouter } from 'next/router';
// import clsx from 'clsx';
// import Loading from 'components/Loading';
// import GraduateCapSVG from 'assets/redesign/icons/graduateCap.svg';
// import LaptopSVG from 'assets/redesign/icons/laptop.svg';
// import mail from 'assets/redesign/icons/mail.svg';
// import MobileSVG from 'assets/redesign/icons/mobile.svg';
// import person from 'assets/redesign/icons/person.svg';
// import SchoolSVG from 'assets/redesign/icons/school.svg';
import React, { useEffect, useMemo, useState } from 'react';
import { ISignUpStore } from '../stores/SignupStore';
import mobilecheck from '../utils/mobilecheck';
import Config from '../config';
// import SignupStore from '../stores/SignupStore';
import { useStores } from '../hooks/useStores';
import SignUpStore from '../stores/SignupStore'
import clsx from 'clsx';
import Layout from '../components/generics/Layout';
import styles from '../styles/pages/register.module.scss';
import SQButton from '../components/generics/SQButton';
import { BlueTextField } from '../components/generics/BlueTextField';
import SignUpForm from '../components/register/SignUpForm';
import SQDialog from '../components/generics/SQDialog';
import OtpPopUp from 'components/register/OtpPopUp';
import { createUseStyles } from 'react-jss';
// import { useStore } from 'stores';

// import { ISignUpStore } from 'store/SignUpStore';
// import Config from 'config';
// import { Location } from 'history';

// const useStyles = createUseStyles({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   formItems: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     margin: 10,
//   },
//   field: { margin: '10px 0px !important' },
//   phoneNumberContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
//   switchField: {
//     display: 'flex',
//     overflow: 'hidden',
//     borderRadius: 4,
//     flexWrap: 'wrap',
//   },
//   switchItem: {
//     backgroundColor: '#e4e4e4',
//     color: 'rgba(0, 0, 0, 0.6)',
//     fontSize: 14,
//     lineHeight: 1,
//     fontWeight: 700,
//     textAlign: 'center',
//     padding: [8, 16],
//     margin: [5, 5, 0, 0],
//     borderRadius: 5,
//     transition: 'all 0.1s ease-in-out',
//     cursor: 'pointer',
//   },
//   switchItemSelected: {
//     backgroundColor: '#FCEBB2',
//     boxShadow: 'none',
//     border: '1px solid #F3A335',
//   },
//   option: {
//     fontSize: 15,
//     '& > span': {
//       marginRight: 10,
//       fontSize: 18,
//     },
//   },
//   formtext: {
//     display: 'flex',
//     color: '#0a3f6e',
//     width: '100%',
//     fontSize: 12,
//     margin: [5, 0],
//     '& h3': {
//       paddingLeft: 10,
//     },
//   },
//   submitButton: {
//     width: 200,
//     height: 40,
//     margin: '10px 0px',
//     fontWeight: 'bold',
//     fontSize: 16,
//     alignSelf: 'center',
//     '@media (min-width: 1024px)': {
//       alignSelf: 'flex-start',
//     },
//   },
//   signinButton: {
//     backgroundColor: '#d3eaff',
//     borderRadius: 10,
//     display: 'inline-block',
//     padding: [4, 8],
//   },
// });


const useStyles = createUseStyles({
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
});


interface RegistrationFormProps {
  // signUpStore: ISignUpStore;
  // onFormSubmit: () => void;
  location: Location;
}

const Register = ({
  // onFormSubmit,
  location
}: RegistrationFormProps) => {
  const classes = useStyles();
  const router = useRouter();
  console.log('as', router);
  // const { state } = location;
  // const { from: fromLocation } = (state || { from: undefined }) as { from: Location };
  const [showOTPForm, setShowOTPForm] = useState(false);

  const { signUpStore, userStore } = useStores();

  // const queryparams = useMemo(() => new URLSearchParams(router.query), [router.query]);

  // const nextUrl = queryparams.get('next');

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


  // useEffect(() => {
  //   const trackingUrlParams = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content', 'gclid'];
  //   const filteredParams = trackingUrlParams.reduce<{ [key: string]: string }>((obj, key) => {
  //     const val = queryparams.get(key);
  //     if (val) {
  //       obj[key] = val;
  //     }
  //     return obj;
  //   }, {});

  //   if (document.referrer) filteredParams['referred_url'] = document.referrer;
  //   if (fromLocation) filteredParams['landing_page'] = fromLocation.pathname;

  //   signUpStore.setExtraInfo(filteredParams);
  // }, [queryparams, fromLocation, signUpStore]);

  return (
    <Layout
      meta={''}
    >

      <div className={styles.container}>
        <SignUpForm
          signUpStore={signUpStore}
          onFormSubmit={onFormSubmit}
        // location={''}
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
      </div>
      <div>
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
    </Layout >
  );
};

export default observer(Register);
