import React from 'react';

import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/pt-br';

import 'moment/locale/pt-br';
import Router from './routes';
import 'element-theme-default';
import './styles/default.css';

i18n.use(locale);
const App: React.FC = () => {
  return <Router />;
};

export default App;
