import { RoundButton } from "../components/roundButton";

export default {
    title: 'UI/RoundButton',
    component: RoundButton,
}

const Template = (args) => <RoundButton {...args} />

export const Default = Template.bind({});
Default.args = {
    darkMode: false,
}