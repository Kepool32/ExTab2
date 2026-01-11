import { Stack, Text, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import styles from '@components/EmptyFavoritesState/EmptyFavoritesState.module.css';

export function EmptyFavoritesState() {
  const navigate = useNavigate();

  return (
    <Center className={styles.container}>
      <Stack gap={32} align="center" className={styles.content}>
        <div className={styles.imageWrapper}>
          <img 
            src="/images/empty-favorites.svg" 
            alt="Пустое избранное" 
            className={styles.image}
          />
        </div>
        
        <Stack gap={16} align="center">
          <Text className={styles.title} size="xl" fw={700} c="#232134" ta="center">
            Упс, здесь еще ничего нет
          </Text>
          
          <button
            className={styles.button}
            onClick={() => navigate('/')}
          >
            Поиск Вакансий
          </button>
        </Stack>
      </Stack>
    </Center>
  );
}
