import { getContent } from '../../modules/database/getContent.mjs';
const getStartPage = async (page) => {
    const content = await getContent(page);
};
const getNewsPage = async (page) => {
};
const getAboutClubPage = async (page) => {
};
const getGalleryPage = async (page) => {
};
const getContactPage = async (page) => {
};
const getSingleContentPage = async (page) => {
};
const getPageContent = (page) => {
    switch (page) {
        case 'start':
        case 'links':
            return getStartPage(page);
        case 'news':
            return getNewsPage(page);
        case 'about':
        case 'club':
            return getAboutClubPage(page);
        case 'gallery':
            return getGalleryPage(page);
        case 'contact':
            return getContactPage(page);
        case 'impressum':
        case 'datenschutz':
            return getSingleContentPage(page);
        default:
            throw new Error('Unknown Page');
    }
};
export { getPageContent };
