import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { ISignUpStore } from '../../stores/SignupStore';
import OTPInput from '../styledComponents/OTPInput';
import edit from '../../assets/redesign/icons/edit.svg';
import SQButton from 'components/generics/SQButton';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 16,
    color: '#2772b4',
    margin: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 950px)': {
      width: '100%',
      padding: 15,
      margin: 0,
    },
  },
  message: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  number: {
    color: '#f0a355',
  },
  otpContainer: {
    margin: '5% auto',
    display: 'flex',
    '@media (max-width: 700px)': {
      margin: '5px',
    },
  },
  otpInput: {
    width: '4rem !important',
    height: '4rem',
    margin: '0 1rem',
    fontSize: '2rem',
    textAlign: 'center',
    borderRadius: 4,
    border: 'none',
    color: '#F0A307',
    backgroundColor: '#e8e8e8',
    '@media (max-width: 700px)': {
      margin: '5px',
    },
  },
  submitButton: {
    width: '10rem',
    height: 35,
    fontSize: 16,
    fontWeight: 'bold',
    margin: 15,
    '@media (max-width: 700px)': {
      margin: '10px',
      width: '7rem',
      fontSize: 12,
    },
  },
  skipButton: {
    fontWeight: 'bold',
    cursor: 'pointer'
  },
});

interface OtpPopUpProps {
  signUpStore: ISignUpStore;
  phoneNumber: string;
  onEditNumber: () => void;
  onSkipOtp: () => void;
  onSubmit: () => void;
}

const OtpPopUp = ({ phoneNumber, onEditNumber, onSkipOtp, onSubmit, signUpStore }: OtpPopUpProps) => {
  const [OTPSent, setOTPSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(-1);

  useEffect(() => {
    if (secondsLeft > 0) {
      const iid = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(iid);
    }
  }, [secondsLeft]);

  function handleSendOTP(e: any) {
    signUpStore.postOtp().then((response) => {
      if (response && response.status === 201) {
        setOTPSent(true);
        setSecondsLeft(response.data.retry_in);
      } else if (response && response.status === 208) {
        setOTPSent(true);
        setSecondsLeft(response.data.retry_in);
        signUpStore.setErrors({ otp: [response.data.message] });
      } else if (response && response.status === 403) {
        signUpStore.setErrors({ otp: ['Phone number not registered'] });
      } else {
        signUpStore.setErrors({ otp: ['Oops! We messed up something!!'] });
      }
    });
  }

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.message}>
        <p>
          Please enter the otp sent to{' '}
          <span className={classes.number} onClick={() => onEditNumber()}>
            {phoneNumber} <img src={edit} alt="" />
          </span>{' '}
          to verify your identity and access exclusive member-only features
        </p>
      </div>
      <OTPInput
        autoFocus
        isNumberInput
        length={4}
        className={classes.otpContainer}
        inputClassName={classes.otpInput}
        onChangeOTP={(otp) => (signUpStore.setOtp(otp), console.log(otp))}
      />
      {signUpStore.errors.has('otp') && <span style={{ color: 'red' }}>{signUpStore.errors.get('otp')}</span>}
      <div>
        <SQButton
          onClick={(e) => {
            handleSendOTP(e);
          }}
          disabled={OTPSent && secondsLeft !== 0}
          className={classes.submitButton}
        >
          Resend OTP
        </SQButton>
        <SQButton className={classes.submitButton} primary disabled={signUpStore.otp.length < 4} onClick={onSubmit}>
          Submit
        </SQButton>
      </div>
      <div className={classes.skipButton} onClick={onSkipOtp}>
        Skip For Now
      </div>
    </div>
  );
};

export default observer(OtpPopUp);
