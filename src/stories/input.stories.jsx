import { Input } from '../components/ui/input';
import { FiSearch, FiMail, FiUser } from 'react-icons/fi';

export default {
    title: 'UI/Input',
    component: Input,
};

const Template = (args) => <div style={{ maxWidth: 400, padding: 24 }}><Input {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    label: 'Imię',
    placeholder: 'Wpisz imię...',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    label: 'Szukaj',
    placeholder: 'Szukaj artykułów...',
    icon: <FiSearch />,
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'E-mail',
    placeholder: 'adres@email.pl',
    icon: <FiMail />,
    error: 'Niepoprawny adres e-mail',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Użytkownik',
    placeholder: 'Niedostępne',
    icon: <FiUser />,
    disabled: true,
};
