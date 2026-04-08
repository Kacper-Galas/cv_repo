import { ConfigProvider } from 'antd';
import './App.css';
import { UIDisplayAdapter } from './components/display_UI_adapter';
import './i18n';

const theme = {
  token: {
    colorPrimary: '#ff5246',
  }
}

function App() {
  return (
    <ConfigProvider theme={theme}>
      <UIDisplayAdapter /> 
    </ConfigProvider> 
  );
}

export default App;
