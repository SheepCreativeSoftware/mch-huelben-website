import { ContentDB } from '../Database.mjs';
import { RendererTemplate } from '../RendererTemplate.mjs';
interface PagesTemplate extends RendererTemplate {
    content: ContentDB[] | undefined[];
    currentUrl: string;
    dateOptions: Intl.DateTimeFormatOptions;
    newsContent: ContentDB[] | undefined[];
    newsCount: number;
}
export { PagesTemplate };
