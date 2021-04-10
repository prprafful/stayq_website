import { Card, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import Layout from "../../components/generics/Layout";

import styles from '../../styles/pages/curriclum.module.scss';
import { getAllCurriculum } from '../api';

function Home({
    meta,
    header,
    courses_outcome,
    curriculums,
    ...props
}) {

    return (
        <Layout
            meta={meta}
        >
            <div className={styles.container}>
                <div
                    className={styles.header}
                    style={{
                        background: header.banner_color || '#4CAFE7',
                    }}
                >
                    <div className={`max-width ${styles.headerWrapper}`}>
                        <div className={styles.leftSection}>
                            <Typography variant="h1" className={styles.title}>{header.title}</Typography>
                            <Typography variant="h5" className={styles.subtitle}>{header.subtitle}</Typography>
                            <Typography variant="h4" className={styles.description}>{header.description}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                className="sbutton"
                            >
                                {header.button}
                            </Button>
                        </div>
                        <div className={styles.rightSection}>
                            <div>
                                <Typography
                                    variant="h6"
                                >
                                    {courses_outcome.title}
                                </Typography>
                                <ul>
                                    {
                                        courses_outcome.outcomes_list.map((item, index) => (
                                            <li key={index}>
                                                {item.title}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {
                        curriculums.map((item, index) => (
                            <Card
                                key={index}
                            >
                                <CardContent>
                                    <Link
                                        href={`/curriculum/${item.slug}/`}
                                    >
                                        {item.slug}
                                    </Link>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const content: any = await import('../../content/curriculum.md');
    const data = matter(content.default);

    const allCurriculum = await getAllCurriculum();

    return {
        props: {
            meta: data.data.meta,
            header: data.data.header,
            courses_outcome: data.data.courses_outcome,
            curriculums: allCurriculum,
        }
    };
}

export default Home;