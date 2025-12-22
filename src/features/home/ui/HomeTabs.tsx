import { useMemo, type SyntheticEvent } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Button } from '@shared/ui';
import { DEFAULT_SUB, TABS, type MainTab } from '../model/tabs';
import styles from './HomeTabs.module.scss';

type HomeTabsProps = {
  mainTab: string;
  subTab: string;
  onMainChange: (value: string, nextSub: string) => void;
  onSubChange: (value: string) => void;
};

export const HomeTabs = ({ mainTab, subTab, onMainChange, onSubChange }: HomeTabsProps) => {
  const activeMain = useMemo<MainTab | undefined>(() => TABS.find((tab) => tab.value === mainTab), [mainTab]);

  const activeSubContent = useMemo(() => {
    return activeMain?.subTabs.find((t) => t.value === subTab)?.content ?? null;
  }, [activeMain, subTab]);

  const handleMainChange = (_: SyntheticEvent, value: string) => {
    const nextMain = TABS.find((tab) => tab.value === value);
    const nextSub = nextMain?.subTabs[0]?.value ?? DEFAULT_SUB;
    onMainChange(value, nextSub);
  };

  return (
    <>
      <Box className={styles['homeTabs__tabs']}>
        <Tabs value={mainTab} onChange={handleMainChange} textColor='primary' indicatorColor='primary'>
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {activeMain?.subTabs.length ? (
        <Box className={styles['homeTabs__subTabs']}>
          {activeMain.subTabs.map((tab) => (
            <Button
              key={tab.value}
              variant={subTab === tab.value ? 'contained' : 'outlined'}
              color='primary'
              onClick={() => onSubChange(tab.value)}
              size='small'
              startIcon={tab.icon}
            >
              {tab.label}
            </Button>
          ))}
        </Box>
      ) : null}

      <Box className={styles['homeTabs__content']}>{activeSubContent}</Box>
    </>
  );
};
