import { MetaDataDB } from '../../../interfaces/Database.mjs';
declare const setMetaData: ({ metaData, page }: {
    metaData: MetaDataDB;
    page: string;
}) => Promise<void>;
export { setMetaData };
