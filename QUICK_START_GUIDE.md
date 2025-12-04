# OmniShelf AI - Quick Start Guide
**Your system is ready to go! Use this guide to run everything.**

---

## 🚀 Start Everything (3 Commands)

### 1. Start PostgreSQL Database
```bash
# Make sure Docker Desktop is running, then:
docker compose up -d

# Verify it's running:
docker ps
# Should see: omnishelf_ai-db-1 on port 5436
```

### 2. Start Backend API
```bash
# In project root:
source venv/bin/activate
export DATABASE_URL="postgresql://postgres:postgres@localhost:5436/omnishelf"
uvicorn backend.main:app --host 0.0.0.0 --port 8002 --reload

# Server will start on: http://localhost:8002
# API docs available at: http://localhost:8002/docs
```

### 3. Start Frontends

**Option A - React (Modern UI with Login)**:
```bash
# In new terminal:
cd frontend_react
npm run dev

# Opens on: http://localhost:3002
```

**Option B - Streamlit (Quick Dashboard)**:
```bash
# In new terminal:
source venv/bin/activate
streamlit run frontend/app.py

# Opens on: http://localhost:8501
```

**You can run BOTH at the same time!**

---

## 🌐 Access URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **React Frontend** | http://localhost:3002 | Modern dashboard with login |
| **Streamlit** | http://localhost:8501 | Quick analytics view |
| **Backend API** | http://localhost:8002 | REST API |
| **API Docs** | http://localhost:8002/docs | Interactive API testing |
| **PostgreSQL** | localhost:5436 | Database |

---

## 📊 What You'll See

### React Frontend (http://localhost:3002)
1. **Landing Page**: Professional hero section
2. **Click "Get Started"**: Choose Admin or User role
3. **Login**: Use any email/password (mock auth)
4. **Dashboard**: See 20 products with real names
5. **Analytics**: View 7-day stock charts
6. **SmartCart**: Search for products

### Streamlit (http://localhost:8501)
1. **Metrics Cards**: HIGH/MEDIUM/LOW/OUT stock counts
2. **Product Table**: 20 products with details
3. **Stock History**: Line chart showing 7-day trends
4. **SmartCart**: Shopping list assistant

### API Docs (http://localhost:8002/docs)
1. Interactive Swagger UI
2. Test endpoints directly in browser
3. Upload images for detection
4. View all available routes

---

## 🧪 Quick Tests

### Test 1: Backend Health
```bash
curl http://localhost:8002/health
# Expected: {"status":"ok"}
```

### Test 2: Get Stock Data
```bash
curl http://localhost:8002/stock | jq '.[0]'
# Expected: JSON with product details
```

### Test 3: Check Product Names
```bash
curl http://localhost:8002/stock | jq '.[0] | {product: .product_name, display: .display_name}'
# Expected: Display name is NOT "grozi_XX"
```

### Test 4: Verify Model
```bash
source venv/bin/activate
python -c "from backend.main import yolo_model, MODEL_PATH; print(f'Model: {MODEL_PATH.exists()}, Loaded: {yolo_model is not None}')"
# Expected: Model: True, Loaded: True
```

---

## 🔍 Verify Everything is Using Trained Model

### Check 1: Backend Configuration
```bash
grep -n "train_colab" backend/main.py
# Should show line 39 with train_colab path
```

### Check 2: Model File Exists
```bash
ls -lh yolo/runs/detect/train_colab/weights/best.pt
# Should show: 18M file
```

### Check 3: Database Has Real Data
```bash
export DATABASE_URL="postgresql://postgres:postgres@localhost:5436/omnishelf"
psql $DATABASE_URL -c "SELECT COUNT(*) as detections FROM product_detections;"
# Should show: 120 rows
```

### Check 4: Product Names Work
```bash
curl -s http://localhost:8002/stock | grep -o "display_name.*" | head -5
# Should show real names like "Folgers", "Oreo", not "grozi_XX"
```

---

## 🛑 Stop Everything

### Stop Backend
```
Press Ctrl+C in the uvicorn terminal
```

### Stop React
```
Press Ctrl+C in the npm terminal
```

### Stop Streamlit
```
Press Ctrl+C in the streamlit terminal
```

### Stop Database
```bash
docker compose down
```

---

## 🐛 Troubleshooting

### Problem: "Port already in use"
```bash
# Kill process on port 8002
lsof -ti:8002 | xargs kill -9

# Or use a different port:
uvicorn backend.main:app --port 8003
```

### Problem: "Can't connect to database"
```bash
# Check if PostgreSQL is running:
docker ps | grep postgres

# If not running:
docker compose up -d

# Check port:
docker ps
# Should show: 0.0.0.0:5436->5432/tcp
```

### Problem: "YOLO model not found"
```bash
# Verify model exists:
ls yolo/runs/detect/train_colab/weights/best.pt

# Check size (should be ~18MB):
du -h yolo/runs/detect/train_colab/weights/best.pt
```

### Problem: "Product names show as grozi_XX"
```bash
# Check product mapping:
python -c "from product_mapping import PRODUCT_NAME_MAP; print(len(PRODUCT_NAME_MAP))"
# Should show: 25

# If 0, the file may be corrupt. Check product_mapping.py exists
```

### Problem: "React shows blank page"
```bash
# Check console for errors:
# Open browser DevTools (F12)
# Look at Console tab

# Common fix - clear cache:
# Ctrl+Shift+R (hard refresh)

# Check API connection:
curl http://localhost:8002/health
```

