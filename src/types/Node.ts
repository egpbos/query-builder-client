import { Selected } from '../types';

export type Node = {
    children:    number[] | undefined;
    dbid:        number;
    expanded:    boolean;
    highlighted: boolean
    isfile:      boolean;
    name:        string;
    parent:      number | undefined;
    selected:    Selected;
}
