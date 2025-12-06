# OmniShelf AI - System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + TypeScript)               │
│                         Port: 3002                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Admin Dashboard │  │ User Dashboard  │  │  Landing Page   │ │
│  │ • Shelf Scanner │  │ • SmartCart AI  │  │ • Authentication│ │
│  │ • Inventory     │  │ • Visual Search │  │ • Features      │ │
│  │ • Analytics     │  │ • Aisle Finder  │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                    Built with: Vite + Tailwind CSS              │
└─────────────────────────────────────────────────────────────────┘
                              │ REST API (HTTP)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (FastAPI)                          │
│                         Port: 8002                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Detection API  │  │  Inventory API  │  │  SmartCart API  │ │
│  │  /predict/*     │  │  /inventory/*   │  │  /smartcart/*   │ │
│  │  /stock/*       │  │  /analytics/*   │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   ML Pipeline   │  │    Database     │  │  External APIs  │
│  (YOLOv11s)     │  │  (PostgreSQL)   │  │  (OpenAI)       │
│                 │  │   Port: 5436    │  │                 │
│ • SKU-110K      │  │                 │  │ • GPT-4o Vision │
│ • Grozi-120     │  │ • Detections    │  │ • CLIP Verify   │
│ • 19.24 MB      │  │ • Sessions      │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## Three-Stage ML Detection Pipeline

```
Input Image (Shelf Photo)
         │
         ▼
┌────────────────────────────────────────┐
│ STAGE 1: SKU-110K Detection            │
│ • Localize all products on shelf       │
│ • Output: Bounding boxes (any product) │
│ • Model: Dense object detector         │
└────────────────────────────────────────┘
         │ Crop each detected region
         ▼
┌────────────────────────────────────────┐
│ STAGE 2: Grozi-120 Classification      │
│ • Classify each cropped product        │
│ • Output: Product class (grozi_1-120)  │
│ • Model: YOLOv11s (95.51% mAP@50)     │
└────────────────────────────────────────┘
         │ Low confidence detections
         ▼
┌────────────────────────────────────────┐
│ STAGE 3: OpenAI Vision Verification    │
│ • Verify/correct classifications       │
│ • Output: Confirmed product + category │
│ • API: GPT-4o with vision              │
└────────────────────────────────────────┘
         │
         ▼
    Final Results (JSON)
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript | UI framework |
| **Build Tool** | Vite | Fast dev/build |
| **Styling** | Tailwind CSS + Lucide Icons | UI design |
| **Backend** | FastAPI | REST API server |
| **ORM** | SQLAlchemy 2.0 | Database access |
| **Database** | PostgreSQL 15 | Persistent storage |
| **ML Framework** | Ultralytics 8.1 | YOLO inference |
| **Vision API** | OpenAI GPT-4o | CLIP verification |
| **Containers** | Docker Compose | Orchestration |

---

## Data Flow

```
User uploads shelf image
        │
        ▼
   POST /predict/two-stage
        │
        ▼
   ML Pipeline processes
   (SKU → Grozi → CLIP)
        │
        ▼
   Returns detections JSON
        │
        ▼
   User clicks "Save"
        │
        ▼
   POST /inventory/bulk-update
   (assigns unique session_id)
        │
        ▼
   PostgreSQL stores detections
        │
        ▼
   Event system notifies UI
        │
        ▼
   Dashboard updates in real-time
```

---

## Directory Structure

```
omnishelf_ai/
├── backend/                 # FastAPI Application
│   ├── main.py             # API endpoints
│   ├── models.py           # SQLAlchemy models
│   ├── schemas.py          # Pydantic schemas
│   ├── crud.py             # Database operations
│   ├── database.py         # DB connection
│   └── config.py           # Configuration
│
├── frontend_react/          # React Application
│   ├── src/
│   │   ├── App.tsx         # Main router
│   │   ├── components/     # 50+ UI components
│   │   └── services/       # API client
│   ├── package.json
│   └── vite.config.ts
│
├── yolo/                    # ML Pipeline
│   ├── sku_grozi_detector.py   # Two-stage detector
│   ├── clip_verifier.py        # OpenAI verification
│   ├── utils.py                # Inference utilities
│   └── runs/                   # Trained models
│
├── docs/                    # Documentation
├── tests/                   # Test suite
├── sql/                     # Database scripts
├── demo_images/             # Sample images
└── docker-compose.yml       # Container orchestration
```

---

## Model Performance

| Metric | Value |
|--------|-------|
| **mAP@50** | 95.51% |
| **Precision** | 84.89% |
| **Recall** | 88.52% |
| **Model Size** | 19.24 MB |
| **Inference (GPU)** | ~25ms |
| **Inference (CPU)** | ~180ms |

---

## Ports & Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3002 | React dev server |
| Backend | 8002 | FastAPI server |
| Database | 5436 | PostgreSQL (Docker) |

---

*Last Updated: December 2025*
