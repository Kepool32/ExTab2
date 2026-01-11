import { Container, Tabs, Group, Text } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '@components/TopBar/TopBar.module.css';

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname === '/favorites' ? 'favorites' : 'search';

  return (
    <div className={styles.topBar}>
      <Container size="xl" className={styles.container}>
        <div className={styles.contentWrapper}>
          <Group 
            gap={12} 
            className={`${styles.logoGroup} ${styles.clickable}`}
            onClick={() => navigate('/')}
          >
            <img src="/icons/logo.svg" alt="Jobored" className={styles.logo} />
            <Text size="xl" fw={600} c="#232134" className={styles.logoText}>
              Jobored
            </Text>
          </Group>

          <div className={styles.tabsWrapper}>
            <Tabs
              value={activeTab}
              onChange={(value: string | null) => {
                if (value === 'favorites') {
                  navigate('/favorites');
                } else {
                  navigate('/');
                }
              }}
            >
              <Tabs.List className={styles.tabsList}>
                <Tabs.Tab value="search" className={styles.tab}>
                  Поиск Вакансий
                </Tabs.Tab>
                <Tabs.Tab value="favorites" className={styles.tab}>
                  Избранное
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
}
