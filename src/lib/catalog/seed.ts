import raw from './seed.json';
import { catalogSchema } from './model';
export default catalogSchema.parse(raw);
