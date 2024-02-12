/// <reference types="node" resolution-mode="require"/>
import { UUID } from 'crypto';
declare const removeContent: (page: string, id: UUID) => Promise<void>;
export { removeContent };
