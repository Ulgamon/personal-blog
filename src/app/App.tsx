import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { CommandPalette } from '@/app/components/command-palette';
import { router, mockBlogPosts } from '@/app/routes';
import { generateSlug } from '@/app/utils/slug';
import { useNavigate } from 'react-router';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
  slug: string;
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;