import { createUseStyles } from 'react-jss';

import GreenTickSVG from 'assets/redesign/GreenTick.svg';
import RedBGCrossSVG from 'assets/redesign/icons/redBgCross.svg';

const useStyles = createUseStyles({
  accessContainer: {
    padding: '10px',
    backgroundColor: '#fff2dc',
    color: '#f77c00',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  accessItems: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    margin: '10px',
    '& span': {
      padding: '0 10px',
    },
    '@media (max-width: 700px)': {
      flexDirection: 'column',
      width: 'fit-content',
    },
    '& div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  textPrimary: {
    color: '#0a3f6e',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

interface IAccessTicksProps {
  masterclass?: boolean;
  certificates?: boolean;
  member?: boolean;
}

function AccessTicks({ masterclass = false, certificates = false, member = false }: IAccessTicksProps) {
  const classes = useStyles();
  return (
    <div className={classes.accessContainer}>
      <div className={classes.textPrimary}>You will get access to</div>
      <div className={classes.accessItems}>
        <div>
          {masterclass ? <GreenTickSVG /> : <RedBGCrossSVG />}
          <span>All masterclasses</span>
        </div>
        <div>
          {certificates ? <GreenTickSVG /> : <RedBGCrossSVG />}
          <span>Certificates</span>
        </div>
        <div>
          {member ? <GreenTickSVG /> : <RedBGCrossSVG />}
          <span>Member-only features</span>
        </div>
      </div>
    </div>
  );
}

export default AccessTicks;
