import { InputAdornment, Typography } from "@material-ui/core";
import clsx from "clsx";
import styles from "styles/pages/register.module.scss";
import SQButton from "components/generics/SQButton";
import Config from 'config';
import { useStores } from "hooks/useStores";
import { observer } from "mobx-react-lite";

import GraduateCapSVG from 'assets/redesign/icons/graduateCap.svg';
import LaptopSVG from 'assets/redesign/icons/laptop.svg';
import mail from 'assets/redesign/icons/mail.svg';
import MobileSVG from 'assets/redesign/icons/mobile.svg';
import person from 'assets/redesign/icons/person.svg';
import SchoolSVG from 'assets/redesign/icons/school.svg';
import { useEffect, useMemo } from "react";
import mobilecheck from "utils/mobilecheck";
import { ISignUpStore } from "stores/SignupStore";
import { BlueTextField } from "components/generics/BlueTextField";
import { useRouter } from "next/router";

interface RegistrationFormProps {
    signUpStore: ISignUpStore;
    onFormSubmit: () => void;
    // location?: Location;
}

function SignUpForm({
    signUpStore,
    onFormSubmit,
    // location
}: RegistrationFormProps) {
    const router = useRouter();
    const queryparams = useMemo(() => router.query, [router.query]);
    // const { state } = location;
    // const { from: fromLocation } = (state || { from: undefined }) as { from: Location };

    useEffect(() => {
        if (window.innerWidth > 1024 && !mobilecheck()) {
            // assume laptop??
            signUpStore.setHasLaptop(true);
        }
    }, [signUpStore]);

    useEffect(() => {
        const trackingUrlParams = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content', 'gclid'];
        const filteredParams = trackingUrlParams.reduce<{ [key: string]: string }>((obj: any, key) => {
            const val = queryparams[key];
            if (val) {
                obj[key] = val;
            }
            return obj;
        }, {});

        if (document.referrer) filteredParams['referred_url'] = document.referrer;
        // if (fromLocation) filteredParams['landing_page'] = fromLocation.pathname;

        signUpStore.setExtraInfo(filteredParams);
    }, [queryparams,/* fromLocation,*/ signUpStore]);

    return (
        <>
            <form
                className={styles.form}
                onSubmit={(event) => {
                    event.preventDefault();
                    signUpStore.validate();
                    if (signUpStore.errors.size === 0) onFormSubmit();
                }}
            >
                <div
                    className={styles.formItems}
                >
                    <BlueTextField
                        className={styles.field}
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
                    // className={styles.field}
                    />
                    <BlueTextField
                        className={styles.field}
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
                    // className={styles.field}
                    />
                    <div
                        className={styles.phoneNumberContainer}
                    >
                        <BlueTextField
                            className={styles.field}
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
                            className={styles.field}
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
                    <Typography
                        variant="h6"
                        style={{
                            color: '#2772b4',
                            fontSize: '10px',
                        }}
                    >
                        we will send an OTP on this number to verify your identy
                    </Typography>
                    <BlueTextField
                        className={styles.field}
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
                    // className={styles.field}
                    />
                    <div
                        className={styles.formtext}
                    >
                        <img src={GraduateCapSVG} />
                        <Typography
                            variant="h5"
                            style={{
                                fontSize: '16px'
                            }}
                        >
                            Kid's Grade/Class in School? *
                        </Typography>
                    </div>
                    <div
                        className={styles.switchField}
                    >
                        {Config.GRADES.map((grade) => (
                            <div
                                key={grade}
                                className={clsx(styles.switchItem, { [styles.switchItemSelected]: signUpStore.kidGrade === grade })}
                                onClick={() => {
                                    signUpStore.setKidGrade(grade);
                                }}
                            >
                                {grade}
                            </div>
                        ))}
                        {signUpStore.errors.has('grade') && (
                            <div
                                className={styles.formtext}
                                style={{ color: 'red' }}
                            >
                                Please select an option
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.formtext}
                    >
                        <img src={LaptopSVG} />
                        <Typography variant="h6" style={{ fontSize: '16px' }}>Do you have a laptop/PC at home? *</Typography>
                    </div>

                    <div
                        className={styles.switchField}
                    >
                        {[
                            { text: 'Yes', value: true },
                            { text: 'No', value: false },
                        ].map(({ text, value }) => (
                            <div
                                key={text}
                                className={clsx(styles.switchItem, { [styles.switchItemSelected]: signUpStore.hasLaptop === value })}
                                //   [styles.switchItemSelected]: signUpStore.hasLaptop === value,
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
                                className={styles.formtext}
                                style={{ color: 'red' }}
                            >
                                Please select an option
                            </div>
                        )}
                    </div>
                    <SQButton
                        primary
                        className={styles.submitButton}
                    // type="submit"
                    >
                        {signUpStore.loading ? "Loading" : "Let's Go"}
                    </SQButton>
                </div>
            </form>
        </>
    )
}

export default observer(SignUpForm);