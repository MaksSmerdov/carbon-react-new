import { Navigate, Route, Routes } from 'react-router-dom';
import { DEFAULT_SUB, TABS, getRoutePath } from '@features/home/model/tabs';
import { HomePage } from '@pages/home/HomePage';

export const AppRoutes = () => {
  // Получаем первую вкладку для дефолтного роута
  const firstTab = TABS[0];
  const defaultPath = firstTab ? getRoutePath(firstTab.type, firstTab.id, DEFAULT_SUB) : '/carbonization/1/current';

  return (
    <Routes>
      <Route path='/' element={<Navigate to={defaultPath} replace />} />
      <Route path='/:type/:id/:sub' element={<HomePage />} />
      <Route path='*' element={<Navigate to={defaultPath} replace />} />
    </Routes>
  );
};
