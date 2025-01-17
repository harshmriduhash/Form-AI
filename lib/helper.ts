import { v4 } from 'uuid';

export const generateUniqueId = () => {
    return v4().replace(/-/g, "").substring(0, 20);
};