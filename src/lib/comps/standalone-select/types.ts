	export type Option<T = unknown> = {
		value: T;
		label?: string;
		disabled?: boolean;
	};

	export type Group<T = unknown> = {
		label: string;
		options: Option<T>[];
	};