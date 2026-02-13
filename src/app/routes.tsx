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
    title: "Understanding OAuth 2.0 Security Best Practices",
    excerpt:
      "A practical guide to implementing secure OAuth 2.0 flows and avoiding common vulnerabilities in modern authentication systems.",
    content: `# Understanding OAuth 2.0 Security Best Practices

OAuth 2.0 is the industry-standard protocol for authorization, but implementing it securely requires understanding its nuances and potential pitfalls.

## Core Security Principles

When implementing OAuth 2.0, security must be considered at every step of the authorization flow.

### The Authorization Code Flow

The authorization code flow with PKCE (Proof Key for Code Exchange) is now the recommended approach for all client types:

\`\`\`javascript
// Generate code verifier and challenge
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  return crypto.subtle.digest('SHA-256', data)
    .then(hash => base64URLEncode(new Uint8Array(hash)));
}
\`\`\`

### Common Vulnerabilities

1. **Missing PKCE**: Always use PKCE, even for confidential clients
2. **Inadequate state validation**: Prevent CSRF by validating state parameters
3. **Token leakage**: Never expose tokens in URLs or logs
4. **Insufficient scope validation**: Implement principle of least privilege

## Secure Token Storage

Never store tokens in localStorage or sessionStorage in browsers:

\`\`\`javascript
// Bad: Vulnerable to XSS
localStorage.setItem('access_token', token);

// Good: Use httpOnly cookies
// Set via server with httpOnly, secure, and sameSite flags
\`\`\`

### Token Rotation

Implement refresh token rotation to limit the impact of token theft:

\`\`\`javascript
async function refreshAccessToken(refreshToken) {
  const response = await fetch('/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID
    })
  });
  
  const { access_token, refresh_token } = await response.json();
  
  // Old refresh token is now invalid
  return { accessToken: access_token, refreshToken: refresh_token };
}
\`\`\`

## Validation and Verification

Always validate tokens on the backend:

\`\`\`javascript
function validateAccessToken(token) {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
      issuer: EXPECTED_ISSUER,
      audience: EXPECTED_AUDIENCE
    });
    
    return decoded;
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }
}
\`\`\`

> Security is not a feature—it's a requirement. Treat OAuth implementation with the care it deserves.

## Monitoring and Incident Response

Log authentication events and monitor for suspicious patterns:
- Multiple failed authentication attempts
- Unusual geographic locations
- Token reuse attempts
- Rapid token refresh patterns

## Conclusion

OAuth 2.0 security requires careful implementation, constant vigilance, and staying updated with evolving best practices. Always use battle-tested libraries and keep dependencies updated.`,
    author: "Justin Ilić",
    date: "2026-02-10",
    readTime: "9 min read",
    category: "Security",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80",
    tags: ["OAuth", "Authentication", "Security", "Web Security"],
    slug: "understanding-oauth-2-0-security-best-practices",
  },
  {
    id: 2,
    title: "Building Secure CI/CD Pipelines",
    excerpt:
      "Learn how to secure your deployment pipeline from code commit to production, preventing supply chain attacks and unauthorized access.",
    content: `# Building Secure CI/CD Pipelines

A compromised CI/CD pipeline can be devastating. Here's how to build security into every stage of your deployment process.

## Pipeline Security Fundamentals

Your CI/CD pipeline is a critical attack surface that requires defense in depth.

### Secure Source Control

Start with securing your repository:

\`\`\`yaml
# .github/workflows/security.yml
name: Security Checks

on:
  pull_request:
    branches: [ main ]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run dependency scan
        run: npm audit --audit-level=high
      
      - name: SAST scanning
        uses: github/codeql-action/analyze@v2
      
      - name: Secret scanning
        uses: trufflesecurity/trufflehog@main
\`\`\`

### Secrets Management

Never hardcode secrets. Use proper secrets management:

\`\`\`yaml
# Bad: Exposed in code
DATABASE_URL=postgres://user:password@localhost/db

# Good: Use secret management
steps:
  - name: Deploy
    env:
      DATABASE_URL: \${{ secrets.DATABASE_URL }}
      API_KEY: \${{ secrets.API_KEY }}
\`\`\`

## Container Security

Secure your container images:

\`\`\`dockerfile
# Use minimal base images
FROM node:20-alpine AS builder

# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Multi-stage builds to reduce attack surface
FROM node:20-alpine AS runner
COPY --from=builder --chown=nodejs:nodejs /app ./
USER nodejs
\`\`\`

### Image Scanning

Always scan images for vulnerabilities:

\`\`\`yaml
- name: Scan image
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'myapp:latest'
    severity: 'CRITICAL,HIGH'
\`\`\`

## Access Control

Implement least privilege access:

\`\`\`yaml
permissions:
  contents: read
  id-token: write  # For OIDC
  
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v2
  with:
    role-to-assume: arn:aws:iam::123456789:role/deploy-role
    aws-region: us-east-1
\`\`\`

## Artifact Signing

Sign your build artifacts to ensure integrity:

\`\`\`bash
# Sign with Cosign
cosign sign --key cosign.key myregistry.io/myapp:latest

# Verify before deployment
cosign verify --key cosign.pub myregistry.io/myapp:latest
\`\`\`

## Monitoring and Audit

Log all pipeline activities and monitor for anomalies:
- Failed authentication attempts
- Unauthorized access attempts
- Unusual deployment patterns
- Configuration changes

> A secure pipeline is not built in a day. It requires continuous improvement and vigilance.

## Conclusion

Security must be built into your CI/CD pipeline from the start. Regular audits, monitoring, and updates are essential for maintaining a secure deployment process.`,
    author: "Justin Ilić",
    date: "2026-02-08",
    readTime: "10 min read",
    category: "Development / DevOps",
    imageUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&q=80",
    tags: ["DevOps", "CI/CD", "Security", "Infrastructure"],
    slug: "building-secure-ci-cd-pipelines",
  },
  {
    id: 3,
    title: "Preventing XSS Attacks in Modern Web Applications",
    excerpt:
      "Cross-site scripting remains one of the most common vulnerabilities. Here's how to protect your applications effectively.",
    content: `# Preventing XSS Attacks in Modern Web Applications

Cross-site scripting (XSS) vulnerabilities allow attackers to inject malicious scripts into your application. Understanding and preventing them is crucial for web security.

## Types of XSS

### Reflected XSS

Occurs when user input is immediately reflected in the response:

\`\`\`javascript
// Vulnerable code
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(\\\`<h1>Results for: \${query}</h1>\\\`);
});

// Secure version
app.get('/search', (req, res) => {
  const query = escapeHtml(req.query.q);
  res.send(\\\`<h1>Results for: \${query}</h1>\\\`);
});
\`\`\`

### Stored XSS

More dangerous—malicious script is stored and served to multiple users:

\`\`\`javascript
// Vulnerable: Direct rendering
function Comment({ text }) {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}

// Secure: Sanitize content
import DOMPurify from 'dompurify';

function Comment({ text }) {
  const clean = DOMPurify.sanitize(text);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
\`\`\`

### DOM-Based XSS

The vulnerability exists in client-side code:

\`\`\`javascript
// Vulnerable
const name = location.hash.substring(1);
document.getElementById('welcome').innerHTML = 'Welcome ' + name;

// Secure
const name = location.hash.substring(1);
document.getElementById('welcome').textContent = 'Welcome ' + name;
\`\`\`

## Defense Strategies

### Content Security Policy

Implement a strict CSP header:

\`\`\`javascript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none';"
  );
  next();
});
\`\`\`

### Input Validation

Validate and sanitize all user input:

\`\`\`javascript
function validateUsername(username) {
  // Only allow alphanumeric and underscore
  const pattern = /^[a-zA-Z0-9_]+$/;
  
  if (!pattern.test(username)) {
    throw new Error('Invalid username format');
  }
  
  return username;
}
\`\`\`

### Output Encoding

Context-aware encoding is critical:

\`\`\`javascript
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeJavaScript(unsafe) {
  return unsafe
    .replace(/\\\\/g, '\\\\\\\\')
    .replace(/'/g, "\\\\'")
    .replace(/"/g, '\\\\"')
    .replace(/\\n/g, '\\\\n')
    .replace(/\\r/g, '\\\\r');
}
\`\`\`

## Framework-Specific Protection

### React

React escapes by default, but be careful with:

\`\`\`javascript
// Safe by default
<div>{userInput}</div>

// Dangerous - avoid unless absolutely necessary
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// If you must use it, sanitize first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
\`\`\`

### Vue

\`\`\`vue
<!-- Safe -->
<div>{{ userInput }}</div>

<!-- Dangerous -->
<div v-html="userInput"></div>

<!-- Safe with sanitization -->
<div v-html="$sanitize(userInput)"></div>
\`\`\`

## Testing for XSS

Use automated tools and manual testing:

\`\`\`javascript
// Common XSS test payloads
const testPayloads = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  'javascript:alert(1)',
  '<svg onload=alert(1)>'
];
\`\`\`

> XSS prevention requires defense in depth. One layer is not enough.

## Conclusion

Preventing XSS requires a combination of input validation, output encoding, CSP, and secure coding practices. Always treat user input as untrusted and implement multiple layers of defense.`,
    author: "Justin Ilić",
    date: "2026-02-05",
    readTime: "8 min read",
    category: "Security",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
    tags: ["XSS", "Web Security", "Frontend", "Security"],
    slug: "preventing-xss-attacks-in-modern-web-applications",
  },
  {
    id: 4,
    title: "Modern Frontend State Management Patterns",
    excerpt:
      "Explore practical approaches to managing state in React applications, from simple context to advanced patterns.",
    content: `# Modern Frontend State Management Patterns

State management in frontend applications has evolved significantly. Let's explore practical patterns that work for real-world applications.

## Understanding State Types

Different types of state require different solutions:

### Server State

Data from your backend:

\`\`\`typescript
// Using React Query
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <Skeleton />;
  if (error) return <Error error={error} />;
  
  return <Profile user={data} />;
}
\`\`\`

### UI State

Temporary interface state:

\`\`\`typescript
function SearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
      />
    </Popover>
  );
}
\`\`\`

### Global State

Shared application state:

\`\`\`typescript
// Using Zustand
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (credentials) => {
    const user = await api.login(credentials);
    set({ user });
  },
  logout: () => set({ user: null })
}));
\`\`\`

## Choosing the Right Tool

### React Context

Good for theming, i18n, and configuration:

\`\`\`typescript
const ThemeContext = createContext<Theme | undefined>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
\`\`\`

### Zustand

Lightweight and flexible:

\`\`\`typescript
const useStore = create<State>((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}));

// Component
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return <button onClick={increment}>{count}</button>;
}
\`\`\`

### React Query / TanStack Query

Perfect for server state:

\`\`\`typescript
function Posts() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });
  
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
  
  return (
    <div>
      {data?.map(post => <PostCard key={post.id} post={post} />)}
      <CreateButton onClick={() => mutation.mutate(newPost)} />
    </div>
  );
}
\`\`\`

## Performance Optimization

### Selector Optimization

Avoid unnecessary re-renders:

\`\`\`typescript
// Bad: Creates new object on every render
const data = useStore(state => ({ 
  user: state.user, 
  settings: state.settings 
}));

// Good: Use separate selectors
const user = useStore(state => state.user);
const settings = useStore(state => state.settings);

// Or use shallow equality
import { shallow } from 'zustand/shallow';
const { user, settings } = useStore(
  state => ({ user: state.user, settings: state.settings }),
  shallow
);
\`\`\`

### Memoization

\`\`\`typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
\`\`\`

## Testing State

\`\`\`typescript
import { renderHook, act } from '@testing-library/react';

describe('useAuthStore', () => {
  it('should login user', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    await act(async () => {
      await result.current.login({ email, password });
    });
    
    expect(result.current.user).toBeDefined();
  });
});
\`\`\`

## Best Practices

1. **Co-locate state**: Keep state close to where it's used
2. **Lift state carefully**: Only lift when multiple components need it
3. **Use the right tool**: Not everything needs global state
4. **Optimize selectively**: Profile before optimizing
5. **Type your state**: Use TypeScript for better DX

> The best state management solution is the simplest one that solves your problem.

## Conclusion

Modern state management is about choosing the right tool for each type of state. Use local state when possible, Context for cross-cutting concerns, and specialized libraries for complex needs.`,
    author: "Justin Ilić",
    date: "2026-02-02",
    readTime: "9 min read",
    category: "Development / Frontend",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    tags: ["React", "State Management", "Frontend", "TypeScript"],
    slug: "modern-frontend-state-management-patterns",
  },
  {
    id: 5,
    title: "Building Resilient Backend APIs",
    excerpt:
      "Design patterns and practices for creating robust, scalable backend services that handle failures gracefully.",
    content: `# Building Resilient Backend APIs

Resilient APIs don't just work when everything is perfect—they handle failures gracefully and recover automatically.

## Core Resilience Patterns

### Timeouts

Always set appropriate timeouts:

\`\`\`typescript
async function fetchWithTimeout(
  url: string, 
  timeout: number = 5000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new TimeoutError('Request timed out');
    }
    throw error;
  }
}
\`\`\`

### Circuit Breaker

Prevent cascading failures:

\`\`\`typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  
  constructor(
    private threshold: number = 5,
    private timeout: number = 60000
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailTime > this.timeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }
  
  private onFailure() {
    this.failures++;
    this.lastFailTime = Date.now();
    
    if (this.failures >= this.threshold) {
      this.state = 'open';
    }
  }
}
\`\`\`

### Retry Logic

Implement exponential backoff:

\`\`\`typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        const jitter = Math.random() * 1000;
        await sleep(delay + jitter);
      }
    }
  }
  
  throw lastError;
}
\`\`\`

## Rate Limiting

Protect your API from abuse:

\`\`\`typescript
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of requests
  duration: 1, // Per second
});

app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (error) {
    res.status(429).json({ error: 'Too many requests' });
  }
});
\`\`\`

## Graceful Degradation

Provide fallback functionality:

\`\`\`typescript
async function getUserProfile(userId: string) {
  try {
    // Try primary data source
    return await fetchFromPrimaryDB(userId);
  } catch (error) {
    logger.warn('Primary DB failed, using cache', { userId, error });
    
    try {
      // Fallback to cache
      return await fetchFromCache(userId);
    } catch (cacheError) {
      logger.error('Cache failed, using default', { userId, cacheError });
      
      // Return minimal profile
      return getDefaultProfile(userId);
    }
  }
}
\`\`\`

## Health Checks

Implement comprehensive health endpoints:

\`\`\`typescript
app.get('/health', async (req, res) => {
  const checks = await Promise.allSettled([
    checkDatabase(),
    checkRedis(),
    checkExternalAPI()
  ]);
  
  const health = {
    status: checks.every(c => c.status === 'fulfilled') ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    checks: {
      database: checks[0].status,
      redis: checks[1].status,
      externalAPI: checks[2].status
    }
  };
  
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});
\`\`\`

## Error Handling

Provide meaningful error responses:

\`\`\`typescript
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
  }
}

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code,
        timestamp: new Date().toISOString()
      }
    });
  }
  
  // Log unexpected errors
  logger.error('Unexpected error', { error, req: { method: req.method, url: req.url } });
  
  res.status(500).json({
    error: {
      message: 'Internal server error',
      timestamp: new Date().toISOString()
    }
  });
});
\`\`\`

## Monitoring

Track key metrics:

\`\`\`typescript
import { Counter, Histogram } from 'prom-client';

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route']
});
\`\`\`

> Resilience is not a feature you add at the end—it must be built into your architecture from the start.

## Conclusion

Building resilient APIs requires implementing multiple layers of protection: timeouts, retries, circuit breakers, graceful degradation, and comprehensive monitoring. Test your failure scenarios and prepare for the unexpected.`,
    author: "Justin Ilić",
    date: "2026-01-30",
    readTime: "11 min read",
    category: "Development / Backend",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    tags: ["Backend", "API Design", "Resilience", "Node.js"],
    slug: "building-resilient-backend-apis",
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
