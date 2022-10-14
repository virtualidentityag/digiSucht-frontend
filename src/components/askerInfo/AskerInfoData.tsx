import * as React from 'react';
import { useContext } from 'react';
import {
	handleNumericTranslation,
	getAddictiveDrugsString
} from '../../utils/translate';
import { getContact, useConsultingType } from '../../globalState';
import {
	convertUserDataObjectToArray,
	getAddictiveDrugsTranslatable,
	getUserDataTranslateBase
} from '../profile/profileHelpers';
import { Text } from '../text/Text';
import { ActiveSessionContext } from '../../globalState/provider/ActiveSessionProvider';
import { useTranslation } from 'react-i18next';

export const AskerInfoData = () => {
	const { t: translate } = useTranslation(['common', 'consultingTypes']);
	const { activeSession } = useContext(ActiveSessionContext);

	const consultingType = useConsultingType(activeSession.item.consultingType);

	const userSessionData = getContact(
		activeSession,
		translate('sessionList.user.consultantUnknown')
	).sessionData;
	const preparedUserSessionData =
		convertUserDataObjectToArray(userSessionData);
	const addictiveDrugs = userSessionData.addictiveDrugs
		? getAddictiveDrugsTranslatable(userSessionData.addictiveDrugs)
		: null;

	return (
		<>
			<Text text={translate('userProfile.data.title')} type="divider" />
			<div className="profile__data__item">
				<p className="profile__data__label">
					{translate('userProfile.data.resort')}
				</p>
				<p className="profile__data__content">
					{consultingType
						? translate(
								[
									`consultingType.${consultingType.id}.titles.default`,
									consultingType.titles.default
								],
								{ ns: 'consultingTypes' }
						  )
						: ''}
				</p>
			</div>
			{activeSession.item.consultingType === 0 && !activeSession.isLive && (
				<div className="profile__data__item">
					<p className="profile__data__label">
						{translate('userProfile.data.postcode')}
					</p>
					<p className="profile__data__content">
						{activeSession.item.postcode}
					</p>
				</div>
			)}
			{preparedUserSessionData.map((item, index) => (
				<div className="profile__data__item" key={index}>
					<p className="profile__data__label">
						{translate('userProfile.data.' + item.type)}
					</p>
					<p
						className={
							item.value
								? `profile__data__content`
								: `profile__data__content profile__data__content--empty`
						}
					>
						{item.value
							? item.type === 'addictiveDrugs'
								? translate(
										getAddictiveDrugsString(addictiveDrugs)
								  )
								: translate(
										handleNumericTranslation(
											getUserDataTranslateBase(
												activeSession.item
													.consultingType
											),
											item.type,
											item.value
										)
								  )
							: translate('profile.noContent')}
					</p>
				</div>
			))}
		</>
	);
};
