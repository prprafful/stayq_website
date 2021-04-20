import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';

import { useMediaQuery, useTheme, makeStyles } from '@material-ui/core';
import SQDialog from 'components/generics/SQDialog';
import { useStores } from 'hooks/useStores';
import Layout from 'components/generics/Layout';
import AccessTicks from 'components/masterclass/AccessTicks';
// import { Location } from 'history';
import SignUpForm from 'components/register/SignUpForm';
import Image from 'next/image';
// import MinionsInQueuePNG from 'assets/redesign/artwork/MinionsInQueue.png';
// import SessionCard from 'components/SessionCard';
// import { useHistory } from 'react-router';

const useStyles = makeStyles({
    paper: {
        borderRadius: 10,
        userSelect: 'none',
        maxWidth: 'unset',
    },
    container: {
        margin: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: 16,
        color: '#2772b4',
        flexDirection: 'column',
        '@media (min-width: 1024px)': {
            padding: [10, '10%'],
        },
    },
    title: {
        color: '#0a3f6e',
        textAlign: 'center',
        fontSize: '1.5em',
        padding: 10,
    },
    formRow: {
        width: '100%',
        display: 'flex',
        position: 'relative',
        justifyContent: 'flex-end',
        '@media (max-width: 700px)': {
            flexDirection: 'column',
            justifyContent: 'center',
        },
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        flex: 1,
        '@media (max-width: 700px)': {
            width: '100%',
        },
    },
    masterclassListContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
        flex: 1,
        '@media (min-width: 1024px)': {
            width: '50%',
            padding: '5px 30px',
            display: 'flex',
            alignItems: 'center',
        },
    },
    image: {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
        maxHeight: 200,
    },
    masterclassList: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        height: '250px',
        width: '100%',
        alignItems: 'center',
        '@media (min-width: 1024px)': {
            padding: '5px 30px',
        },
    },
    masterclassItem: {
        cursor: 'pointer',
        marginBottom: 10,
        width: '100%',
    },
});

function MasterclassRegisterPage(
    // { location }: { location: Location }
) {
    const {
        signUpStore,
        // masterclassStore,
        userStore
    } = useStores();

    // const { state } = location;
    // const { from: fromLocation } = (state || { from: undefined }) as { from: Location };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [selectedMasterclass, setSelectedMasterclass] = useState<number>(0);
    // const history = useHistory();

    // useEffect(() => {
    //     if (userStore.currentUser) {
    //         history.push(fromLocation || '/');
    //     }
    // }, [userStore.currentUser, history, fromLocation]);

    useEffect(() => {
        // masterclassStore.fetchUpcomingOpenSessions();
    }, []);

    return (
        <Layout
            title="Masterclass Register :: StayQrious"
        >
            <SQDialog
                // fullWidth={true}
                maxWidth={'md'}
                disableBackdropClick
                disableEscapeKeyDown
                open={true}
                classes={{ paper: classes.paper }}
                onClose={() => { }}
                fullScreen={fullScreen}
                >
                <div className={classes.container}>
                    <h1 className={classes.title}>Book your slots for StayQrious Masterclasses</h1>
                    <AccessTicks masterclass certificates member />
                    <div className={classes.formRow}>
                        <div className={classes.masterclassListContainer}>
                            {/* <img className={classes.image} src={MinionsInQueuePNG} alt="" /> */}
                            <Image
                                src={'/img/MinionsInQueue.png'}
                                width={400}
                                className={classes.image}
                                height={400}
                            />
                            <div className={classes.masterclassList}>
                                {/* {masterclassStore.upcomingSessions.map((masterclass, idx) => {
                                    return (
                                        masterclass && (
                                            <div
                                                key={masterclass.name}
                                                className={classes.masterclassItem}
                                                onClick={() => setSelectedMasterclass(idx)}
                                            >
                                                <SessionCard isMasterclass session={masterclass} isSelected={idx === selectedMasterclass} />
                                            </div>
                                        )
                                    );
                                })} */}
                            </div>
                        </div>
                        <div className={classes.formContainer}>
                            <SignUpForm
                                signUpStore={signUpStore}
                                onFormSubmit={() => {
                                    // const session = masterclassStore.upcomingSessions[selectedMasterclass];
                                    // if (session) {
                                    //     masterclassStore.masterclassRegister(session.name).then(() => {
                                    //         userStore.pullUser();
                                    //         window.location.pathname = '/masterclass/' + session.name;
                                    //     });
                                    // } else {
                                    //     window.location.pathname = '/';
                                    // }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </SQDialog>
        </Layout>
    );
};

export default observer(MasterclassRegisterPage);
