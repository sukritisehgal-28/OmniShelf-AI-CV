# OmniShelf AI

**Intelligent Retail Shelf Management Using Computer Vision**

An end-to-end retail shelf intelligence platform powered by a custom-trained **YOLOv11** model. Automates inventory tracking, detects out-of-stock items in real-time, and provides a smart shopping assistant for customers.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Model Performance](https://img.shields.io/badge/mAP%4050-95.51%25-blue)
![Tech Stack](https://img.shields.io/badge/Stack-FastAPI%20%7C%20React%20%7C%20PostgreSQL%20%7C%20YOLOv11-orange)

**Author:** Sukriti Sehgal  
**Repository:** [github.com/sukritisehgal-28/OmniShelf_ai](https://github.com/sukritisehgal-28/OmniShelf_ai)

---

## 🎯 Highlights

| Metric | Value |
|--------|-------|
| **mAP@50** | 95.51% |
| **Precision** | 84.89% |
| **Recall** | 88.52% |
| **Model Size** | 19.24 MB |
| **Products** | 120 classes |

---

## 🚀 Key Features

### 🧠 Three-Stage AI Pipeline
- **Stage 1:** SKU-110K for product localization
- **Stage 2:** YOLOv11s (Grozi-120) for classification
- **Stage 3:** OpenAI Vision (GPT-4o) for verification

### 🛡️ Admin Dashboard
- **Shelf Scanner:** Upload images, detect products instantly
- **Inventory Management:** Track stock levels with session-based history
- **Analytics:** Category breakdowns, stock trends, velocity metrics
- **Alerts:** Real-time out-of-stock notifications

### 🛒 User Features
- **SmartCart AI:** Natural language shopping assistant
- **Visual Search:** Find products by image
- **Aisle Finder:** Product location guidance

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 FRONTEND (React + TypeScript)               │
│                       Port: 3002                            │
│     Admin Dashboard  │  User Dashboard  │  Landing Page     │
└─────────────────────────────────────────────────────────────┘
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (FastAPI)                        │
│                       Port: 8002                            │
│    Detection API  │  Inventory API  │  SmartCart API        │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐  ┌─────────────────┐  ┌───────────────┐
│  ML Pipeline  │  │   PostgreSQL    │  │  OpenAI API   │
│  (YOLOv11s)   │  │   Port: 5436    │  │  GPT-4o       │
└───────────────┘  └─────────────────┘  └───────────────┘
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed system design.

---

## 🛠️ Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- Docker Desktop

### 1. Clone & Setup
```bash
git clone https://github.com/sukritisehgal-28/OmniShelf_ai.git
cd omnishelf_ai

# Python environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Start Database
```bash
docker compose up -d
# PostgreSQL running on port 5436
```

### 3. Start Backend
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8002
# API docs: http://localhost:8002/docs
```

### 4. Start Frontend
```bash
cd frontend_react
npm install
npm run dev
# App: http://localhost:3002
```

---

## 📂 Project Structure

```
omnishelf_ai/
├── backend/                 # FastAPI Application
│   ├── main.py             # API endpoints
│   ├── models.py           # SQLAlchemy models
│   ├── schemas.py          # Pydantic schemas
│   └── crud.py             # Database operations
│
├── frontend_react/          # React Application
│   ├── src/
│   │   ├── components/     # 50+ UI components
│   │   └── services/       # API client
│   └── package.json
│
├── yolo/                    # ML Pipeline
│   ├── sku_grozi_detector.py   # Two-stage detector
│   ├── clip_verifier.py        # OpenAI verification
│   ├── utils.py                # Inference utilities
│   └── runs/                   # Trained models
│
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md     # System design
│   ├── API_REFERENCE.md    # API endpoints
│   ├── QUICK_START_GUIDE.md
│   ├── POSTGRES_SETUP.md
│   ├── COLAB_GITHUB_GUIDE.md
│   └── EXPERIMENTS.md      # Training iterations
│
├── tests/                   # Test suite
├── demo_images/             # Sample shelf images
├── sql/                     # Database scripts
├── product_mapping.py       # 120 product metadata
├── docker-compose.yml       # Container orchestration
├── requirements.txt         # Python dependencies
├── PROJECT_REPORT.md        # Academic report
└── README.md                # This file
```

---

## 📊 Model Performance

| Experiment | mAP@50 | Notes |
|------------|--------|-------|
| Baseline | 65.0% | Default settings |
| Augmentation V1 | 72.0% | Heavy Mosaic + HSV |
| Domain Adaptation | 78.0% | Real-world shelf data |
| **Final Production** | **95.51%** | Optimized augmentation |

**Training:** Google Colab T4 GPU, 50 epochs, ~10 hours

See [docs/EXPERIMENTS.md](docs/EXPERIMENTS.md) for full training log.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PROJECT_REPORT.md](PROJECT_REPORT.md) | Full academic report |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture |
| [docs/API_REFERENCE.md](docs/API_REFERENCE.md) | REST API reference |
| [docs/QUICK_START_GUIDE.md](docs/QUICK_START_GUIDE.md) | Setup in 3 steps |
| [docs/EXPERIMENTS.md](docs/EXPERIMENTS.md) | Training experiments |

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | FastAPI, SQLAlchemy 2.0 |
| Database | PostgreSQL 15 (Docker) |
| ML | Ultralytics YOLOv11, OpenAI GPT-4o |

---

## 🎓 Model Training

Train the models yourself using Google Colab (free T4 GPU):

### SKU-110K Model Training
**Objective:** Train the SKU detection model for product localization

[🚀 Open SKU-110K Training Notebook](https://colab.research.google.com/drive/1KSkjYVD2SxAvNZBloO2CIcX2jrXZZ5fi?usp=sharing)

**Steps:**
1. Open the Colab link above
2. Click "Runtime > Change runtime type > T4 GPU"
3. Follow the cells to clone, setup, and train
4. Download `best.pt` weights after training completes (~2 hours)

### Grozi-120 Model Training
**Objective:** Train the fine-grained product classification model (120 classes)

[🚀 Open Grozi-120 Training Notebook](https://colab.research.google.com/drive/11fifYnGjjINjVWT5vJL5rBHRiJ--52E4?usp=sharing)

**Steps:**
1. Open the Colab link above
2. Click "Runtime > Change runtime type > T4 GPU"
3. Follow the cells to clone, setup, and train
4. Download `best.pt` weights after training completes (~3 hours)
5. Place in `yolo/runs/grozi120_yolo11s/weights/`

**Training Details:**
- Hardware: Google Colab Tesla T4 GPU (16GB VRAM)
- Batch Size: 16
- Epochs: 50
- Expected Time: 2-3 hours per model
- Validation Split: 85/15

---

## 📜 License

This project is licensed under the MIT License.
