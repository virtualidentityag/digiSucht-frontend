import * as React from 'react';
import { useContext } from 'react';
import {
	typeIsSession,
	typeIsTeamSession,
	typeIsEnquiry,
	getTypeOfLocation
} from '../session/sessionHelpers';
import { translate } from '../../resources/scripts/i18n/translate';
import {
	UserDataContext,
	AUTHORITIES,
	hasUserAuthority
} from '../../globalState';
import { SessionsList } from './SessionsList';
import { Link } from 'react-router-dom';
import './sessionsList.styles';

export const SessionsListWrapper = () => {
	const type = getTypeOfLocation();
	const { userData } = useContext(UserDataContext);

	if (hasUserAuthority(AUTHORITIES.USER_DEFAULT, userData)) {
		return (
			<div className="sessionsList__wrapper">
				<div className="sessionsList__header">
					<h2 className="sessionsList__headline">
						{translate('sessionList.user.headline')}
					</h2>
				</div>
				<SessionsList />
			</div>
		);
	}

	return (
		<div className="sessionsList__wrapper">
			<div className="sessionsList__header">
				<h2 className="sessionsList__headline">
					{typeIsSession(type)
						? translate('sessionList.view.headline')
						: null}
					{typeIsTeamSession(type) &&
					!hasUserAuthority(
						AUTHORITIES.VIEW_ALL_PEER_SESSIONS,
						userData
					)
						? translate('navigation.consultant.teamsessions')
						: null}
					{typeIsTeamSession(type) &&
					hasUserAuthority(
						AUTHORITIES.VIEW_ALL_PEER_SESSIONS,
						userData
					)
						? translate('sessionList.peersessions.headline')
						: null}
					{typeIsEnquiry(type)
						? translate('sessionList.preview.headline')
						: null}
				</h2>
				{typeIsSession(type) &&
				hasUserAuthority(AUTHORITIES.CREATE_NEW_CHAT, userData) ? (
					<Link
						className="sessionsList__createChatLink"
						to={{
							pathname: `/sessions/consultant/sessionView/createGroupChat`
						}}
					>
						<span
							className="sessionsList__createChatButton"
							title={translate(
								'sessionList.createChat.buttonTitle'
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="72"
								height="72"
								viewBox="0 0 72 72"
							>
								<path d="M45.6146298,29.9830508 L54.5627119,29.9830508 C56.4532203,29.9830508 58,31.6091525 58,33.5966102 L58,66.1186441 L50.2587571,58.8915254 L27.0644068,58.8915254 C25.1738983,58.8915254 23.6271186,57.2654237 23.6271186,55.2779661 L23.6271186,47.7728814 L38.2808207,47.7728814 C42.3233183,47.7728814 45.6146298,44.3127846 45.6146298,40.0629795 L45.6146298,29.9830508 Z M36.9355932,15 C38.8261017,15 40.3728814,16.5864407 40.3728814,18.5254237 L40.3728814,39.6779661 C40.3728814,41.6169492 38.8261017,43.2033898 36.9355932,43.2033898 L13.7412429,43.2033898 L6,50.2542373 L6,18.5254237 C6,16.5864407 7.54677966,15 9.43728814,15 L36.9355932,15 Z M60.4,11.6034488 L68.2,11.6034488 C68.6418278,11.6034488 69,11.961621 69,12.4034488 L69,15.6034488 C69,16.0452766 68.6418278,16.4034488 68.2,16.4034488 L60.4,16.4034488 L60.4,24.2 C60.4,24.6418278 60.0418278,25 59.6,25 L56.4,25 C55.9581722,25 55.6,24.6418278 55.6,24.2 L55.6,16.4034488 L47.8,16.4034488 C47.3581722,16.4034488 47,16.0452766 47,15.6034488 L47,12.4034488 C47,11.961621 47.3581722,11.6034488 47.8,11.6034488 L55.6,11.6034488 L55.6,3.8 C55.6,3.3581722 55.9581722,3 56.4,3 L59.6,3 C60.0418278,3 60.4,3.3581722 60.4,3.8 L60.4,11.6034488 Z" />
							</svg>
						</span>
					</Link>
				) : (
					<div className="sessionMenuPlaceholder"></div>
				)}
			</div>
			<SessionsList />
		</div>
	);
};
