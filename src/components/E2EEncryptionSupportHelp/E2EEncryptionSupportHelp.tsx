import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';
import './E2EEncryptionSupportHelp.styles.scss';
import { useTranslation } from 'react-i18next';
import { Headline } from '../headline/Headline';
import { Text } from '../text/Text';
import { copyTextToClipboard } from '../../utils/clipboardHelpers';
import { Button, BUTTON_TYPES } from '../button/Button';
import { CopyIcon } from '../../resources/img/icons';
import { ReactComponent as NewWindow } from '../../resources/img/icons/new-window.svg';
import ChromeLogo from '../../resources/img/images/google_chrome.png';
import EdgeLogo from '../../resources/img/images/microsoft_edge.png';
import SafariLogo from '../../resources/img/images/safari.png';
import { ReactComponent as ErrorBubbleIllustration } from '../../resources/img/illustrations/error-bubble.svg';

import { Notification } from '../notifications/Notification';
import Divider from '@mui/material/Divider';

export const E2EEncryptionSupportHelp = () => {
	const { t: translate } = useTranslation();
	const [showNotification, setShowNotification] = useState<boolean>(false);

	const copyLink = useCallback(async () => {
		const href = window.location.href;
		await copyTextToClipboard(href, () => {
			setShowNotification(true);
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setShowNotification(false);
		}, 2000);
	}, [showNotification]);

	return (
		<div className="encryption-support">
			{showNotification && (
				<div className="notifications">
					<Notification
						notification={{
							notificationType: 'success',
							title: translate(
								'help.videoCall.waitingRoom.copiedLink'
							)
						}}
					/>
				</div>
			)}
			<Headline
				semanticLevel="1"
				text={translate('help.videoCall.waitingRoom.headline')}
			/>

			<div className="encryption-support__info-box">
				<div>
					<Headline
						semanticLevel="5"
						className="encryption-support__info-box-headline"
						text={translate(
							'help.videoCall.waitingRoom.infoBox.headline'
						)}
					/>
					<Text
						type="standard"
						text={translate(
							'help.videoCall.waitingRoom.infoBox.text'
						)}
					/>
				</div>
				<div className="encryption-support__illustration">
					<ErrorBubbleIllustration />
				</div>
			</div>
			<Headline
				semanticLevel="5"
				text={translate('help.videoCall.waitingRoom.subline1')}
			/>
			<Text
				className="encryption-support__text"
				type="standard"
				text={translate('help.videoCall.waitingRoom.text1')}
			/>
			<div className="encryption-support__browsers">
				<div>
					<img
						src={ChromeLogo}
						alt={translate('help.googleChrome')}
						title={translate('help.googleChrome')}
					/>
					<a
						href="https://www.google.com/chrome/"
						target="_blank"
						rel="noreferrer"
						className="button-as-link"
					>
						<NewWindow
							title={translate('help.openInNewTab')}
							aria-label={translate('help.openInNewTab')}
						/>{' '}
						{translate('help.googleChrome')}
					</a>
				</div>
				<div>
					<img
						src={EdgeLogo}
						alt={translate('help.msEdge')}
						title={translate('help.msEdge')}
					/>
					<a
						href="https://www.microsoft.com/edge"
						target="_blank"
						rel="noreferrer"
						className="button-as-link"
					>
						<NewWindow
							title={translate('help.openInNewTab')}
							aria-label={translate('help.openInNewTab')}
						/>{' '}
						{translate('help.msEdge')}
					</a>
				</div>
				<div>
					<img
						src={SafariLogo}
						alt={translate('help.safari')}
						title={translate('help.safari')}
					/>
					<a
						href="https://www.apple.com/de/safari/"
						target="_blank"
						rel="noreferrer"
						className="button-as-link"
					>
						<NewWindow
							title={translate('help.openInNewTab')}
							aria-label={translate('help.openInNewTab')}
						/>{' '}
						{translate('help.safari')}
					</a>
				</div>
			</div>
			<Divider sx={{ my: '32px' }}>
				<Text
					className="encryption-support__divider"
					type="infoSmall"
					text="oder"
				></Text>
			</Divider>
			<Headline
				semanticLevel="5"
				text={translate('help.videoCall.waitingRoom.subline2')}
			/>
			<Text
				className="encryption-support__text"
				type="standard"
				text={translate('help.videoCall.waitingRoom.text2')}
			/>
			<div className="encryption-support__button-wrapper">
				<Button
					className="text--nowrap"
					buttonHandle={() => {
						copyLink();
					}}
					item={{
						label: translate('help.videoCall.waitingRoom.copyLink'),
						type: BUTTON_TYPES.PRIMARY,
						icon: <CopyIcon style={{ marginRight: '10px' }} />
					}}
				/>
			</div>
		</div>
	);
};
