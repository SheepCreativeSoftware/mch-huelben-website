/// <reference types="node" resolution-mode="require"/>
import { ContentType } from '../../../types/ContentType.mjs';
import { UUID } from 'crypto';
declare const setContent: (page: string, type: ContentType, content: string, id: UUID) => Promise<void>;
export { setContent };
