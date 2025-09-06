import { useEffect, useState } from 'react';
import { ActionIcon, Group, Loader, ScrollArea, Text } from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconFile, IconFolder } from '@tabler/icons-react';
import { fetchTree, TreeNode } from '../../api/notebooks';

export type NotebookTreeProps = {
  onSelect: (path: string) => void;
};

function TreeItem({ node, onSelect }: { node: TreeNode; onSelect: (p: string) => void }) {
  const [open, setOpen] = useState(false);

  const isDir = node.type === 'directory';

  return (
    <div style={{ paddingLeft: 8 }}>
      <Group gap="xs" wrap="nowrap" onClick={() => (isDir ? setOpen((o) => !o) : onSelect(node.path))} style={{ cursor: 'pointer' }}>
        {isDir ? (
          <ActionIcon variant="subtle" size="sm" aria-label={open ? 'Collapse' : 'Expand'}>
            {open ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
          </ActionIcon>
        ) : (
          <span style={{ width: 24 }} />
        )}
        {isDir ? <IconFolder size={16} /> : <IconFile size={16} />}
        <Text size="sm">{node.name || 'notebooks'}</Text>
      </Group>
      {isDir && open && node.children?.map((child) => <TreeItem key={child.path + child.name} node={child} onSelect={onSelect} />)}
    </div>
  );
}

export function NotebookTree({ onSelect }: NotebookTreeProps) {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTree('');
        setRoot(data);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load notebooks');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader size="sm" />;
  if (error) return <Text c="red">{error}</Text>;
  if (!root) return <Text size="sm">No notebooks found.</Text>;

  return (
    <ScrollArea h="100%" type="auto">
      <div style={{ padding: 8 }}>
        <TreeItem node={root} onSelect={onSelect} />
      </div>
    </ScrollArea>
  );
}
