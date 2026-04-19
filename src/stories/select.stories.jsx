import React, { useState } from 'react';
import { Select } from '../components/ui/select';

export default {
    title: 'UI/Select',
    component: Select,
    parameters: {
        layout: 'padded',
    },
};

const selectOptions = [
    { label: 'React', value: 'react', description: 'Frontend i interfejsy' },
    { label: 'Node.js', value: 'node', description: 'Backend i API' },
    { label: 'CSS', value: 'css', description: 'Layout, motion i design systems' },
];

const Template = (args) => {
    const [value, setValue] = useState(args.value);

    return (
        <div style={{ maxWidth: 320, padding: 24 }}>
            <Select {...args} value={value} onChange={setValue} />
        </div>
    );
};

export const Minimal = Template.bind({});
Minimal.args = {
    label: 'Technologia',
    placeholder: 'Wybierz kategorię',
    options: selectOptions,
    variant: 'minimal',
};

export const Outlined = Template.bind({});
Outlined.args = {
    label: 'Technologia',
    value: 'react',
    options: selectOptions,
    variant: 'outlined',
};

export const Filled = Template.bind({});
Filled.args = {
    label: 'Technologia',
    value: 'node',
    options: selectOptions,
    variant: 'filled',
    helperText: 'Wybór filtruje widok listy',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
    label: 'Technologia',
    options: selectOptions,
    error: 'To pole jest wymagane',
};