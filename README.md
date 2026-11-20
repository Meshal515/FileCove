# FileCove

> Files • Links • Share — صفحة باسمك لملفاتك وروابطك، والزائر يعاين الملف ويشوف تقرير فحصه قبل ما ينزّل.

**الحالة:** المرحلة 1-أ (قبل الإطلاق). صفحة الهبوط ونظام التصميم جاهزة. تسجيل الدخول هو الخطوة التالية.

## التقنيات

| الطبقة | الاختيار |
|---|---|
| الإطار | React Router 8 (Framework mode, SSR) |
| التشغيل | Cloudflare Workers عبر `@cloudflare/vite-plugin` |
| التنسيق | Tailwind CSS 4 + Design tokens في `app/app.css` |
| الخطوط | Readex Pro · Kufam · IBM Plex Mono (مستضافة ذاتيًا عبر Fontsource) |
| الاختبارات | Vitest (unit) + Playwright (e2e + لقطات) |
| المخطط | Better Auth + D1 + Drizzle للمرحلة 1-ب |

## هيكل المجلدات

```
app/
  app.css                 Design tokens (فاتح/داكن) + الخطوط + utilities
  root.tsx                HTML shell، سكربت الثيم بدون وميض، preload للخطوط
  entry.server.tsx        SSR + CSP nonce + security headers
  routes.ts               / (عربي) · /en · /signin · /terms · /privacy · /report
  routes/                 home · soon · not-found
  components/
    brand/Logo.tsx        الشعار الرسمي (المسارات حرفيًا) + Lockup + Tagline
    ui/                   Button · Badge · SectionHeader · Card
    layout/               SiteHeader · SiteFooter · FinalCta
    landing/              قسم لكل ملف: Hero · ProductDemo · OneLink · HowItWorks
                          Viewer · Security · Customize · Versions · Pricing · Faq
  i18n/                   ar.ts (المرجع) · en.ts (نفس المفاتيح، يتحقق منها اختبار)
  lib/                    context · security (CSP) · i18n hooks · seo · reveal
workers/app.ts            Worker entry (يولّد nonce لكل طلب)
public/                   favicon · أيقونات PWA · og.png · _headers
scripts/generate-icons.mjs  يولّد الأيقونات و og.png من الشعار
tests/unit/               ترجمة · توجيه اللغة · CSP
tests/e2e/                سلوك الصفحة + 16 لقطة (4 مقاسات × لغتين × ثيمين)
.github/workflows/ci.yml  فحص → Playwright → نشر
```

## التشغيل محليًا

```bash
npm install
npm run dev          # http://localhost:5173
```

## الأوامر

| الأمر | الوظيفة |
|---|---|
| `npm run typecheck` | توليد الأنواع + TypeScript |
| `npm test` | اختبارات الوحدة |
| `npm run build` | بناء الإنتاج |
| `npm run test:e2e` | اختبارات Playwright (تشغّل preview تلقائيًا) |
| `npm run screenshots` | 16 لقطة كاملة في `screenshots/` |
| `npm run icons` | إعادة توليد الأيقونات و og.png |
| `npm run deploy` | نشر يدوي عبر wrangler |

## CI/CD

كل push على `main` أو `claude/**` يمر بـ:
1. **check:** typecheck + unit + build
2. **e2e:** Playwright + رفع اللقطات كـ artifact باسم `screenshots`
3. **deploy:** `wrangler deploy` إلى Cloudflare Workers

**أسرار GitHub المطلوبة** (Settings → Secrets and variables → Actions):
- `CLOUDFLARE_API_TOKEN` بصلاحية *Workers Scripts: Edit*
- `CLOUDFLARE_ACCOUNT_ID`

## قواعد التصميم

- الزر الأساسي كحلي (`ink`)، والبرتقالي (`buoy`) للإشارة فقط.
- لا تدرجات، لا Glassmorphism، والظل للطبقات العائمة فقط.
- RTL/LTR بـ logical properties. الشعار لا ينعكس أبدًا.
- كل نص في `app/i18n`. ممنوع النص داخل المكونات.
- ممنوع الأرقام والشهادات الوهمية. أي بيانات في الأمثلة مكتوب عليها «توضيحية».

## الأمان

- CSP صارمة بـ nonce لكل طلب (بدون `unsafe-inline` للسكربتات والأنماط).
- HSTS · nosniff · Referrer-Policy · Permissions-Policy · X-Frame-Options.
- الأسرار في متغيرات البيئة فقط. انظر `.env.example`.
