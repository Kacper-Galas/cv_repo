import { FiBell, FiCode, FiInfo, FiStar } from 'react-icons/fi';
import { IconNote } from '../components/ui/iconNote';

export default {
    title: 'UI/IconNote',
    component: IconNote,
};

const Template = (args) => (
    <div style={{ display: 'flex', gap: 32, padding: 48 }}>
        <IconNote {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    icon: <FiBell size={20} />,
    note: 'You have new notifications',
};

export const Ghost = Template.bind({});
Ghost.args = {
    icon: <FiStar size={20} />,
    note: 'Mark as favourite',
    variant: 'ghost',
};

export const Circle = Template.bind({});
Circle.args = {
    icon: <FiCode size={20} />,
    note: 'View source code on GitHub',
    variant: 'circle',
};

export const RightPlacement = Template.bind({});
RightPlacement.args = {
    icon: <FiInfo size={20} />,
    note: 'This tooltip appears on the right side',
    placement: 'right',
    variant: 'ghost',
};