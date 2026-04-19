import { Alert } from '../components/ui/alert';

export default {
    title: 'UI/Alert',
    component: Alert,
};

const Template = (args) => (
    <div style={{ maxWidth: 560, padding: 24 }}>
        <Alert {...args} />
    </div>
);

export const Info = Template.bind({});
Info.args = {
    type: 'info',
    title: 'Informacja',
    message: 'To jest przykładowy komunikat informacyjny.',
};

export const SuccessClosable = Template.bind({});
SuccessClosable.args = {
    type: 'success',
    title: 'Zapisano',
    message: 'Zmiany zostały zapisane poprawnie.',
    closable: true,
};

export const Warning = Template.bind({});
Warning.args = {
    type: 'warning',
    title: 'Uwaga',
    message: 'Sprawdź dane przed przejściem dalej.',
};

export const ErrorWithAction = Template.bind({});
ErrorWithAction.args = {
    type: 'error',
    title: 'Błąd',
    message: 'Nie udało się wykonać operacji.',
    action: <button type="button">Spróbuj ponownie</button>,
};