import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './i18n';
import { CVPage } from './pages/cv';
import { BlogPage } from './pages/blog';
import { LoginPage } from './pages/login';
import { CreatorPage } from './pages/creator';

const theme = {
  token: {
    colorPrimary: '#ff5246',
  }
}

function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogPage />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/creator" element={<CreatorPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
