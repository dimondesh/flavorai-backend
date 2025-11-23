# 🍳 FlavorAI Backend

This is the backend for **FlavorAI**, built with **Node.js, Express, Prisma, and PostgreSQL**.

---

## 🚀 1. Create a Database in Prisma

1. Go to the Prisma Console:  
   👉 https://console.prisma.io/

2. Create a new project and a **PostgreSQL database**.

3. Copy your connection string and paste it into your `.env` file.

Example `.env`:

```env
DATABASE_URL="postgres://USER:PASSWORD@db.prisma.io:5432/postgres?sslmode=require"

JWT_SECRET="your_jwt_secret_here"

CLOUDINARY_CLOUD="your_cloud_name"
CLOUDINARY_KEY="your_cloudinary_key"
CLOUDINARY_SECRET="your_cloudinary_secret"
```

> ⚠️ Do **not** use public example secrets — generate your own credentials in Prisma and Cloudinary.

---

## ☁️ 2. Configure Cloudinary

1. Go to https://cloudinary.com/console  
2. Create or log in to your account.  
3. Copy your:

- Cloud Name  
- API Key  
- API Secret  

4. Add them to your `.env`:

```env
CLOUDINARY_CLOUD="xxx"
CLOUDINARY_KEY="xxx"
CLOUDINARY_SECRET="xxx"
```

---

## 📦 3. Install Dependencies

```bash
npm install
```

---

## 🗄 4. Run Prisma Migrations

```bash
npx prisma migrate deploy
```

Or for development:

```bash
npx prisma migrate dev
```

---

## ▶️ 5. Start the Backend

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend will run at:

```
http://localhost:5000
```

---

## 🛠 Useful Commands

### Open Prisma Studio:

```bash
npx prisma studio
```

---

Backend setup complete 🚀
