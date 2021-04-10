import { InputAdornment } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import Loading from 'components/Loading';
import SQButton from 'components/SQButton';
import GraduateCapSVG from 'assets/redesign/icons/graduateCap.svg';
import LaptopSVG from 'assets/redesign/icons/laptop.svg';
import mail from 'assets/redesign/icons/mail.svg';
import MobileSVG from 'assets/redesign/icons/mobile.svg';
import person from 'assets/redesign/icons/person.svg';
import SchoolSVG from 'assets/redesign/icons/school.svg';
import React, { useEffect, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { BlueTextField } from 'styledComponents/TextField';
import mobilecheck from 'utils/mobilecheck';
import { ISignUpStore } from 'store/SignUpStore';
import Config from 'config';
import { Location } from 'history';

const useStyles = createUseStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formItems: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 10,
  },
  field: { margin: '10px 0px !important' },
  phoneNumberContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  switchField: {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: 4,
    flexWrap: 'wrap',
  },
  switchItem: {
    backgroundColor: '#e4e4e4',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    lineHeight: 1,
    fontWeight: 700,
    textAlign: 'center',
    padding: [8, 16],
    margin: [5, 5, 0, 0],
    borderRadius: 5,
    transition: 'all 0.1s ease-in-out',
    cursor: 'pointer',
  },
  switchItemSelected: {
    backgroundColor: '#FCEBB2',
    boxShadow: 'none',
    border: '1px solid #F3A335',
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  formtext: {
    display: 'flex',
    color: '#0a3f6e',
    width: '100%',
    fontSize: 12,
    margin: [5, 0],
    '& h3': {
      paddingLeft: 10,
    },
  },
  submitButton: {
    width: 200,
    height: 40,
    margin: '10px 0px',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    '@media (min-width: 1024px)': {
      alignSelf: 'flex-start',
    },
  },
  signinButton: {
    backgroundColor: '#d3eaff',
    borderRadius: 10,
    display: 'inline-block',
    padding: [4, 8],
  },
});

interface RegistrationFormProps {
  signUpStore: ISignUpStore;
  onFormSubmit: () => void;
  location: Location;
}

const SignUpForm = ({ signUpStore, onFormSubmit, location }: RegistrationFormProps) => {
  const classes = useStyles();
  const queryparams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const { state } = location;
  const { from: fromLocation } = (state || { from: undefined }) as { from: Location };

  useEffect(() => {
    if (window.innerWidth > 1024 && !mobilecheck()) {
      // assume laptop??
      signUpStore.setHasLaptop(true);
    }
  }, [signUpStore]);

  useEffect(() => {
    const trackingUrlParams = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content', 'gclid'];
    const filteredParams = trackingUrlParams.reduce<{ [key: string]: string }>((obj, key) => {
      const val = queryparams.get(key);
      if (val) {
        obj[key] = val;
      }
      return obj;
    }, {});

    if (document.referrer) filteredParams['referred_url'] = document.referrer;
    if (fromLocation) filteredParams['landing_page'] = fromLocation.pathname;

    signUpStore.setExtraInfo(filteredParams);
  }, [queryparams, fromLocation, signUpStore]);

  return (
    <div>
      <form
        className={classes.form}
        onSubmit={(event) => {
          event.preventDefault();
          onFormSubmit();
        }}
      >
        <div className={classes.formItems}>
          <BlueTextField
            value={signUpStore.kidName}
            onChange={(e) => signUpStore.setKidName(e.target.value)}
            type="text"
            id="kidName"
            variant="outlined"
            placeholder="Your Name"
            required
            fullWidth
            error={signUpStore.errors.has('kidName')}
            helperText={signUpStore.errors.get('kidName')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={person} alt="" />
                </InputAdornment>
              ),
            }}
            className={classes.field}
          />
          <BlueTextField
            value={signUpStore.parentEmail}
            onChange={(e) => signUpStore.setParentEmail(e.target.value)}
            type="email"
            id="parentEmail"
            variant="outlined"
            placeholder="Parent's Email ID"
            required
            fullWidth
            error={signUpStore.errors.has('parentEmail')}
            helperText={signUpStore.errors.get('parentEmail')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={mail} />
                </InputAdornment>
              ),
            }}
            className={classes.field}
          />
          <div className={classes.phoneNumberContainer}>
            <BlueTextField
              value={signUpStore.countryCode}
              onChange={(e) => {
                const phone = e.target.value.replace(/[^0-9\-+]/gi, '').substr(0, 5);
                signUpStore.setCountryCode(phone);
              }}
              style={{ width: '40%', paddingRight: 10 }}
              type="text"
              id="tel-country-code"
              variant="outlined"
              placeholder="India +(91)"
              fullWidth
            />
            <BlueTextField
              value={signUpStore.phone}
              onChange={(e) => {
                const phone = e.target.value.replace(/[^0-9\-+]/gi, '').substr(0, 10);
                signUpStore.setPhone(phone);
              }}
              type="tel"
              id="phone"
              variant="outlined"
              placeholder="Mobile No"
              required
              fullWidth
              error={signUpStore.errors.has('phone')}
              helperText={signUpStore.errors.get('phone')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={MobileSVG} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <h5 style={{ color: '#2772b4' }}>we will send an OTP on this number to verify your identy</h5>
          <BlueTextField
            value={signUpStore.kidSchool}
            onChange={(e) => signUpStore.setKidSchool(e.target.value)}
            type="text"
            id="kidschool"
            variant="outlined"
            placeholder="School Name"
            required
            fullWidth
            error={signUpStore.errors.has('kidSchool')}
            helperText={signUpStore.errors.get('kidSchool')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SchoolSVG} />
                </InputAdornment>
              ),
            }}
            className={classes.field}
          />
          <div className={classes.formtext}>
            <img src={GraduateCapSVG} />
            <h3>Kid's Grade/Class in School? *</h3>
          </div>
          <div className={classes.switchField}>
            {Config.GRADES.map((grade) => (
              <div
                key={grade}
                className={clsx(classes.switchItem, {
                  [classes.switchItemSelected]: signUpStore.kidGrade === grade,
                })}
                onClick={() => {
                  signUpStore.setKidGrade(grade);
                }}
              >
                {grade}
              </div>
            ))}
            {signUpStore.errors.has('grade') && (
              <div className={classes.formtext} style={{ color: 'red' }}>
                Please select an option
              </div>
            )}
          </div>
          <div className={classes.formtext}>
            <img src={LaptopSVG} />
            <h3>Do you have a laptop/PC at home? *</h3>
          </div>

          <div className={classes.switchField}>
            {[
              { text: 'Yes', value: true },
              { text: 'No', value: false },
            ].map(({ text, value }) => (
              <div
                key={text}
                className={clsx(classes.switchItem, {
                  [classes.switchItemSelected]: signUpStore.hasLaptop === value,
                })}
                onClick={() => {
                  signUpStore.setHasLaptop(value);
                }}
              >
                {text}
              </div>
            ))}
            {signUpStore.errors.has('hasLaptop') && (
              <div className={classes.formtext} style={{ color: 'red' }}>
                Please select an option
              </div>
            )}
          </div>
          <SQButton primary className={classes.submitButton}>
            {signUpStore.loading ? <Loading /> : "Let's Go"}
          </SQButton>
        </div>
      </form>
    </div>
  );
};

export default observer(SignUpForm);
