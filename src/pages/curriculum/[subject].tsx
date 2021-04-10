import matter from "gray-matter";
import Layout from "../../components/generics/Layout";
import { getACurriculum, getAllCurriculum } from '../api/index'


function SubjectTemplate({
    header,
    ...props
}) {
    console.log('--<', props)
    return (
        <Layout
            meta={"Subject"}
        >
            <div className="container">
                
            </div>
        </Layout >
    )
}

export default SubjectTemplate;

export async function getStaticProps(context) {
    const content: any = await getACurriculum(context.params.subject);
    console.log('context', content);
    const data: any = matter(content.default);

    return {
        props: {
            header: data.header,
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