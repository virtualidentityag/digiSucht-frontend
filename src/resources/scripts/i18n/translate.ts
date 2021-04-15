import { getResortKeyForConsultingType } from '../helpers/resorts';
import { getTokenFromCookie } from '../../../components/sessionCookie/accessSessionCookie';
import defaultLocale from './defaultLocale';
import informalLocale from './informalLocale';

export const getTranslation = (
	translatable: string,
	informal: boolean = false
): any => {
	let config = translatable.split('.')[0];
	return (informal ? informalLocale : defaultLocale)[config][
		translatable.split('.').slice(1).join('.')
	];
};

export const translate = (translatable: string): any => {
	let informal = Boolean(getTokenFromCookie('useInformal'));
	return (
		getTranslation(translatable, informal) ||
		'[NO TRANSLATION FOR ' + translatable + ']'
	);
};

export const handleNumericTranslation = (
	topic: string,
	value: string,
	number: number
) => {
	const translateVal = (topic + '.' + value + '.' + number).toString();
	const translateStr = translateVal.toString();
	return translate(translateStr);
};

export const getAddictiveDrugsString = (addictiveDrugs: string[]) => {
	let drugString = '';
	addictiveDrugs.forEach((drug, i) => {
		if (i > 0) {
			drugString += ', ';
		}
		drugString += handleNumericTranslation(
			'user.userAddiction',
			'addictiveDrugs',
			parseInt(drug)
		);
	});
	return drugString;
};

export const getResortTranslation = (
	consultingType: number,
	alt: boolean = false
) => {
	const translatable = `resort.${getResortKeyForConsultingType(
		consultingType
	)}${alt ? '.alt' : ''}`;
	return translate(translatable);
};
