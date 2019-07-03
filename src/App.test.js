import React from 'react';
import ReactDOM from 'react-dom';
import Signin from './App';
import SignUp from './pages/SignUp/SignUp';
import Abb from './Stepan'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const sign = document.getElementById('root');
  ReactDOM.render(<Signin />, div);
  ReactDOM.render(<SignUp />, sign);
  ReactDOM.unmountComponentAtNode(div);
})
