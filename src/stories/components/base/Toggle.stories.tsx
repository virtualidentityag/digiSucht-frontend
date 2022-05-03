import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Toggle } from '../../../components/base/Toggle';

export default {
	title: 'Base/Toggle',
	component: Toggle
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Loremipsum'
};
