import { Selected } from '../types';

export type Entity = {
    children: number[] | undefined;
    dbid:     number;
    expanded: boolean;
    isfile:   boolean;
    name:     string;
    parent:   number | undefined;
    selected: Selected;
}
