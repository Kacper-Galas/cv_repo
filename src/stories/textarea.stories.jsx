import { useState } from 'react';
import { Textarea } from '../components/ui/textarea';

export default {
    title: 'UI/Textarea',
    component: Textarea,
};

const Template = (args) => {
    const [value, setValue] = useState(args.value || '');

    return (
        <div style={{ maxWidth: 480, padding: 24 }}>
            <Textarea
                {...args}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Description',
    placeholder: 'Write something...',
    maxLength: 200,
};

export const AutoResize = Template.bind({});
AutoResize.args = {
    label: 'Auto resize',
    placeholder: 'Grows with content...',
    autoResize: true,
    value: 'Short text',
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'With error',
    error: 'This field is required',
    value: '',
};