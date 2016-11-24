/* import all svg files as strings */
declare module '*.svg' {
    const __path__: string;
    export default __path__;
}


declare module 'classnames' {

	// type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | false;

	// interface ClassDictionary {
	// 	[id: string]: boolean | undefined | null;
	// }

	// interface ClassArray extends Array<ClassValue> { }

	export default function classNames(classes:any): string;	
}
