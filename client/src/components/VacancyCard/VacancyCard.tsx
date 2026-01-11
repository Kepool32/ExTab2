import { Paper, Text, Group, ActionIcon, Stack, Center } from '@mantine/core';
import { IconMapPin, IconStar, IconStarFilled } from '@tabler/icons-react';
import { useVacanciesStore } from '@store/vacanciesStore';
import type { Vacancy, Favorite } from '@types';
import { useState, useEffect } from 'react';
import styles from '@components/VacancyCard/VacancyCard.module.css';

interface VacancyCardProps {
  vacancy: Vacancy | null | undefined;
  onCardClick?: () => void;
}

export function VacancyCard({ vacancy, onCardClick }: VacancyCardProps) {
  const { favorites, addToFavorites, removeFromFavorites } = useVacanciesStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!vacancy || !vacancy.id) return;
    const favorite = favorites.find((f: Favorite) => f.vacancyId === vacancy.id);
    setIsFavorite(!!favorite);
  }, [favorites, vacancy]);

  const formatSalary = (salary?: string) => {
    if (!salary) return null;
    const firstNumber = salary.split(' - ')[0].split(' ')[0].trim();
    return `з/п от ${firstNumber} rub`;
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!vacancy || !vacancy.id) return;
    try {
      if (isFavorite) {
        const favorite = favorites.find((f: Favorite) => f.vacancyId === vacancy.id);
        if (favorite) {
          await removeFromFavorites(favorite.id);
        }
      } else {
        await addToFavorites(vacancy.id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (!vacancy || !vacancy.id) {
    return (
      <Paper p={24} radius={12} withBorder>
        <Center>
          <Text c="dimmed" size="md">
            Данные вакансии недоступны
          </Text>
        </Center>
      </Paper>
    );
  }

  return (
    <Paper
      className={`${styles.card} ${onCardClick ? styles.clickable : ''}`}
      p={24}
      radius={12}
      withBorder
      onClick={onCardClick}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap" gap={90}>
        <Stack gap={12} className={styles.contentStack}>
          <Text
            className={styles.title}
            size="lg"
            fw={600}
            c="#5E96FC"
            lineClamp={2}
          >
            {vacancy.title}
          </Text>

          <Group gap={12} wrap="wrap" align="center">
            {vacancy.salary && (
              <Text size="md" fw={600} c="#232134">
                {formatSalary(vacancy.salary)}
              </Text>
            )}
            {vacancy.salary && (
              <Text c="#7B7C88" size="xl" className={styles.bullet}>
                •
              </Text>
            )}
            <Text size="md" c="#232134">
              {vacancy.employmentType || 'Полный рабочий день'}
            </Text>
          </Group>

          {vacancy.location && (
            <Group gap={8} wrap="nowrap">
              <IconMapPin size={20} color="#ACADB9" />
              <Text size="md" c="#232134">
                {vacancy.location}
              </Text>
            </Group>
          )}
        </Stack>

        <ActionIcon
          variant="transparent"
          size={24}
          onClick={handleFavoriteClick}
          className={styles.favoriteButton}
        >
          {isFavorite ? (
            <IconStarFilled size={22} color="#5E96FC" fill="#5E96FC" />
          ) : (
            <IconStar size={22} color="#ACADB9" />
          )}
        </ActionIcon>
      </Group>
    </Paper>
  );
}
