import { Navigate, Route, Routes } from 'react-router-dom';
import { DEFAULT_MAIN, DEFAULT_SUB } from '@features/home/model/tabs';
import { HomePage } from '@pages/home/HomePage';

export const AppRoutes = () => {
  const defaultPath = `/${DEFAULT_MAIN}/${DEFAULT_SUB}`;

  return (
    <Routes>
      <Route path='/' element={<Navigate to={defaultPath} replace />} />
      <Route path='/:main/:sub' element={<HomePage />} />
      <Route path='*' element={<Navigate to={defaultPath} replace />} />
    </Routes>
  );
};
