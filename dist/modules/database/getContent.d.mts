import { ContentDB } from '../../interfaces/ContentDB.mjs';
declare const getContent: (page: string) => Promise<ContentDB[] | undefined[]>;
export { getContent };
