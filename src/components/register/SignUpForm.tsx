import { useEffect, useMemo, useState } from "react";
import { FormHelperText, InputAdornment, Typography } from "@material-ui/core";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { withCookies } from "react-cookie";
import PhoneInput from 'react-phone-input-2';
import { createUseStyles } from "react-jss";
import { BlueTextField } from "components/generics/BlueTextField";
import 'react-phone-input-2/lib/style.css';

import Config from 'config';
import SQButton from "components/generics/SQButton";
import GraduateCapSVG from 'assets/redesign/icons/graduateCap.svg';
import LaptopSVG from 'assets/redesign/icons/laptop.svg';
import Mail from 'assets/redesign/icons/mail.svg';
import MobileSVG from 'assets/redesign/icons/mobile.svg';
import Person from 'assets/redesign/icons/person.svg';
import SchoolSVG from 'assets/redesign/icons/school.svg';
import mobilecheck from "utils/mobilecheck";
import { ISignUpStore } from "stores/SignupStore";
import OtpPopUp from "./OtpPopUp";
import SQDialog from "components/generics/SQDialog";

interface RegistrationFormProps {
    signUpStore: ISignUpStore;
    onFormSubmit: () => void;
    // location?: Location;
    allCookies: { key: string }
}


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
        border: '1px solid #e4e4e4',
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
    label: {
        fontSize: '16px!important',
        marginLeft: '10px !important',
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
    phoneInput: {
        padding: 24,
        width: '100% !important',
        background: 'transparent !important',
        border: '1px !important',
    },
    phoneContainer: {
        margin: [10, 0],
        border: '1px solid #319CE5 !important',
        borderRadius: '5px',
    },
    phoneError: {
        margin: [10, 0],
        border: '1px solid red !important',
        borderRadius: '5px',
    },
});


