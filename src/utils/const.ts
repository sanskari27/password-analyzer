export enum ERRORS {
	MIN_LENGTH = 'MIN_LENGTH',
	MAX_LENGTH = 'MAX_LENGTH',
	REPEATED_NUMBERS = 'REPEATED_NUMBERS',
	CHARACTER_REPETITION = 'CHARACTER_REPETITION',
	NO_DATE_FORMATS = 'NO_DATE_FORMATS',
	NO_PHONE_FORMATS = 'NO_PHONE_FORMATS',
	NO_EMAIL_FORMATS = 'NO_EMAIL_FORMATS',
	REQUIRED_SET = 'REQUIRED_SET',
}

export const USER_ERROR_REASONS = {
	REPEATED_NUMBERS: 'Password contains 3+ repeated numbers',
	CHARACTER_REPETITION: 'Password contains 3+ repeated characters',
	NO_DATE_FORMATS: 'Password contains a date',
	NO_PHONE_FORMATS: 'Password contains a phone number',
	NO_EMAIL_FORMATS: 'Password contains a email address',
};
