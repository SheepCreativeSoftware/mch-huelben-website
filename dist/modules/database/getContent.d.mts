/// <reference types="node" resolution-mode="require"/>
import { ContentDB } from '../../interfaces/ContentDB.mjs';
import { ContentType } from '../../types/ContentType.mjs';
import { UUID } from 'crypto';
declare const getContent: (page: string) => Promise<ContentDB[] | undefined[]>;
declare const getContentNews: (limit?: number, offset?: number) => Promise<ContentDB[] | undefined[]>;
declare const setContent: (page: string, type: ContentType, content: string, id: UUID) => Promise<void>;
declare const addContent: (page: string, type: ContentType, content?: string) => Promise<void>;
declare const removeContent: (page: string, id: UUID) => Promise<void>;
export { addContent, getContent, getContentNews, removeContent, setContent };