function SignUpForm({
    signUpStore,
    onFormSubmit,
    // location
    allCookies,
    ...props
}: RegistrationFormProps) {
    const router = useRouter();
    const classes = useStyles();
    const [showOTPForm, setShowOTPForm] = useState(false);
    // const [cookie, setCookie] = useCookies();
    const queryparams = useMemo(() => router.query, [router.query]);
    // const { state } = location;
    // const { from: fromLocation } = (state || { from: undefined }) as { from: Location };
    const cookies = allCookies;
    useEffect(() => {
        if (window.innerWidth > 1024 && !mobilecheck()) {
            // assume laptop??
            signUpStore.setHasLaptop(true);
        }
    }, [signUpStore]);

    useEffect(() => {
        const trackingUrlParams = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content', 'gclid'];
        const filteredParams = trackingUrlParams.reduce<{ [key: string]: string }>((obj: any, key) => {
            const val = cookies[key] || queryparams[key];
            if (val) {
                obj[key] = val;
            }
            return obj;
        }, {});

        if (document.referrer) filteredParams['referred_url'] = document.referrer;
        // if (fromLocation) filteredParams['landing_page'] = fromLocation.pathname;
        console.log('filteredParams', filteredParams);

        signUpStore.setExtraInfo(filteredParams);
    }, [queryparams, cookies,/* fromLocation,*/ signUpStore]);

    console.log(SchoolSVG);


    return (
        <>


            {showOTPForm && (
                <SQDialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={true}
                    onClose={() => { }}
                >
                    <OtpPopUp
                        signUpStore={signUpStore}
                        phoneNumber={signUpStore.phone}
                        onEditNumber={() => {
                            setShowOTPForm(false);
                        }}
                        onSubmit={() =>
                            signUpStore.signup().then(() => {
                                if (signUpStore.errors.size === 0) {
                                    onFormSubmit();
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
            <form
                className={classes.form}
                onSubmit={(event) => {
                    event.preventDefault();
                    signUpStore.validate();
                    if (signUpStore.errors.size === 0) {
                        signUpStore.postOtp().then(() => {
                            if (signUpStore.errors.has('otp') || signUpStore.errors.size === 0) {
                                setShowOTPForm(true);
                            }
                        });
                    }
                }}
            >
                <div
                    className={classes.formItems}
                >
                    <BlueTextField
                        className={classes.field}
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
                                    <Person />
                                </InputAdornment>
                            ),
                        }}
                    // className={classes.field}
                    />
                    <BlueTextField
                        className={classes.field}
                        value={signUpStore.parentEmail}
                        onChange={(e) => signUpStore.setParentEmail(e.target.value)}
                        inputProps={{ pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$' }}
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
                                    <Mail />
                                </InputAdornment>
                            ),
                        }}
                    // className={classes.field}
                    />
                    <PhoneInput
                        placeholder="Mobile No"
                        inputClass={classes.phoneInput}
                        containerClass={signUpStore.errors.has('phone') ? classes.phoneError : classes.phoneContainer}
                        country={'in'}
                        preferredCountries={['in']}
                        onChange={(phone: string) => signUpStore.setPhone(phone)}
                        value={signUpStore.phone}
                        inputProps={{ required: true }}
                        autoFormat={false}
                    />
                    <Typography
                        variant="h6"
                        style={{
                            color: '#2772b4',
                            fontSize: '10px',
                        }}
                    >
                        we will send an OTP on this number to verify your identy
                    </Typography>
                    {signUpStore.errors.has('phone') && (
                        <FormHelperText error>
                            {signUpStore.errors.get('phone')}
                            {'     '}
                            {(signUpStore.errors.get('phone') || '').toString().search('exist') >= 0 && (
                                <></>
                                // <Link to={{ pathname: '/login', state: { from: fromLocation, phone: signUpStore.phone } }}>Login?</Link>
                            )}
                        </FormHelperText>
                    )}
                    <BlueTextField
                        className={classes.field}
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
                                    <SchoolSVG />
                                </InputAdornment>
                            ),
                        }}
                    // className={classes.field}
                    />
                    <div
                        className={classes.formtext}
                    >
                        <GraduateCapSVG />
                        <Typography
                            variant="h5"
                            className={classes.label}
                        >
                            Kid's Grade/Class in School? *
                        </Typography>
                    </div>
                    <div
                        className={classes.switchField}
                    >
                        {Config.GRADES.map((grade) => (
                            <div
                                key={grade}
                                className={clsx(classes.switchItem, { [classes.switchItemSelected]: signUpStore.kidGrade === grade })}
                                onClick={() => {
                                    signUpStore.setKidGrade(grade);
                                }}
                            >
                                {grade}
                            </div>
                        ))}
                        {signUpStore.errors.has('grade') && (
                            <div
                                className={classes.formtext}
                                style={{ color: 'red' }}
                            >
                                Please select an option
                            </div>
                        )}
                    </div>
                    <div
                        className={classes.formtext}
                    >
                        <LaptopSVG />
                        <Typography
                            variant="h6"
                            className={classes.label}
                        >
                            Do you have a laptop/PC at home? *
                        </Typography>
                    </div>

                    <div
                        className={classes.switchField}
                    >
                        {[
                            { text: 'Yes', value: true },
                            { text: 'No', value: false },
                        ].map(({ text, value }) => (
                            <div
                                key={text}
                                className={clsx(classes.switchItem, { [classes.switchItemSelected]: signUpStore.hasLaptop === value })}
                                //   [classes.switchItemSelected]: signUpStore.hasLaptop === value,
                                // })}
                                onClick={() => {
                                    signUpStore.setHasLaptop(value);
                                }}
                            >
                                {text}
                            </div>
                        ))}
                        {signUpStore.errors.has('hasLaptop') && (
                            <div
                                className={classes.formtext}
                                style={{ color: 'red' }}
                            >
                                Please select an option
                            </div>
                        )}
                    </div>
                    <SQButton
                        primary
                        className={classes.submitButton}
                    // type="submit"
                    >
                        {signUpStore.loading ? "Loading" : "Let's Go"}
                    </SQButton>
                </div>
            </form>
        </>
    )
}

export default withCookies(observer(SignUpForm));