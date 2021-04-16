import Link from 'next/link';
import { Button } from '@material-ui/core';
// import Image from 'next/image';
import styles from '../../styles/components/header.module.scss';

function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <div>
                    {/* <Link
                        href="/"
                    >
                        <Image
                            src={'https://res.cloudinary.com/dttau3gcw/image/upload/v1618557162/image_p3dnha.png'}
                            height={50}
                            width={250}
                        />
                    </Link> */}

                    <Link
                        href="/"
                    >
                        <img
                            src={'https://res.cloudinary.com/dttau3gcw/image/upload/v1618557162/image_p3dnha.png'}
                            className="img"
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
                    <Button
                        variant="contained"
                        color="primary"
                        className="sbutton"
                    >
                        Start free trial
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Header;