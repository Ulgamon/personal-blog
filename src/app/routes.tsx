/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router";
import { BlogListView } from "@/app/components/blog-list-view";
import { BlogPostView } from "@/app/components/blog-post-view";
import { ResumeView } from "@/app/components/resume-view";
import { CertificationsView } from "@/app/components/certifications-view";
import { ContactView } from "@/app/components/contact-view";
import { RootLayout } from "@/app/components/root-layout";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { useEffect } from "react";
import { findPostBySlug } from "@/app/utils/slug";
import type { BlogPost } from "@/app/App";

// Mock blog data - same as in App.tsx
export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "AutoMapper and Overposting Attacks: Mapping Safely in ASP.NET",
    excerpt:
      "Learn how AutoMapper helps protect ASP.NET applications from overposting attacks by enforcing explicit data mapping and controlling what clients are allowed to modify.",
    content: `# AutoMapper and Overposting Attacks: Mapping Safely in ASP.NET

Overposting attacks are a common but often overlooked security vulnerability in web applications. They occur when a client sends more data than intended, potentially modifying sensitive properties that should never be user-controlled.

AutoMapper, when used correctly, plays a key role in preventing this class of vulnerabilities by enforcing clear boundaries between external input and internal domain models.

## What Is an Overposting Attack?

An overposting attack happens when an API endpoint binds incoming request data directly to a domain or persistence model.

### Vulnerable Example

\`\`\`csharp
[HttpPost]
public async Task<IActionResult> UpdateUser(User user)
{
    _context.Users.Update(user);
    await _context.SaveChangesAsync();
    return Ok();
}
\`\`\`

If the \`User\` entity contains properties like \`IsAdmin\`, \`Role\`, or \`PasswordHash\`, a malicious client can include them in the request body and update values they should not control.

This is not a theoretical issue—it's a real-world vulnerability.

## Why DTOs Are Critical

The first layer of defense is **Data Transfer Objects (DTOs)**.

DTOs define *exactly* which fields a client is allowed to send.

\`\`\`csharp
public class UpdateUserDto
{
    public string DisplayName { get; set; }
    public string Email { get; set; }
}
\`\`\`

By design, sensitive fields are excluded.

## Where AutoMapper Fits In

AutoMapper ensures that only explicitly defined properties are mapped from DTOs to domain models.

### Safe Mapping Example

\`\`\`csharp
[HttpPost]
public async Task<IActionResult> UpdateUser(int id, UpdateUserDto dto)
{
    var user = await _context.Users.FindAsync(id);
    if (user == null) return NotFound();

    _mapper.Map(dto, user);

    await _context.SaveChangesAsync();
    return Ok();
}
\`\`\`

Here's why this is safe:
- The client can only send fields defined in \`UpdateUserDto\`
- AutoMapper maps only those properties
- Sensitive properties remain untouched

## Enforcing Explicit Mapping Rules

AutoMapper profiles allow you to be explicit and defensive.

\`\`\`csharp
public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UpdateUserDto, User>()
            .ForAllOtherMembers(opt => opt.Ignore());
    }
}
\`\`\`

This ensures:
- Only explicitly mapped fields are updated
- New properties added to \`User\` later are not accidentally exposed

This is a powerful safeguard against future regressions.

## Comparing Safe vs Unsafe Approaches

### ❌ Unsafe
- Model binding directly to entities
- No clear boundary between API input and persistence
- Easy to introduce privilege escalation

### ✅ Safe
- DTOs define allowed input
- AutoMapper controls mapping behavior
- Explicit profiles prevent accidental exposure

## Common Mistakes to Avoid

1. **Mapping DTOs directly to database models without profiles**
2. **Reusing the same DTO for create and update operations**
3. **Allowing AutoMapper to implicitly map all matching properties**
4. **Skipping DTOs entirely for “simple” endpoints**

Security bugs often hide in “simple” code.

## Defense in Depth

AutoMapper should be part of a broader security strategy:
- Validate input data
- Enforce authorization checks
- Use separate DTOs for different operations
- Review mappings when domain models change

AutoMapper helps, but it's not a silver bullet—it enforces discipline.

## Conclusion

Overposting attacks are easy to introduce and hard to detect without proper structure. AutoMapper, combined with well-designed DTOs and explicit mapping profiles, provides a strong defense against unintended data modification.

By clearly separating external input from internal models, you reduce risk, improve maintainability, and build safer applications by default.

> Security is not about reacting to attacks—it's about designing systems where entire classes of vulnerabilities are impossible.

`,
    author: "Justin Ilić",
    date: "2026-02-12",
    readTime: "8 min read",
    category: "Security",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    tags: ["AutoMapper", "ASP.NET", "Security", "Overposting", "Secure Coding"],
    slug: "automapper-overposting-attacks-secure-mapping",
  },
  {
    id: 1,
    title: "Introducing Algo.Observer: Learning Algorithms Through Observation",
    excerpt:
      "Algo.Observer is an early-stage project focused on making algorithms easier to understand through visualization, documentation, and experimentation.",
    content: `# Introducing Algo.Observer

[Algo.Observer](https://www.algo.observer/) is an early-stage learning platform focused on helping developers understand algorithms by *observing how they work*, not just reading about them.

The project is intentionally starting small, with the goal of growing into an interactive space where algorithms, data structures, and system behaviors can be explored step by step.

## Why Algo.Observer?

Algorithms are often taught as static code snippets or abstract explanations. While useful, this approach can make it difficult to build intuition about how algorithms behave in real scenarios.

Algo.Observer aims to bridge that gap by combining:
- Clear explanations
- Visual representations
- Incremental execution
- Practical examples

The goal is not to replace textbooks or courses, but to complement them.

## Current State

At the moment, Algo.Observer is in **early development**.

What exists today:
- A foundation for structured content
- Early examples of algorithm-focused articles
- Initial layout and navigation concepts

What does not exist yet:
- Full visualizations
- Interactive controls
- Comprehensive algorithm coverage

And that’s intentional.

## Planned Direction

As the platform evolves, future iterations will focus on:
- Interactive algorithm visualizations
- Step-by-step execution views
- Clear separation between theory and implementation
- Documentation-style explanations backed by visuals
- A focus on correctness, clarity, and learning efficiency

The emphasis will always be on understanding *why* something works, not just *how* to implement it.

## Who Is This For?

Algo.Observer is being built for:
- Developers learning algorithms for the first time
- Engineers revisiting fundamentals
- Anyone who prefers visual and exploratory learning
- People who want depth without unnecessary complexity

## Looking Ahead

This initial version is just the starting point. The structure, content, and tooling will evolve over time as ideas are tested and refined.

Algo.Observer is a long-term project, and this post serves as a snapshot of its earliest stage.

> The best way to understand an algorithm is to watch it work.

You can follow the project at  
👉 https://www.algo.observer/

More content and features will follow.
`,
    author: "Justin Ilić",
    date: "2026-01-10",
    readTime: "4 min read",
    category: "Project",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    tags: ["Algorithms", "Learning", "Visualization", "Education"],
    slug: "introducing-algo-observer",
  },
];

