import { MetaDataDB } from '../../interfaces/MetaDataDB.mjs';
declare const getMetaData: (page: string) => Promise<MetaDataDB | undefined>;
declare const setMetaData: ({ metaData, page }: {
    metaData: MetaDataDB;
    page: string;
}) => Promise<void>;
export { getMetaData, setMetaData };
