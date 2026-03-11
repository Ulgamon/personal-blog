import type { BlogPost } from "../App";

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findPostBySlug(posts: BlogPost[], slug: string) {
  return posts.find((post) => generateSlug(post.title) === slug);
}
