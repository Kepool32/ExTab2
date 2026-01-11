import { Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { TopBar } from '@components/TopBar';
import { SearchPage } from '@pages/SearchPage';
import { FavoritesPage } from '@pages/FavoritesPage';
import { VacancyDetailsPage } from '@pages/VacancyDetailsPage';
import { usePreventCopy } from '@hooks';

function App() {
  usePreventCopy();

  return (
    <MantineProvider>
      <TopBar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/vacancies/:id" element={<VacancyDetailsPage />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
