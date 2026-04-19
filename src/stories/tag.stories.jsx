import { FiZap } from 'react-icons/fi';
import { Tag } from '../components/ui/tag';

export default {
    title: 'UI/Tag',
    component: Tag,
};

const Template = (args) => (
    <div style={{ padding: 24 }}>
        <Tag {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    children: 'Default',
};

export const Primary = Template.bind({});
Primary.args = {
    children: 'Primary',
    variant: 'primary',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    children: 'With Icon',
    variant: 'primary',
    icon: <FiZap size={11} />,
};

export const Closable = Template.bind({});
Closable.args = {
    children: 'Closable',
    closable: true,
};