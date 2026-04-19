import { useState } from 'react';
import { Switch } from '../components/ui/switch';

export default {
    title: 'UI/Switch',
    component: Switch,
};

const Template = (args) => {
    const [checked, setChecked] = useState(Boolean(args.checked));

    return (
        <div style={{ padding: 24 }}>
            <Switch {...args} checked={checked} onChange={setChecked} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    checked: false,
    label: 'Highlight only',
};

export const Small = Template.bind({});
Small.args = {
    checked: true,
    size: 'sm',
    label: 'Small switch',
};

export const Disabled = Template.bind({});
Disabled.args = {
    checked: true,
    size: 'lg',
    label: 'Large switch (disabled)',
    disabled: true,
};