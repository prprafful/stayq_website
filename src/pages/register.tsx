import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import Router, { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import { useStores } from 'hooks/useStores';
import Layout from 'components/generics/Layout';
import SignUpForm from 'components/register/SignUpForm';
import Link from 'next/link';

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: '20px',
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
        padding: 10,
        fontSize: 12,
    }
});

const Register = () => {
    const classes = useStyles();
    const router = useRouter();

    const { signUpStore, userStore } = useStores();

    const queryparams = useMemo(() => router.query, [router.query]);

    const nextUrl: any = queryparams['next']; //string | string[] | URL

    useEffect(() => {
        if (userStore.currentUser) {
            router.push('/dashboard/');
        }
        if (signUpStore.signupSuccess) {
            router.push(nextUrl || '/dashboard/');
        }
    }, [userStore.currentUser, signUpStore.signupSuccess, nextUrl]);


    const onFormSubmit = () => {
        userStore.pullUser();
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
                        Already have an account? <Link href={{ pathname: '/login', query: { next: nextUrl } }}>Log in</Link>
                        {/* , state: { from: fromLocation } }} */}
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default observer(Register);
