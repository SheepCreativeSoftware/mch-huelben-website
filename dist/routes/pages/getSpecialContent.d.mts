import { ContentDB } from '../../interfaces/ContentDB.mjs';
declare const getSpecialContent: (content: undefined[] | ContentDB[]) => Promise<ContentDB[] | undefined[]>;
export { getSpecialContent };