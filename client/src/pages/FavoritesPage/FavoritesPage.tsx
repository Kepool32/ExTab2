import { useEffect } from 'react';
import { Stack, Center, Loader } from '@mantine/core';
import { useVacanciesStore } from '@store/vacanciesStore';
import { VacancyCard } from '@components/VacancyCard/VacancyCard';
import { EmptyFavoritesState } from '@components/EmptyFavoritesState/EmptyFavoritesState';
import { useNavigate } from 'react-router-dom';
import styles from '@pages/FavoritesPage/FavoritesPage.module.css';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, isLoadingFavorites, fetchFavorites } = useVacanciesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleCardClick = (vacancyId: number) => {
    navigate(`/vacancies/${vacancyId}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {isLoadingFavorites ? (
          <Center py={60}>
            <Loader size="lg" />
          </Center>
        ) : favorites.length === 0 ? (
          <EmptyFavoritesState />
        ) : (
          <Stack gap={16} align="center">
            {favorites
              .filter((favorite) => favorite.vacancy && favorite.vacancy.id)
              .map((favorite) => (
                <VacancyCard
                  key={favorite.id}
                  vacancy={favorite.vacancy}
                  onCardClick={() => handleCardClick(favorite.vacancy.id)}
                />
              ))}
          </Stack>
        )}
      </div>
    </div>
  );
}
