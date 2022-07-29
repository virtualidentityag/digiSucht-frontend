import { Field } from 'rc-field-form';
import React from 'react';
import { VALIDITY_VALID } from '../../registration/registrationHelpers';
import { RegistrationPassword } from '../../registration/RegistrationPassword';

const LocalPassword = ({
	onChange
}: {
	value?: string;
	onChange?: (value: string) => void;
}) => {
	const [password, setPassword] = React.useState();
	return (
		<RegistrationPassword
			onPasswordChange={(password) => setPassword(password)}
			onValidityChange={(validity) =>
				validity === VALIDITY_VALID && onChange(password)
			}
			passwordNote=""
			onKeyDown={() => null}
		/>
	);
};

export const PasswordFormField = () => {
	return (
		<Field name="password" rules={[{ required: true }]}>
			<LocalPassword />
		</Field>
	);
};
