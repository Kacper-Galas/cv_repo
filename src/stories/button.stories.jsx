import { Button } from "../components/button";

export default {
    title: 'UI/Button',
    component: Button,
};

const Template = (args) => <Button {...args} />

export const Default = Template.bind({});
Default.args = {
    disabled: false,
    label: 'Informacje'
}