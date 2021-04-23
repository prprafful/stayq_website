import { makeStyles } from '@material-ui/core';
import { format } from 'fecha';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ISession } from 'stores/Session';
import DefaultSessionSVG from 'assets/redesign/icons/DefaultSession.svg';
import Image from 'next/image';

const useStyles = makeStyles({
  ribbon: {
    clipPath: 'polygon(100% 0%, calc(100% - 0.75rem) 50%, 100% 100%, 0 100%, 0% 50%, 0 0)',
    backgroundImage: 'linear-gradient(90deg, #ff223e 24%, #b5182c 96%)',
    color: 'white',
    position: 'absolute',
    top: 15,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2em',
    padding: '5px 15px',
    '@media (max-width: 700px)': {
      fontSize: '0.8rem',
    },
  },
  outerContainer: {
    backgroundImage: 'linear-gradient(to right, #00f99f 0%, #00d8fc 100%)',
    padding: 5,
    borderRadius: 12,
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#eaf8ff',
    borderRadius: 12,
    justifyContent: 'center',
  },
  sprintImageContainer: {
    margin: '10px',
    height: 100,
    width: 'max-content',
  },
  sprintImage: {
    height: '100%',
    objectFit: 'contain',
  },
  sessionDetails: {
    padding: '10px',
    color: '#000000',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    fontfamily: 'Quicksand',
    textAlign: 'left',
  },
  sessionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontfamily: 'Quicksand',
    textAlign: 'left',
    '@media (max-width: 700px)': {
      fontSize: '0.8rem',
    },
  },
  sessionTime: {
    fontWeight: 600,
    fontSize: '1rem',
    fontfamily: 'Quicksand',
    textAlign: 'left',
    '@media (max-width: 700px)': {
      fontSize: '0.6rem',
    },
  },
  sessionDescription: {
    fontfamily: 'Quicksand',
    textAlign: 'left',
    fontSize: '0.8rem',
    color: '#606060',
  },
});

interface SessionCardProps {
  session: ISession;
  isMasterclass?: boolean;
  isSelected?: boolean;
}

function SessionCard({ session, isMasterclass = false, isSelected = false }: SessionCardProps) {
  const { sprint } = session;
  const classes = useStyles();
  const startTime = session.startAtDate;

  return (
    <div className={isSelected ? classes.outerContainer : undefined}>
      {isSelected && isMasterclass && <div className={classes.ribbon}>Masterclass</div>}
      <div className={classes.container}>
        {isSelected && (
          <div className={classes.sprintImageContainer}>
            {/* <img className={classes.sprintImage} src={sprint.image_url ? sprint.image_url : DefaultSessionSVG} /> */}
            <div
              className={classes.sprintImage}
            >
              {/* <img src={DefaultSessionSVG}/> */}
              <DefaultSessionSVG
              />
            </div>
          </div>
        )}
        <div className={classes.sessionDetails}>
          <div className={classes.sessionTitle}>{sprint.title}</div>
          {startTime !== null && <div className={classes.sessionTime}>{format(startTime, 'MMM Do, h:mm A')}</div>}
          <div className={classes.sessionDescription}>{sprint.description}</div>
        </div>
      </div>
    </div>
  );
}

export default observer(SessionCard);
