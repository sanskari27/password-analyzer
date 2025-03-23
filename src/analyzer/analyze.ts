import { ERRORS, USER_ERROR_REASONS } from '@/utils/const';
import basicPasswordRules, { ValidationRule } from '@/validator/validation-rules';
import zxcvbn from 'zxcvbn';

export interface PasswordAnalysis {
	isValid: boolean;
	score: number;
	errors: Array<{
		code: ERRORS;
		message: string;
	}>;
	suggestions: string[];
	crack_time: string;
	strength: 'weak' | 'medium' | 'strong';
}

export function analyzePassword(
	password: string,
	options: { rules: ValidationRule } = {
		rules: basicPasswordRules,
	}
): PasswordAnalysis {
	const zx = zxcvbn(password);
	const validation = validateAgainstRules(password, options.rules);

	const errors = validation.errors.map((error): { code: ERRORS; message: string } => {
		if (error === ERRORS.MIN_LENGTH) {
			return {
				code: error,
				message: `Password must be at least ${options.rules.minLength} characters long`,
			};
		} else if (error === ERRORS.MAX_LENGTH) {
			return {
				code: error,
				message: `Password must be less than ${options.rules.maxLength} characters long`,
			};
		} else if (error === ERRORS.REQUIRED_SET) {
			return {
				code: error,
				message: `Password must contain at least one ${options.rules.requiredSets.join(
					', '
				)} characters!`,
			};
		}
		return {
			code: error as ERRORS,
			message: USER_ERROR_REASONS[error as keyof typeof USER_ERROR_REASONS],
		};
	});
	return {
		crack_time: zx.crack_times_display.online_no_throttling_10_per_second as string,
		strength: zx.score > 3 ? 'strong' : zx.score > 2 ? 'medium' : 'weak',
		score: zx.score * 25,
		errors,
		suggestions: [...zx.feedback.suggestions, ...validation.suggestions],
		isValid: validation.isValid,
	};
}

function validateAgainstRules(password: string, rules: ValidationRule) {
	const errors: string[] = [];
	const suggestions: string[] = [];
	let isValid = true;

	if (password.length < rules.minLength) {
		errors.push(ERRORS.MIN_LENGTH);
		isValid = false;
	}

	if (password.length > rules.maxLength) {
		errors.push(ERRORS.MAX_LENGTH);
		isValid = false;
	}

	const requiredSets = rules.requiredSets.map((set) => {
		return new RegExp(`[${set}]`);
	});

	for (const set of requiredSets) {
		if (!set.test(password)) {
			errors.push(ERRORS.REQUIRED_SET);
			isValid = false;
			break;
		}
	}

	for (const pattern of rules.forbiddenPatterns || []) {
		if (pattern.pattern.test(password)) {
			errors.push(pattern.reason);
			isValid = false;
		}
	}

	for (const check of rules.customChecks || []) {
		if (check.test(password)) {
			errors.push(check.name);
			isValid = false;
		}
	}

	return { errors, isValid, suggestions };
}
