import { Link } from '@material-ui/core';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import Layout from "../components/generics/Layout";

import styles from '../styles/pages/home.module.scss';
import matter from 'gray-matter';

function Home({
    meta,
    header,
    features,
    ...props
}) {
    const router = useRouter();

    return (
        <Layout
            meta={meta}
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.textSection}>
                        <Typography variant="h1" className={styles.title}>{header.title}</Typography>
                        <Typography variant="h4" className={styles.description}>{header.description}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className="pbutton"
                            onClick={() => router.push('/curriculum/')} // will be made as a link later
                        >
                            {header.button}
                        </Button>
                    </div>
                    <div className={styles.banner}>
                        <Image
                            className={styles.bannerImage}
                            src={header.banner_img}
                            height={500}
                            width={800}
                        />
                    </div>
                </div>

                <div className={styles.features}>
                    <Typography variant="h1" className={styles.title}>{features.title}</Typography>
                    <div className={styles.featureList}>
                        {
                            features.feature_list.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.featureItem}
                                >
                                    <Image
                                        src={item.image}
                                        height={200}
                                        width={200}
                                    />

                                    <Typography variant="h6">
                                        {item.title}
                                    </Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const content: any = await import('../content/home.md'); // add type
    const data = matter(content.default);

    return {
        props: {
            meta: data.data.meta,
            header: data.data.header,
            features: data.data.features,
        }
    };
}

export default Home;