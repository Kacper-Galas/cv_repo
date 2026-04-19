import { FiBell } from 'react-icons/fi';
import { Badge } from '../components/ui/badge';

export default {
    title: 'UI/Badge',
    component: Badge,
};

const Template = (args) => (
    <div style={{ padding: 24 }}>
        <Badge {...args}>
            <FiBell size={24} />
        </Badge>
    </div>
);

export const Count = Template.bind({});
Count.args = {
    count: 5,
};

export const Dot = Template.bind({});
Dot.args = {
    dot: true,
};

export const Overflow = Template.bind({});
Overflow.args = {
    count: 200,
    max: 99,
};

export const Standalone = () => (
    <div style={{ padding: 24 }}>
        <Badge count={12} />
    </div>
);