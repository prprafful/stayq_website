import React, { useEffect, useRef } from 'react';

import clsx from 'clsx';
import styles from '../../styles/components/sqbutton.module.scss';

// const useStyles = createUseStyles({
//   buttonDefault: {
//     borderRadius: 38,
//     userSelect: 'none',
//     //background: 'linear-gradient(180deg, #DAD9F2 0%, #B4B2E6 100%)',
//     background: 'transparent linear-gradient(90deg, #72E1F3 0%, #F8D299 100%) 0% 0% no-repeat padding-box',
//     border: 0,
//     outline: 0,
//     cursor: 'pointer',
//     fontSize: '0.75rem',
//     fontWeight: 'bold',
//     position: 'relative',
//     padding: '0.25rem 1rem',
//     color: 'inherit',
//     '& .material-icons': {
//       fontSize: 'inherit !important',
//       verticalAlign: 'middle',
//     },
//     boxShadow: '2px 4px 4px #00000047',
//   },
//   buttonPrimary: {
//     //background: 'linear-gradient(180deg, #3D39AC 0%, #292673 100%)',
//     background: 'transparent linear-gradient(90deg, #F8D224 0%, #E151AB 100%) 0% 0% no-repeat padding-box',
//   },
//   buttonLarge: {
//     fontSize: '1rem',
//     padding: '0.5rem 2rem',
//   },
//   buttonDisabled: {
//     cursor: 'default',
//     background: 'linear-gradient(180deg, rgba(64,64,64,0.6) 0%, rgb(102,102,102,0.6) 100%)',
//     color: 'white',
//     boxShadow: 'none',
//   },
//   progress: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '100%',
//     width: '100%',
//   },
//   progressInner: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '100%',
//     background: 'rgba(255,255,255,0.5)',
//     transition: 'width 4s linear',
//     width: '0%',
//   },
// });

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  large?: boolean;
  disabled?: boolean;
  autoClick?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  autoClickEnable?: boolean;
}

const SQButton = ({
  children,
  className,
  primary = false,
  large = false,
  disabled = false,
  autoClick = false,
  autoClickEnable = false,
  onClick = () => { },
  ...props
}: IButtonProps) => {
  // const classes = useStyles();
  const onClickRef = useRef(onClick);

  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  useEffect(() => {
    if (autoClick === false) return;

    const iid = window.setTimeout(() => {
      onClickRef.current();
    }, 4 * 1000);

    return () => {
      clearTimeout(iid);
    };
  }, [autoClick]);

  return (
    <button
      className={clsx(
        styles.buttonDefault,
        {
          [styles.buttonPrimary]: primary,
          [styles.buttonLarge]: large,
          [styles.buttonDisabled]: disabled,
        },
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <span>{children}</span>
      {autoClickEnable && (
        <span className={styles.progress}>
          <span className={styles.progressInner} style={{ width: autoClick ? '100%' : '0%' }}></span>
        </span>
      )}
    </button>
  );
};

export default SQButton;
