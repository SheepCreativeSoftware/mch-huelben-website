import { ContentType } from './ContentType.mjs';
type GroupContent = {
    [key in ContentType]?: {
        content: string;
        description: string;
        created: string;
        updated: string;
    }[];
};
export { GroupContent };
