import { FiArrowRight, FiDownload, FiStar } from 'react-icons/fi';
import { Button } from "../components/button";

export default {
    title: 'UI/Button',
    component: Button,
};

const Template = (args) => <div style={{ padding: 24 }}><Button {...args} /></div>

export const Default = Template.bind({});
Default.args = {
    disabled: false,
    label: 'Informacje',
    type: 'primary',
};

export const GreyAnimated = Template.bind({});
GreyAnimated.args = {
    label: 'Czytaj dalej',
    type: 'secondary',
    icon: <FiArrowRight />,
    iconPosition: 'right',
};

export const OutlineFill = Template.bind({});
OutlineFill.args = {
    label: 'Więcej informacji',
    type: 'outline',
    icon: <FiArrowRight />,
    iconPosition: 'right',
};

export const StaticDark = Template.bind({});
StaticDark.args = {
    label: 'Pobierz PDF',
    type: 'staticDark',
    icon: <FiDownload />,
};

export const StaticGrey = Template.bind({});
StaticGrey.args = {
    label: 'Bez animacji',
    type: 'staticGrey',
};

export const Ghost = Template.bind({});
Ghost.args = {
    label: 'Zobacz szczegóły',
    type: 'ghost',
};

export const IconOnly = Template.bind({});
IconOnly.args = {
    type: 'icon',
    icon: <FiStar />,
};