---

## 📦 What's Running on Your Data?

### Your Trained Model
- **Location**: `yolo/runs/detect/train_colab/weights/best.pt`
- **Size**: 18.3 MB
- **Performance**: 95.51% mAP@50
- **Trained on**: Grozi-120 dataset (50 epochs)
- **GPU**: Google Colab T4

### Your Real Data
- **Source**: 180 real shelf images
- **Detections**: 120 products detected
- **Classes**: 21 different product types
- **Confidence**: Average 42.7%

### Your Database
- **120 detections** from real shelf evaluation
- **140 snapshots** (7-day history)
- **20 unique products** with proper names
- **All data comes from your trained model!**

---

## 🎬 Demo Script (For Presentations)

### 1. Show Model Performance (30 seconds)
```bash
cat yolo/evaluation_metrics_report.json | jq '.validation_metrics'
```
Say: "Our model achieved 95.51% mAP@50, exceeding the 85% target."

### 2. Start Backend (10 seconds)
```bash
uvicorn backend.main:app --port 8002 &
```
Say: "The backend loads our trained YOLOv11 model..."

### 3. Show React Dashboard (30 seconds)
```
Open http://localhost:3002
Click through: Landing → Admin → Dashboard
```
Say: "Here's the real-time dashboard showing 20 detected products with actual names."

### 4. Show Analytics (20 seconds)
```
Click "Analytics" tab
```
Say: "We track stock levels over 7 days with automatic alerts."

### 5. Test SmartCart (20 seconds)
```
Click "SmartCart" tab
Type: "coffee"
Click "Check Availability"
```
Say: "Users can search for products and see availability."

### 6. Show API (20 seconds)
```
Open http://localhost:8002/docs
Expand GET /stock
Click "Try it out" → "Execute"
```
Say: "The REST API powers all frontends with real detection data."

**Total: 2 minutes 10 seconds**

---

## 📸 Screenshots to Capture

For your report:
1. React landing page
2. Admin dashboard with product table
3. Analytics page with charts
4. API documentation (Swagger UI)
5. Streamlit dashboard
6. Training metrics (evaluation_metrics_report.json)
7. Sample shelf images with detections
8. Confusion matrix (when generated)
9. Training curves (loss/mAP over epochs)
10. Terminal showing model loading successfully

---

## 🎓 For Academic Submission

### Required Files to Include:
```
omnishelf_ai/
├── backend/                   # Your backend code
├── frontend/                  # Streamlit code
├── frontend_react/            # React code
├── yolo/
│   ├── runs/detect/train_colab/  # Trained model
│   ├── real_shelf_evaluation.csv # Results
│   └── evaluation_metrics_report.json # Metrics
├── product_mapping.py         # Product names
├── requirements.txt           # Dependencies
├── docker-compose.yml         # Database setup
├── README.md                  # Project overview
└── FINAL_REPORT.pdf          # Your 15-20 page report
```

### What to Demonstrate:
1. ✅ Model training (show results.csv, metrics)
2. ✅ Real shelf evaluation (180 images, 120 detections)
3. ✅ Working application (React/Streamlit dashboards)
4. ✅ REST API (FastAPI with documentation)
5. ✅ Database integration (PostgreSQL)
6. ✅ Product mapping (grozi_XX → real names)
7. ✅ Analytics & visualization (charts, metrics)

---

## 🔗 Important Links

### Documentation
- [SYSTEM_AUDIT_REPORT.md](SYSTEM_AUDIT_REPORT.md) - Complete system audit
- [NEXT_STEPS.md](NEXT_STEPS.md) - What to do next
- [EXPERIMENTS.md](EXPERIMENTS.md) - Training experiments log
- [README.md](README.md) - Project overview

### API Endpoints
- Health: `GET /health`
- Stock: `GET /stock`
- Analytics: `GET /analytics/summary`
- Products: `GET /products`
- Predict: `POST /predict` (upload image)

### External Resources
- [YOLOv11 Docs](https://docs.ultralytics.com/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [Streamlit Docs](https://docs.streamlit.io/)

---

## ✅ Pre-Flight Checklist

Before starting everything:
- [ ] Docker Desktop is running
- [ ] Python venv is activated
- [ ] Node.js is installed (for React)
- [ ] Ports 3002, 5436, 8002, 8501 are free

To check ports:
```bash
lsof -i :3002  # Should be empty
lsof -i :5436  # Should be empty (or postgres)
lsof -i :8002  # Should be empty
lsof -i :8501  # Should be empty
```

---

## 🎉 You're Ready!

Your OmniShelf AI system is:
- ✅ Connected to trained model (95.51% mAP@50)
- ✅ Using real detection data (120 detections)
- ✅ Displaying proper product names (not codes)
- ✅ Running on 3 interfaces (React, Streamlit, API)
- ✅ Backed by PostgreSQL database
- ✅ Ready for demonstration and submission!

**Start everything and test it out!**

Need help? Check:
1. [SYSTEM_AUDIT_REPORT.md](SYSTEM_AUDIT_REPORT.md) - Detailed system status
2. [NEXT_STEPS.md](NEXT_STEPS.md) - What to work on next
3. Troubleshooting section above

---

**Last Updated**: December 3, 2025
**System Status**: Fully Operational ✅
**Ready for**: Demo, Presentation, and Academic Submission
