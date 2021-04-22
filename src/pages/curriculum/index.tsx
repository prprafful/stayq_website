import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import Layout from "../../components/generics/Layout";

import styles from '../../styles/pages/curriclum.module.scss';
import { getAllCurriculum } from '../api';
import { Grid } from '@material-ui/core';

function Home({
    meta,
    header,
    courses_outcome,
    curriculums,
    learning_approach,
    ...props
}) {
    console.log('learning_approach', learning_approach)
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
                <div className={styles.learningApproachContainer}>
                    <div className="max-width">
                        <div className={styles.section}>
                            <Typography className={styles.title} variant="h2">{learning_approach.title}</Typography>
                            <div className={styles.approachesContainer}>
                                {
                                    learning_approach.approaches.map((item, index) => (
                                        <div
                                            key={index}
                                            className={styles.approachesItem}
                                        >
                                            <img
                                                src={item.image}
                                                alt="learning_approach"
                                            />
                                            <Typography className={styles.title} variant="h3">{item.title}</Typography>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.curriculamContainer}>
                    <div className="max-width">
                        <Grid container>
                            {
                                curriculums.map((item, index) => (
                                    <Grid xs={2} key={index}>
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
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
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
            curriculums: allCurriculum,
            header: data.data.header,
            courses_outcome: data.data.courses_outcome,
            learning_approach: data.data.learning_approach,
        }
    };
}

export default Home;