import { randomBytes } from 'crypto';

export interface GeneratorOptions {
	length?: number;
	sets?: ('lower' | 'upper' | 'number' | 'symbol')[];
}

export function generatePassword(options: GeneratorOptions = {}) {
	const length = options.length || 12;
	const sets = options.sets || ['lower', 'upper', 'number', 'symbol'];

	const charset = {
		lower: 'abcdefghijklmnopqrstuvwxyz',
		upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		number: '0123456789',
		symbol: '!@#$%^&*',
	};

	const filteredCharset = Object.entries(charset)
		.filter(([key]) => sets.includes(key as 'lower' | 'upper' | 'number' | 'symbol'))
		.map(([, chars]) => chars)
		.join('');

	const password = Array.from(randomBytes(length))
		.map((byte) => filteredCharset[byte % filteredCharset.length])
		.join('');

	return password;
}
