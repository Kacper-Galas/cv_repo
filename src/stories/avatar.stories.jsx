import { FiStar } from 'react-icons/fi';
import { Avatar, AvatarGroup } from '../components/ui/avatar';

export default {
    title: 'UI/Avatar',
    component: Avatar,
};

const Template = (args) => (
    <div style={{ padding: 24 }}>
        <Avatar {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    name: 'Kacper Galas',
};

export const Colored = Template.bind({});
Colored.args = {
    name: 'Jane Smith',
    color: '#22c55e',
    size: 'lg',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    icon: <FiStar />,
    color: '#f59e0b',
    size: 'lg',
};

export const Group = () => (
    <div style={{ padding: 24 }}>
        <AvatarGroup max={3}>
            <Avatar name="Alice K" />
            <Avatar name="Bob M" color="#3b82f6" />
            <Avatar name="Carol L" color="#22c55e" />
            <Avatar name="Dave P" color="#f59e0b" />
            <Avatar name="Eve Q" color="#a855f7" />
        </AvatarGroup>
    </div>
);