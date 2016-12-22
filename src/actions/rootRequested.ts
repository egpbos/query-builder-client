import { ROOT_REQUESTED } from './authorized-actions';

export const rootRequested = (table: string) => {
    return {
        type: ROOT_REQUESTED,
        payload: { table }
    };
};
