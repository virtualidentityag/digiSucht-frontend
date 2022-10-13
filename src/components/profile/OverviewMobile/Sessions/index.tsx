import React, { useCallback } from 'react';
import { useConsultantBookings } from '../../../../containers/overview/hooks/useConsultantBookings';
import { useConsultantData } from '../../../../containers/overview/hooks/useConsultantData';
import { LinkMenu } from '../../../mobile/linkMenu/LinkMenu';
import { SESSION_LIST_TYPES } from '../../../session/sessionHelpers';
import { useTranslation } from 'react-i18next';

export const OverviewSessions = () => {
	const { t: translate } = useTranslation();

	const { total: totalEnquiry } = useConsultantData({
		type: SESSION_LIST_TYPES.ENQUIRY
	});
	const { total: totalMySessions } = useConsultantData({
		type: SESSION_LIST_TYPES.MY_SESSION
	});
	const { bookings } = useConsultantBookings();

	const getCount = useCallback((count) => (count > 9 ? '9+' : count), []);

	const items = [
		{
			title: `${getCount(totalMySessions)} ${translate(
				'overview.myMessagesTitle'
			)}`,
			url: '/sessions/consultant/sessionPreview'
		},
		{
			title: `${getCount(totalEnquiry)} ${translate(
				'overview.initialInquiriesTitle'
			)}`,
			url: '/sessions/consultant/sessionView'
		},
		{
			title: `${translate('overview.upcomingAppointments', {
				count: getCount(bookings.length)
			})}`,
			url: '/booking/events/gebuchte'
		}
	];
	return <LinkMenu items={items} />;
};
