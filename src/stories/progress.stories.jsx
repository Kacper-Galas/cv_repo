import { Progress } from '../components/ui/progress';

export default {
    title: 'UI/Progress',
    component: Progress,
};

const Template = (args) => (
    <div style={{ padding: 24, maxWidth: 420 }}>
        <Progress {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    value: 70,
    label: 'React',
};

export const Striped = Template.bind({});
Striped.args = {
    value: 40,
    label: 'TypeScript',
    striped: true,
};

export const CustomColor = Template.bind({});
CustomColor.args = {
    value: 90,
    label: 'HTML/CSS',
    size: 'lg',
    color: '#22c55e',
};

export const Circle = () => (
    <div style={{ display: 'flex', gap: 32, padding: 24 }}>
        <Progress variant="circle" value={75} />
        <Progress variant="circle" value={50} color="#3b82f6" />
        <Progress variant="circle" value={30} color="#22c55e" />
    </div>
);