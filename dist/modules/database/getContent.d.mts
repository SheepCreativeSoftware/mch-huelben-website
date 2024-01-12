/// <reference types="node" resolution-mode="require"/>
import { ContentDB } from '../../interfaces/ContentDB.mjs';
import { ContentType } from '../../types/ContentType.mjs';
import { UUID } from 'crypto';
declare const getContent: (page: string) => Promise<ContentDB[] | undefined[]>;
declare const getContentNews: (limit?: number, offset?: number) => Promise<ContentDB[] | undefined[]>;
declare const setContent: (page: string, type: ContentType, content: string, id: UUID | 'none') => Promise<void>;
export { getContent, getContentNews, setContent };
