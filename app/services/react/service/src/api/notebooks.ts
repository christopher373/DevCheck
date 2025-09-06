export type TreeNode = {
  name: string;
  path: string; // relative to notebooks root
  type: 'directory' | 'file';
  children?: TreeNode[];
};

const DEFAULT_BACKEND = `http://${window.location.hostname}:8000`;
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string) || DEFAULT_BACKEND;

export async function fetchTree(path = ''): Promise<TreeNode> {
  const url = new URL('/api/notebooks/list', BACKEND_URL);
  if (path) url.searchParams.set('path', path);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load tree: ${res.status}`);
  return res.json();
}

export function getNotebookHtmlUrl(path: string): string {
  const url = new URL('/api/notebooks/html', BACKEND_URL);
  url.searchParams.set('path', path);
  return url.toString();
}
