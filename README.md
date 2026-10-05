# QuickStore — Your Business Online ♛

A modern, dark-luxury digital storefront and WhatsApp ordering system designed specifically for local businesses, restaurants, cafes, bakeries, salons, and retail shops.

## 🚀 Key Features

- **Storefront & Menu**: Mobile-first customer menu with food categories, item customization, and instant cart.
- **Direct WhatsApp Ordering**: One-click order message generator (`wa.me`) without needing complex APIs or server maintenance.
- **Admin Dashboard**: Manage business details, menu items, pricing, photos, and live incoming orders.
- **QR Code Generator**: Generates crisp, downloadable QR codes encoding your live public store link.
- **Printable Table Standees & Posters**: High-resolution "SCAN & ORDER DIRECTLY ON WHATSAPP" promotional material.
- **Google Maps Integration**: Direct 📍 Maps button for customer directions to the physical location.
- **Zero Backend Dependency**: 100% client-side with automatic localStorage persistence.

---

## 📦 How to Deploy to GitHub Pages

1. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com) and click **New Repository**.
   - Name it `quickstore` (or any name you prefer) and set it to Public.

2. **Upload / Push Project Files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of QuickStore"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/quickstore.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your repository, click **Settings**.
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment** > **Source**, choose **GitHub Actions** (or Deploy from branch `gh-pages` / `main`).
   - If using Vite, configure the `base` path in `vite.config.ts` if repository is hosted at a subpath (e.g. `base: './'`).

4. **Open Generated URL**:
   - Click the live link provided by GitHub Pages (e.g., `https://YOUR_USERNAME.github.io/quickstore/?store=royal-burger`).

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4** with custom gold luxury palette
- **Motion** for smooth micro-interactions
- **Lucide Icons**
- **qrcode** library for crisp high-resolution QR rendering and PNG downloads
