import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Paper, Text, Group, Button, Loader, Center } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { useVacanciesStore } from '@store/vacanciesStore';
import styles from '@pages/VacancyDetailsPage/VacancyDetailsPage.module.css';

export function VacancyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedVacancy, isLoading, error, fetchVacancyById } = useVacanciesStore();

  useEffect(() => {
    if (id) {
      fetchVacancyById(Number(id));
    }
  }, [id, fetchVacancyById]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Center py={60}>
            <Loader size="lg" />
          </Center>
        </div>
      </div>
    );
  }

  if (error || !selectedVacancy) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Center py={60}>
            <Stack gap={16} align="center">
              <Text c="dimmed" size="lg" ta="center">
                {error || 'Вакансия не найдена'}
              </Text>
              <Button onClick={() => navigate('/')} variant="light">
                Вернуться к поиску
              </Button>
            </Stack>
          </Center>
        </div>
      </div>
    );
  }

  const formatSalary = (salary?: string) => {
    if (!salary) return null;
    const firstNumber = salary.split(' - ')[0].split(' ')[0].trim();
    return `з/п от ${firstNumber} rub`;
  };

  const parseRequirements = (requirements?: string) => {
    if (!requirements) return [];
    return requirements.split(',').map((req) => req.trim()).filter(Boolean);
  };

  const parseSkills = (skills?: string) => {
    if (!skills) return [];
    return skills.split(',').map((skill) => skill.trim()).filter(Boolean);
  };

  const parseEmploymentType = (employmentType?: string) => {
    if (!employmentType) return [];
    return employmentType.split(',').map((type) => type.trim()).filter(Boolean);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Stack gap={20} className={styles.content}>
          <Paper className={styles.headerCard} p={24} radius={12} withBorder>
            <Stack gap={16} className={styles.headerStack}>
              <Text className={styles.title} size="xl" fw={700} c="#232134">
                {selectedVacancy.title}
              </Text>

              <Group gap={12} wrap="wrap" align="center">
                {selectedVacancy.salary && (
                  <Text size="lg" fw={600} c="#232134">
                    {formatSalary(selectedVacancy.salary)}
                  </Text>
                )}
                {selectedVacancy.salary && (
                  <Text c="#7B7C88" size="xl" className={styles.bullet}>
                    •
                  </Text>
                )}
                {selectedVacancy.employmentType && (
                  <Text size="lg" c="#232134">
                    {selectedVacancy.employmentType}
                  </Text>
                )}
              </Group>

              {selectedVacancy.location && (
                <Group gap={8} wrap="nowrap">
                  <IconMapPin size={20} color="#ACADB9" />
                  <Text size="lg" c="#232134">
                    {selectedVacancy.location}
                  </Text>
                </Group>
              )}
            </Stack>
          </Paper>

          {selectedVacancy.requirements && (
            <Paper className={styles.sectionCard} p={24} radius={12} withBorder>
              <Text className={styles.sectionTitle} size="lg" fw={700} mb={16} c="#232134">
                Обязанности
              </Text>
              <div className={styles.listContainer}>
                {parseRequirements(selectedVacancy.requirements).map((requirement, index) => (
                  <div key={index} className={styles.listItem}>
                    <span className={styles.dot}>•</span>
                    <Text className={styles.sectionText} size="md" c="#232134">
                      {requirement}
                    </Text>
                  </div>
                ))}
              </div>
            </Paper>
          )}

          {selectedVacancy.skills && (
            <Paper className={styles.sectionCard} p={24} radius={12} withBorder>
              <Text className={styles.sectionTitle} size="lg" fw={700} mb={16} c="#232134">
                Требования
              </Text>
              <div className={styles.listContainer}>
                {parseSkills(selectedVacancy.skills).map((skill, index) => (
                  <div key={index} className={styles.listItem}>
                    <span className={styles.dot}>•</span>
                    <Text className={styles.sectionText} size="md" c="#232134">
                      {skill}
                    </Text>
                  </div>
                ))}
              </div>
            </Paper>
          )}

          {selectedVacancy.employmentType && parseEmploymentType(selectedVacancy.employmentType).length > 0 && (
            <Paper className={styles.sectionCard} p={24} radius={12} withBorder>
              <Text className={styles.sectionTitle} size="lg" fw={700} mb={16} c="#232134">
                Условие
              </Text>
              <div className={styles.listContainer}>
                {parseEmploymentType(selectedVacancy.employmentType).map((condition, index) => (
                  <div key={index} className={styles.listItem}>
                    <span className={styles.dot}>•</span>
                    <Text className={styles.sectionText} size="md" c="#232134">
                      {condition}
                    </Text>
                  </div>
                ))}
              </div>
            </Paper>
          )}
        </Stack>
      </div>
    </div>
  );
}
