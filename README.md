# SmartExpense AI - Telegram + Email Edition 🚀

**Complete AI-powered expense tracker with Telegram bot & AWS SES email integration**

---

## ✨ Features

✅ **Telegram Bot Integration** - Add expenses via `/expense` command  
✅ **AI-Powered Insights** - Smart spending analysis & recommendations  
✅ **Weekly Email Reports** - Automated HTML emails every Sunday 6 PM  
✅ **Beautiful Dashboard** - Real-time analytics & charts  
✅ **Category Tracking** - 7 categories with breakdown  
✅ **Budget Management** - Monthly budget alerts  
✅ **Admin Panel** - Manage all users & data  
✅ **Completely FREE** - No costs forever!

---

## 🛠️ Tech Stack

- **Backend:** Flask (Python)
- **Database:** SQLite
- **Frontend:** HTML/CSS/JavaScript + Chart.js
- **Telegram:** Official Bot API
- **Email:** AWS SES SMTP
- **Deploy:** Vercel / Render

---

## 📋 Setup Instructions

### 1️⃣ Prerequisites

- Python 3.8+
- GitHub account
- Vercel account
- Telegram Bot (already created ✅)
- AWS SES credentials (already setup ✅)

### 2️⃣ Deployment on Vercel

#### Step 1: GitHub Setup
```bash
# 1. Go to github.com → Create new repository
# Repository name: smartexpense-ai

# 2. Upload all files from smartexpense_final folder:
#    - app.py
#    - requirements.txt
#    - .env
#    - Procfile
#    - vercel.json
#    - templates/
#    - static/
```

#### Step 2: Vercel Deployment
```
1. Go to vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Go to "Settings" → "Environment Variables"
5. Add these variables:

   SECRET_KEY = smartexpense-secret-key-2025
   JWT_SECRET = smartexpense-jwt-secret-2025
   ADMIN_USERNAME = riya_admin
   ADMIN_PASSWORD = Admin@Secure2025!
   TELEGRAM_BOT_TOKEN = 8633597539:AAFfvAAsK2uKB_50dgaj5qTaJHxjqDgcOc8
   SES_SMTP_SERVER = email-smtp.us-west-2.amazonaws.com
   SES_SMTP_PORT = 587
   SES_SMTP_USER = AKIAWRQJBG7ZYEZNI7BO
   SES_SMTP_PASSWORD = BHYpVr77FuTT7zq68NQKO+cdsnFgSvo8kWD885uMgps4
   SES_FROM_EMAIL = itsriyagoel28@gmail.com

6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Copy your Vercel URL (e.g., https://smartexpense-ai.vercel.app)
```

### 3️⃣ Telegram Webhook Setup (After Vercel Deploy)

Once Vercel is live with your URL:

```
1. Open Telegram
2. Search: @BotFather
3. Send: /setwebhook
4. When asked, send your webhook URL:

   https://your-vercel-url.vercel.app/webhook/telegram
```

### 4️⃣ Testing

1. **Login**: https://your-vercel-url.vercel.app
2. **Demo Account**: Click "Try Demo Account"
3. **Test Telegram Bot**:
   - Search: @smartexpense_ai_bot
   - Send: `/start`
   - Send: `/expense food 350 lunch`
   - Should respond: "✅ Food ₹350 added!"

---

## 📱 How to Use

### Dashboard
- **Real-time budget tracking**
- **Category-wise breakdown**
- **AI insights & recommendations**
- **Monthly analytics**

### Telegram Bot Commands
```
/start              - Welcome & help
/expense CAT AMT DESC - Add expense
/balance            - Check remaining budget
/summary            - Weekly breakdown
/insights           - AI suggestions
/help               - All commands
```

Example:
```
/expense food 350 lunch
/expense transport 50 auto ride
/expense shopping 2000 clothes
```

### Dashboard Settings
- **Link Telegram**: Link your Telegram username
- **Update Budget**: Set monthly budget
- **Export Data**: Download all expenses as CSV

### Weekly Email
- **Automatic**: Every Sunday 6 PM IST
- **Content**: Spending summary, category breakdown, AI insights
- **To**: Your registered email address

