import { ErrorRender } from './ErrorRender.mjs';
import { NavLinks } from './NavLinks.mjs';
interface RendererTemplate {
    author: string;
    meta: string;
    title: string;
    naviLinks: NavLinks[];
    message?: string;
    error?: ErrorRender;
}
export { RendererTemplate };
