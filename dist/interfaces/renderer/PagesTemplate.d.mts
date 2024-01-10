import { ContentDB } from '../ContentDB.mjs';
import { RendererTemplate } from '../RendererTemplate.mjs';
interface PagesTemplate extends RendererTemplate {
    content: ContentDB[] | undefined[];
    currentUrl: string;
    dateOptions: Intl.DateTimeFormatOptions;
}
export { PagesTemplate };
