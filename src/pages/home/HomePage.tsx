import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DEFAULT_MAIN, DEFAULT_SUB, TABS } from '@features/home/model/tabs';
import { HomeTabs } from '@features/home/ui/HomeTabs';
import styles from './HomePage.module.scss'

export const HomePage = () => {
  const navigate = useNavigate();
  const params = useParams<{ main?: string; sub?: string }>();

  const main = params.main ?? DEFAULT_MAIN;
  const sub = params.sub ?? DEFAULT_SUB;

  const mainExists = TABS.some((tab) => tab.value === main);
  const subExists = TABS.find((tab) => tab.value === main)?.subTabs.some((t) => t.value === sub);

  useEffect(() => {
    if (!mainExists) {
      navigate(`/${DEFAULT_MAIN}/${DEFAULT_SUB}`, { replace: true });
      return;
    }
    if (!subExists) {
      navigate(`/${main}/${DEFAULT_SUB}`, { replace: true });
    }
  }, [mainExists, subExists, main, navigate]);

  const handleMainChange = (nextMain: string, nextSub: string) => {
    navigate(`/${nextMain}/${nextSub}`);
  };

  const handleSubChange = (nextSub: string) => {
    navigate(`/${main}/${nextSub}`);
  };

  if (!mainExists || !subExists) {
    return null;
  }

  return (
    <div className={`${styles['homePage']}`}>
      <HomeTabs mainTab={main} subTab={sub} onMainChange={handleMainChange} onSubChange={handleSubChange} />
    </div>
  );
};
