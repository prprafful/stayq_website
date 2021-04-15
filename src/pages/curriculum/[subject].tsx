import matter from "gray-matter";
import Layout from "../../components/generics/Layout";
import { getACurriculum, getAllCurriculum } from '../api/index';
import styles from '../../styles/pages/subject.module.scss';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from "react-markdown";

function SubjectTemplate({
    meta,
    header,
    rest,
    ...props
}) {
    return (
        <Layout
            meta={meta}
        >
            <div className="container">
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
                            {/* <Typography variant="h4" className={styles.description}>{header.description}</Typography> */}
                            <ReactMarkdown
                                source={header.description}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className="sbutton"
                            >
                                {header.button}
                            </Button>
                        </div>
                        <div className={styles.rightSection}>
                            {/* <div>
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default SubjectTemplate;

export async function getStaticProps(context) {
    const content: any = await getACurriculum(context.params.subject);
    const data: any = content.data;

    return {
        props: {
            header: data.header,
            meta: data.meta,
        },
    }
}

export async function getStaticPaths() {
    let paths: any = await getAllCurriculum();
    paths = paths.map((subject: { slug: string }) => ({
        params: { subject: subject.slug }
    }));

    return {
        paths: paths,
        fallback: false,
    }
}