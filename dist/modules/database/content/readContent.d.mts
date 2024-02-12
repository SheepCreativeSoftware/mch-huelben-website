import { ContentDB } from '../../../interfaces/Database.mjs';
declare const getContent: (page: string) => Promise<undefined[] | ContentDB[]>;
declare const getContentNews: (limit?: number, offset?: number) => Promise<ContentDB[] | undefined[]>;
export { getContent, getContentNews };
