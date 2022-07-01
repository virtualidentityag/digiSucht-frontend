import { config } from '../resources/scripts/config';
import { fetchData, FETCH_METHODS } from './fetchData';

export enum ALIAS_MESSAGE_TYPES {
	E2EE_ACTIVATED = 'E2EE_ACTIVATED',
	FINISHED_CONVERSATION = 'FINISHED_CONVERSATION',
	FORWARD = 'FORWARD',
	FURTHER_STEPS = 'FURTHER_STEPS',
	UPDATE_SESSION_DATA = 'UPDATE_SESSION_DATA',
	VIDEOCALL = 'VIDEOCALL',
	USER_MUTED = 'USER_MUTED',
	USER_UNMUTED = 'USER_UNMUTED',
	REASSIGN_CONSULTANT = 'REASSIGN_CONSULTANT'
}

interface AliasMessageParams {
	rcGroupId: string;
	type: ALIAS_MESSAGE_TYPES;
	// todo add dynamic params for reassign
	// @see https://github.com/Onlineberatung/onlineBeratung-messageService/blob/develop/api/messageservice.yaml
}

export const apiSendAliasMessage = async ({
	rcGroupId,
	type
}: AliasMessageParams): Promise<any> => {
	const url = `${config.endpoints.sendAliasMessage}`;

	return fetchData({
		url,
		headersData: { rcGroupId },
		method: FETCH_METHODS.POST,
		rcValidation: true,
		bodyData: JSON.stringify({
			messageType: type
		})
	});
};
