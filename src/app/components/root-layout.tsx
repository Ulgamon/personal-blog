import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { CommandPalette } from '@/app/components/command-palette';
import { mockBlogPosts } from '@/app/routes';
import { generateSlug } from '@/app/utils/slug';

export function RootLayout() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const navigate = useNavigate();

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  return (
    <>
      <Outlet context={{ onCommandOpen: () => setIsCommandPaletteOpen(true) }} />
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)}
        posts={mockBlogPosts}
        onPostSelect={(post) => {
          const slug = generateSlug(post.title);
          navigate(`/blog/${slug}`);
          setIsCommandPaletteOpen(false);
        }}
        onNavigate={(page) => {
          const routes: Record<string, string> = {
            'home': '/',
            'resume': '/resume',
            'certifications': '/certifications',
            'contact': '/contact'
          };
          navigate(routes[page] || '/');
          setIsCommandPaletteOpen(false);
        }}
      />
    </>
  );
}