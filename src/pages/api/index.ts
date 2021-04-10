import matter from "gray-matter";

export async function getAllCurriculum() {
    const context = require.context('../../content/curriculums', false, /\.md$/);
    const curriculums = [];
    for (const key of context.keys()) {
        const curriculum = key.slice(2);
        const content = await import(`../../content/curriculums/${curriculum}`);
        const metaData = matter(content.default);
        curriculums.push({
            slug: curriculum.replace('.md', ''),
        })
    }
    return curriculums;
}

export async function getACurriculum(slug: string) {
    const fileContent = await import (`../../content/curriculums/${slug}.md`);
    const data = matter(fileContent.default);
    return data;
}