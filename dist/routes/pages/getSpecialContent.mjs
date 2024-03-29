import { getContentNews } from '../../modules/database/content/readContent.mjs';
const firstElement = 0;
const onlyOne = 1;
const zero = 0;
const maxString = 200;
const getSpecialContent = async (content) => {
    for (const singleRow of content) {
        if (typeof singleRow === 'undefined')
            continue;
        if (singleRow.type === 'news-preview') {
            const news = await getContentNews(onlyOne);
            if (typeof news[firstElement] === 'undefined') {
                singleRow.content = '';
            }
            else {
                singleRow.content = news[firstElement].content.substring(zero, maxString);
                singleRow.created = news[firstElement].created;
                singleRow.updated = news[firstElement].updated;
            }
        }
    }
    return content;
};
export { getSpecialContent };
