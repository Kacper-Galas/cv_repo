import { useState } from 'react';
import { Dropdown } from '../components/ui/dropdown';

export default {
    title: 'UI/Dropdown',
    component: Dropdown,
};

const Template = (args) => {
    const [value, setValue] = useState(args.value);
    return (
        <div style={{ padding: 24, minHeight: 200 }}>
            <Dropdown {...args} value={value} onChange={setValue} />
            <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#888', marginTop: 120 }}>
                Wybrano: {value || '—'}
            </p>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Sortuj',
    options: [
        { label: 'Najnowsze', value: 'newest' },
        { label: 'Najstarsze', value: 'oldest' },
        { label: 'Najkrótsze', value: 'shortest' },
    ],
};

export const WithPreselection = Template.bind({});
WithPreselection.args = {
    label: 'Kategoria',
    value: 'react',
    options: [
        { label: 'Wszystkie', value: 'all' },
        { label: 'React', value: 'react' },
        { label: 'Node.js', value: 'nodejs' },
        { label: 'CSS', value: 'css' },
    ],
};
