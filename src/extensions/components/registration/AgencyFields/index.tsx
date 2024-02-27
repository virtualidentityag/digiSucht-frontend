import React, { useContext } from 'react';
import { FieldContext } from 'rc-field-form';
import {
	ConsultingTypeBasicInterface,
	AgencyDataInterface
} from '../../../../globalState/interfaces';
import { InputFormField } from '../InputFormField';
import { AgencySelection } from './AgencySelection';
import { useTranslation } from 'react-i18next';
import { Text } from '../../../../components/text/Text';
import { useTenant } from '../../../../globalState';

interface AgencySelectionFormFieldProps {
	preselectedAgencies: AgencyDataInterface[];
	consultingType: ConsultingTypeBasicInterface;
}

export const AgencySelectionFormField = ({
	consultingType,
	preselectedAgencies
}: AgencySelectionFormFieldProps) => {
	const field = useContext(FieldContext);
	const tenant = useTenant();
	const { t: translate } = useTranslation();
	const { mainTopicId, gender, age, counsellingRelation } =
		field.getFieldsValue();

	return (
		<>
			{!!(
				Number(mainTopicId) >= 0 &&
				gender &&
				age &&
				(!tenant.settings.featureCounsellingRelationsEnabled ||
					counsellingRelation)
			) || preselectedAgencies.length > 0 ? (
				<AgencySelection
					consultingType={consultingType}
					preselectedAgencies={preselectedAgencies}
				/>
			) : (
				<div className="registrationFormDigi__AgencyMandatoryFields">
					<Text
						type="standard"
						text={translate(
							'registrationDigi.agency.fullFillAllFields'
						)}
					/>
				</div>
			)}

			<InputFormField
				name="consultingTypeId"
				type="hidden"
				rule={{
					pattern: /^\d+$/
				}}
			/>
			<InputFormField name="postCode" type="hidden" />
			<InputFormField name="agencyId" type="hidden" />
		</>
	);
};
