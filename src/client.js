import React from 'react';
import ReactDOM from 'react-dom';
import ArticleAlbum from './components/ArticleAlbum';

window.onload = () => {
  ReactDOM.render(<ArticleAlbum />, document.getElementById('main'));
};