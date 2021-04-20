import Link from 'next/link';
import { Button } from '@material-ui/core';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import MenuIcon from '@material-ui/icons/Menu';
// import Image from 'next/image';
import styles from '../../styles/components/header.module.scss';

function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <div className={styles.brand}>
                    <Link
                        href="/"
                    >
                        <img
                            src={'https://res.cloudinary.com/dttau3gcw/image/upload/v1618557162/image_p3dnha.png'}
                            className={`img ${styles.brandImg}`}
                            height={50}
                            width={250}
                        />
                    </Link>
                </div>

                <div className={styles.menuList}>
                    <div className={styles.menuItem}>
                        <Link
                            href="/curriculum"
                        >
                            Curriculum
                        </Link>
                    </div>
                    <Link
                        href="/register/"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            className="sbutton"
                        >
                            Start free trial
                        </Button>
                    </Link>
                </div>


                <div className={styles.mobileMenuList}>
                    <div className={styles.contact}>
                        <PhoneCallbackIcon />
                        <div className={styles.contactNo}>
                            9773600599
                        </div>

                    </div>
                    <MenuIcon />

                </div>

            </div>
        </div>
    )
}

export default Header;