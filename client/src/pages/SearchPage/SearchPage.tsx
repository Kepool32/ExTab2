import { useState, useEffect } from 'react';
import { Stack, TextInput, Button, Group, Pagination, Loader, Center, Text, Box } from '@mantine/core';
import { useVacanciesStore } from '@store/vacanciesStore';
import { VacancyCard } from '@components/VacancyCard/VacancyCard';
import { useNavigate } from 'react-router-dom';
import { useInput } from '@hooks';
import styles from '@pages/SearchPage/SearchPage.module.css';

const ITEMS_PER_PAGE = 4;

export function SearchPage() {
  const navigate = useNavigate();
  const { vacancies, paginationMeta, isLoading, error, fetchVacancies, fetchFavorites } = useVacanciesStore();
  const searchInput = useInput('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetchVacancies({ 
      keyword: activeSearchQuery || undefined, 
      page: activePage, 
      limit: ITEMS_PER_PAGE 
    });
  }, [activePage, activeSearchQuery, fetchVacancies]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleSearch = () => {
    setActiveSearchQuery(searchInput.value);
    setActivePage(1);
  };

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const handleCardClick = (vacancyId: number) => {
    navigate(`/vacancies/${vacancyId}`);
  };

  const totalPages = paginationMeta?.totalPages || 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Stack gap={16} align="center" className={styles.mainStack}>
          <Group gap={16} className={styles.searchGroup}>
            <TextInput
              placeholder="Введите название вакансии"
              value={searchInput.value}
              onChange={searchInput.onChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              size="md"
              className={styles.searchInput}
            />
            <Button
              onClick={handleSearch}
              className={styles.searchButton}
            >
              Поиск
            </Button>
          </Group>

          {isLoading ? (
            <Center py={60}>
              <Loader size="lg" />
            </Center>
          ) : error ? (
            <Center py={60}>
              <Stack gap={8} align="center">
                <Text c="dimmed" size="lg" ta="center">
                  Не удалось загрузить вакансии
                </Text>
                <Text c="dimmed" size="sm" ta="center">
                  {error}
                </Text>
              </Stack>
            </Center>
          ) : !vacancies || vacancies.length === 0 ? (
            <Center py={60}>
              <Text c="dimmed" size="lg">
                {activeSearchQuery ? 'Вакансии не найдены' : 'Вакансии отсутствуют'}
              </Text>
            </Center>
          ) : (
            <>
              <Stack gap={16} align="center">
                {vacancies && vacancies.map((vacancy) => (
                  <VacancyCard
                    key={vacancy.id}
                    vacancy={vacancy}
                    onCardClick={() => handleCardClick(vacancy.id)}
                  />
                ))}
              </Stack>

              {totalPages > 1 && (
                <Box className={styles.paginationBox}>
                  <Pagination
                    value={activePage}
                    onChange={handlePageChange}
                    total={totalPages}
                    size="md"
                    radius="xs"
                    withControls={true}
                    className={styles.paginationWrapper}
                  />
                </Box>
              )}
            </>
          )}
        </Stack>
      </div>
    </div>
  );
}
