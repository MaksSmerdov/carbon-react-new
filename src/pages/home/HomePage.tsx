import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DEFAULT_SUB, TABS, getRoutePath, parseRouteParams } from '@features/home/model/tabs';
import { HomeTabs } from '@features/home/ui/HomeTabs';
import { CurrentParams as CarbonizationCurrentParams } from '@features/carbonization';
import { CurrentParams as ActivationCurrentParams } from '@features/activation';
import styles from './HomePage.module.scss';

// Определяет, какой компонент CurrentParams показывать в зависимости от типа
// Компоненты сами получают id из useParams, поэтому id не передаем
const getCurrentParamsComponent = (type: string) => {
  if (type === 'carbonization') {
    return <CarbonizationCurrentParams />;
  }
  if (type === 'mpa') {
    return <ActivationCurrentParams />;
  }
  // Fallback на carbonization по умолчанию
  return <CarbonizationCurrentParams />;
};

const renderSubTabContent = (subTabValue: string, type: string) => {
  switch (subTabValue) {
    case 'current':
      return getCurrentParamsComponent(type);
    case 'mnemo':
      return <Typography>Мнемосхема</Typography>;
    case 'charts':
      return <Typography>Графики</Typography>;
    default:
      return <Typography>Страница</Typography>;
  }
};

export const HomePage = () => {
  const navigate = useNavigate();
  const params = useParams<{ type?: string; id?: string; sub?: string }>();

  const { type, id } = parseRouteParams(params.type, params.id);
  const sub = params.sub ?? DEFAULT_SUB;

  // Проверяем существование вкладки
  const currentTab = TABS.find((tab) => tab.type === type && tab.id === id);
  const subExists = currentTab?.subTabs.some((t) => t.value === sub);

  useEffect(() => {
    if (!currentTab) {
      // Если вкладка не найдена, перенаправляем на первую
      const firstTab = TABS[0];
      if (firstTab) {
        navigate(getRoutePath(firstTab.type, firstTab.id, DEFAULT_SUB), { replace: true });
      }
      return;
    }
    if (!subExists) {
      navigate(getRoutePath(type, id, DEFAULT_SUB), { replace: true });
    }
  }, [currentTab, subExists, type, id, navigate]);

  const handleMainChange = (nextMain: string, nextSub: string) => {
    // nextMain это value типа "carbonization-1", нужно распарсить
    const nextTab = TABS.find((tab) => tab.value === nextMain);
    if (nextTab) {
      navigate(getRoutePath(nextTab.type, nextTab.id, nextSub));
    }
  };

  const handleSubChange = (nextSub: string) => {
    navigate(getRoutePath(type, id, nextSub));
  };

  const content = useMemo(() => renderSubTabContent(sub, type), [sub, type]);

  if (!currentTab || !subExists) {
    return null;
  }

  // Для HomeTabs используем value для обратной совместимости
  const mainTabValue = `${type}-${id}`;

  return (
    <div className={`${styles['homePage']}`}>
      <HomeTabs mainTab={mainTabValue} subTab={sub} onMainChange={handleMainChange} onSubChange={handleSubChange}>
        {content}
      </HomeTabs>
    </div>
  );
};
