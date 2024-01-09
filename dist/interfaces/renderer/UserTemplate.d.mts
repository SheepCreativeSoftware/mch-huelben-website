import { RendererTemplate } from '../RendererTemplate.mjs';
interface UserTemplate extends RendererTemplate {
    users: Express.User[];
}
export { UserTemplate };
