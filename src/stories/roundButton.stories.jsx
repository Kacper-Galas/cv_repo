import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { RoundButton } from "../components/roundButton";

export default {
    title: 'UI/RoundButton',
    component: RoundButton,
}

const Template = (args) => <div style={{ padding: 24 }}><RoundButton {...args} /></div>

export const Default = Template.bind({});
Default.args = {
    darkMode: false,
};

export const Dark = Template.bind({});
Dark.args = {
    variant: 'dark',
    icon: <FiGithub />,
};

export const Accent = Template.bind({});
Accent.args = {
    variant: 'accent',
    bordered: false,
    elevated: true,
    icon: <FiArrowUpRight />,
};

export const MutedLarge = Template.bind({});
MutedLarge.args = {
    variant: 'muted',
    size: 'lg',
    icon: <FiLinkedin />,
};

export const LightSolid = Template.bind({});
LightSolid.args = {
    variant: 'light',
    bordered: false,
    icon: <FiMail />,
};