import { ERRORS } from '@/utils/const';

export interface ValidationRule {
	minLength: number;
	maxLength: number;
	requiredSets: ('lower' | 'upper' | 'number' | 'symbol')[];
	forbiddenPatterns?: {
		pattern: RegExp;
		reason: string;
	}[];
	customChecks?: {
		name: ERRORS;
		test: (password: string) => boolean;
	}[];
}

const basicPasswordRules: ValidationRule = {
	minLength: 8,
	maxLength: 64,
	requiredSets: ['lower', 'upper'],
	forbiddenPatterns: [],
	customChecks: [],
};

const mediumPasswordRules: ValidationRule = {
	minLength: 12,
	maxLength: 64,
	requiredSets: ['lower', 'upper', 'number'],
	forbiddenPatterns: [
		{
			pattern: /(\d)\1{2,}/, // Blocks 3+ repeated numbers (e.g., 111)
			reason: ERRORS.REPEATED_NUMBERS,
		},
		{
			pattern: /(.)\1{2,}/, // Blocks 3+ repeated characters (e.g., aaaa)
			reason: ERRORS.CHARACTER_REPETITION,
		},
	],
	customChecks: [],
};

const strongPasswordRules: ValidationRule = {
	minLength: 12,
	maxLength: 64,
	requiredSets: ['lower', 'upper', 'number', 'symbol'],
	forbiddenPatterns: [
		{
			pattern: /(\d)\1{2,}/, // Blocks 3+ repeated numbers
			reason: ERRORS.REPEATED_NUMBERS,
		},
		{
			pattern: /(.)\1{2,}/, // Blocks 3+ repeated characters
			reason: ERRORS.CHARACTER_REPETITION,
		},
	],
	customChecks: [],
};

const advancedPasswordRules: ValidationRule = {
	minLength: 12,
	maxLength: 64,
	requiredSets: ['lower', 'upper', 'number', 'symbol'],
	forbiddenPatterns: [
		{
			pattern: /(\d)\1{3,}/,
			reason: ERRORS.REPEATED_NUMBERS,
		},
		{
			pattern: /(.)\1{3,}/,
			reason: ERRORS.CHARACTER_REPETITION,
		},
	],
	customChecks: [
		{
			name: ERRORS.NO_DATE_FORMATS,
			test: (pw: string) => !/\d{4}[-\/]\d{1,2}[-\/]\d{1,2}/.test(pw),
		},
		{
			name: ERRORS.NO_PHONE_FORMATS,
			test: (pw: string) => !/\d{3}[-\s]?\d{3}[-\s]?\d{4}/.test(pw),
		},
		{
			name: ERRORS.NO_EMAIL_FORMATS,
			test: (pw: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pw),
		},
	],
};

export const validationRules = {
	basic: basicPasswordRules,
	medium: mediumPasswordRules,
	strong: strongPasswordRules,
	advanced: advancedPasswordRules,
};

export default basicPasswordRules;
