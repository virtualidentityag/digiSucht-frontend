import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetConsultingType } from '../../api';
import { WaitingRoom } from '../waitingRoom/WaitingRoom';

export interface WaitingRoomLoaderProps {
	handleUnmatch: () => void;
}

export const WaitingRoomLoader = ({
	handleUnmatch
}: WaitingRoomLoaderProps) => {
	const [
		isAnonymousConversationAllowed,
		setIsAnonymousConversationAllowed
	] = useState<boolean>();
	const { consultingTypeSlug } = useParams();
	const [consultingTypeId, setConsultingTypeId] = useState<number>();

	useEffect(() => {
		apiGetConsultingType({ consultingTypeSlug }).then((result) => {
			if (result?.isAnonymousConversationAllowed) {
				setConsultingTypeId(result.consultingType);
				setIsAnonymousConversationAllowed(true);
			} else {
				handleUnmatch();
			}
		});
	}, [consultingTypeSlug, handleUnmatch]);

	if (isAnonymousConversationAllowed) {
		return (
			<WaitingRoom
				consultingTypeSlug={consultingTypeSlug}
				consultingTypeId={consultingTypeId}
			/>
		);
	} else {
		return null;
	}
};