---

## 🔐 Admin Panel

**URL**: https://your-vercel-url.vercel.app/admin

**Credentials**:
- Username: `riya_admin`
- Password: `Admin@Secure2025!`

**Features**:
- View all users
- See all expenses
- Activity logs
- Block/delete users
- Export all data

---

## 🎯 Environment Variables (.env)

```
SECRET_KEY=smartexpense-secret-key-2025
JWT_SECRET=smartexpense-jwt-secret-2025
ADMIN_USERNAME=riya_admin
ADMIN_PASSWORD=Admin@Secure2025!

TELEGRAM_BOT_TOKEN=8633597539:AAFfvAAsK2uKB_50dgaj5qTaJHxjqDgcOc8

SES_SMTP_SERVER=email-smtp.us-west-2.amazonaws.com
SES_SMTP_PORT=587
SES_SMTP_USER=AKIAWRQJBG7ZYEZNI7BO
SES_SMTP_PASSWORD=BHYpVr77FuTT7zq68NQKO+cdsnFgSvo8kWD885uMgps4
SES_FROM_EMAIL=itsriyagoel28@gmail.com
```

---

## 💾 Database

SQLite (auto-created on first run)
- **File**: `instance/smartexpense.db`
- **Tables**: User, Expense, ActivityLog

---

## 📊 API Endpoints

### Auth
- `POST /api/signup` - Register
- `POST /api/login` - Login
- `POST /api/demo-login` - Demo access
- `POST /api/logout` - Logout

### Expenses
- `GET /api/expenses` - List expenses
- `POST /api/expenses` - Add expense
- `PUT /api/expenses/<id>` - Update
- `DELETE /api/expenses/<id>` - Delete

### Analytics
- `GET /api/summary` - Monthly summary
- `GET /api/insights` - AI insights
- `GET /api/history` - Historical data
- `PUT /api/budget` - Update budget
- `GET /api/export/csv` - Export

### Telegram
- `POST /webhook/telegram` - Telegram webhook
- `POST /api/telegram/link` - Link account

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/check` - Check login status
- `GET /api/admin/users` - All users
- `GET /api/admin/expenses` - All expenses
- `GET /api/admin/logs` - Activity logs
- `POST /api/admin/block/<id>` - Block user
- `DELETE /api/admin/delete/<id>` - Delete user
- `GET /api/admin/export` - Export all data

---

## 🐛 Troubleshooting

### Telegram Bot Not Responding
1. Check webhook URL is correct
2. Verify bot token in .env
3. Ensure Vercel app is running
4. Check Telegram link in settings

### Emails Not Arriving
1. Verify AWS SES credentials
2. Check email verification status
3. Look for emails in spam folder
4. Verify "from email" in .env

### Vercel Deploy Failed
1. Check Node.js version (should be 18+)
2. Verify all files are uploaded
3. Check environment variables
4. See deployment logs in Vercel dashboard

---

## 📈 Scalability

**Current limits (Vercel Free)**:
- Up to 100 concurrent users
- Executions: 100GB-hours/month
- Functions: Cold start ~500ms

**To scale**:
- Upgrade to Vercel Pro ($20/month)
- Use PostgreSQL instead of SQLite
- Enable caching for analytics
- Scale scheduler jobs

---

## 🔐 Security

- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ CSRF protection
- ✅ Email verification
- ✅ Admin login protection
- ✅ Activity logging
- ✅ HTTPS only (Vercel)
- ⚠️ Keep .env secrets safe!

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review logs in Vercel dashboard
3. Check AWS SES status
4. Test Telegram bot directly

---

## 💰 Cost Breakdown

| Service | Cost | Limit |
|---------|------|-------|
| Vercel | FREE | 100GB-hrs/mo |
| AWS SES | FREE | 62,000 emails/mo |
| Telegram Bot | FREE | Unlimited |
| Domain (optional) | $0-10/yr | - |
| **TOTAL** | **FREE** | - |

---

**SmartExpense AI** © 2025 | Made with ❤️
