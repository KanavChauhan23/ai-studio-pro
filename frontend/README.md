# AI Studio Pro - Frontend

Next.js 14 frontend for AI Studio Pro

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **HTTP Client:** Axios
- **UI Components:** Custom + Lucide Icons
- **Notifications:** React Hot Toast

## 📁 Project Structure

```
src/
├── app/               # Pages (App Router)
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── generate/
│   │   ├── text/
│   │   ├── image/
│   │   └── code/
│   ├── layout.tsx
│   └── page.tsx
├── components/        # Reusable components
│   ├── ui/           # UI components
│   └── Navbar.tsx
├── lib/              # Utilities
│   ├── api.ts        # API client
│   ├── auth.ts       # Auth store
│   └── utils.ts      # Helper functions
└── styles/
    └── globals.css   # Global styles
```

## 🔧 Configuration

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 🎨 Features

- ✅ User authentication (JWT)
- ✅ Text content generation
- ✅ AI image generation
- ✅ Code generation
- ✅ Content history dashboard
- ✅ Responsive design
- ✅ Dark theme ready
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on Vercel
3. Set root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy!

### Netlify

1. Push code to GitHub
2. Import project on Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy!

## 📚 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## 🎯 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

## 💻 Development

### Adding a New Page

1. Create file in `src/app/your-page/page.tsx`
2. Export default React component
3. Add route to navbar if needed

### Adding a New Component

1. Create file in `src/components/YourComponent.tsx`
2. Use TypeScript for props
3. Import and use

### API Calls

Use the configured API client:

```typescript
import api from '@/lib/api';

// GET request
const response = await api.get('/endpoint');

// POST request
const response = await api.post('/endpoint', data);
```

## 🐛 Common Issues

**Module not found:**
```bash
npm install
```

**Build errors:**
```bash
rm -rf .next
npm run dev
```

**Environment variables not working:**
- Restart dev server after changing `.env.local`
- Variables must start with `NEXT_PUBLIC_` to be accessible in browser

## 📄 License

MIT

## 👨‍💻 Author

Kanav Chauhan
