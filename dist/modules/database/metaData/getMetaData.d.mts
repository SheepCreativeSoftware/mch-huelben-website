import { MetaDataDB } from '../../../interfaces/Database.mjs';
declare const getMetaData: (page: string) => Promise<MetaDataDB | undefined>;
declare const getMetaDataId: (page: string) => Promise<`${string}-${string}-${string}-${string}-${string}` | null>;
export { getMetaData, getMetaDataId };
