import { useState } from 'react';
import { Box, Grid, rem, Stack, Title } from '@mantine/core';
import { NotebookTree } from '../components/NotebookTree/NotebookTree';
import { getNotebookHtmlUrl } from '../api/notebooks';

export function NotebooksPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Grid gutter="md" p="md" style={{ height: '100vh', boxSizing: 'border-box' }}>
      <Grid.Col span={{ base: 12, sm: 4, md: 3 }} style={{ borderRight: '1px solid var(--mantine-color-gray-3)' }}>
        <Stack gap="xs">
          <Title order={4}>Notebooks</Title>
          <Box style={{ height: `calc(100vh - ${rem(120)})` }}>
            <NotebookTree onSelect={(p) => setSelected(p)} />
          </Box>
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8, md: 9 }}>
        <Stack gap="xs" style={{ height: '100%' }}>
          <Title order={4}>{selected || 'Select a notebook'}</Title>
          <Box style={{ flex: 1, minHeight: 0 }}>
            {selected ? (
              <iframe
                title={selected}
                src={getNotebookHtmlUrl(selected)}
                style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
              />
            ) : null}
          </Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