// Blog Post Page Component
function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { onCommandOpen } = useOutletContext<{ onCommandOpen: () => void }>();
  const post = findPostBySlug(mockBlogPosts, slug || "");

  if (!post) {
    // Redirect to home if post not found
    useEffect(() => {
      navigate("/");
    }, [navigate]);
    return null;
  }

  return <BlogPostView post={post} onCommandOpen={onCommandOpen} />;
}

// Home/Blog List Page
function HomePage() {
  const { onCommandOpen } = useOutletContext<{ onCommandOpen: () => void }>();
  return <BlogListView posts={mockBlogPosts} onCommandOpen={onCommandOpen} />;
}

// Resume Page
function ResumePage() {
  const { onCommandOpen } = useOutletContext<{ onCommandOpen: () => void }>();
  return <ResumeView onCommandOpen={onCommandOpen} />;
}

// Certifications Page
function CertificationsPage() {
  const { onCommandOpen } = useOutletContext<{ onCommandOpen: () => void }>();
  return <CertificationsView onCommandOpen={onCommandOpen} />;
}

// Contact Page
function ContactPage() {
  const { onCommandOpen } = useOutletContext<{ onCommandOpen: () => void }>();
  return <ContactView onCommandOpen={onCommandOpen} />;
}

// Create the router
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "blog/:slug",
        Component: BlogPostPage,
      },
      {
        path: "resume",
        Component: ResumePage,
      },
      {
        path: "certifications",
        Component: CertificationsPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
    ],
  },
]);
