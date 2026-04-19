import { Tooltip } from '../components/ui/tooltip';

export default {
    title: 'UI/Tooltip',
    component: Tooltip,
};

const Template = (args) => (
    <div style={{ display: 'flex', gap: 32, padding: 80, justifyContent: 'center' }}>
        <Tooltip {...args}>
            <button type="button">Hover me</button>
        </Tooltip>
    </div>
);

export const Top = Template.bind({});
Top.args = {
    content: 'Top tooltip',
    placement: 'top',
};

export const Bottom = Template.bind({});
Bottom.args = {
    content: 'Bottom tooltip',
    placement: 'bottom',
};

export const Left = Template.bind({});
Left.args = {
    content: 'Left tooltip',
    placement: 'left',
};

export const Right = Template.bind({});
Right.args = {
    content: 'Right tooltip',
    placement: 'right',
};