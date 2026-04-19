import { Divider } from '../components/ui/divider';

export default {
    title: 'UI/Divider',
    component: Divider,
};

const Template = (args) => (
    <div style={{ padding: 24 }}>
        <p>Content above</p>
        <Divider {...args} />
        <p>Content below</p>
    </div>
);

export const Default = Template.bind({});
Default.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = {
    label: 'Section',
};

export const LeftAligned = Template.bind({});
LeftAligned.args = {
    label: 'Left aligned',
    align: 'left',
};

export const Dashed = Template.bind({});
Dashed.args = {
    dashed: true,
};