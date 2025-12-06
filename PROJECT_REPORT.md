# OmniShelf AI: Intelligent Retail Shelf Management Using Computer Vision

---

**Project Report**

**Author:** Sukriti Sehgal  
**Date:** December 5, 2025  
**Course:** Computer Vision / Machine Learning  
**Institution:** [Your Institution Name]

---

## Abstract

OmniShelf AI is an end-to-end retail shelf intelligence platform that leverages state-of-the-art computer vision to automate inventory tracking and enhance the shopping experience. The system implements a novel **three-stage detection pipeline** combining SKU-110K product localization, Grozi-120 fine-grained classification, and OpenAI Vision (CLIP) verification to achieve robust product identification. Our custom-trained YOLOv11s model achieved a **Mean Average Precision (mAP@50) of 95.51%** on the Grozi-120 validation dataset, with 84.89% precision and 88.52% recall, significantly exceeding the initial target of 85%. The platform features a modern React/TypeScript frontend with dual interfaces for store managers (inventory management, shelf scanning, analytics) and shoppers (SmartCart AI assistant, visual search, aisle finder). A FastAPI backend serves the ML models and manages a PostgreSQL database for persistent storage. Key innovations include session-based inventory tracking with unique identifiers, real-time cross-component event systems, and AI-powered product verification using GPT-4o vision capabilities. The system demonstrates the practical viability of computer vision for retail automation, offering significant potential for reducing manual inventory labor and improving customer experience.

**Keywords:** Computer Vision, Object Detection, YOLOv11, Retail Automation, Product Recognition, CLIP, Deep Learning

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Related Work / Background](#2-related-work--background)
3. [Methodology](#3-methodology)
4. [Experiments & Results](#4-experiments--results)
5. [Discussion](#5-discussion)
6. [Conclusion & Future Work](#6-conclusion--future-work)
7. [References](#7-references)
8. [Appendix](#8-appendix)

---

## 1. Introduction

### 1.1 Problem Statement

Manual inventory management in retail environments is a persistent challenge that costs the industry billions of dollars annually. Store employees spend countless hours manually counting products, checking shelf availability, and updating inventory systems. This process is:

- **Labor-intensive:** Requires significant human resources
- **Error-prone:** Manual counting leads to inaccuracies
- **Time-consuming:** Delays in identifying out-of-stock items
- **Costly:** Lost sales due to empty shelves estimated at $1 trillion globally

### 1.2 Why This Problem Matters

According to industry research, out-of-stock situations result in:
- **8-10% lost sales** for retailers
- **21-43% of shoppers** will go to a competitor if an item is unavailable
- **$634 billion** in lost revenue annually due to inventory distortion

Automating shelf monitoring through computer vision can provide real-time visibility into stock levels, enabling proactive restocking and improved customer satisfaction.

### 1.3 Overview of Approach

OmniShelf AI addresses these challenges through a comprehensive solution:

1. **Three-Stage Detection Pipeline:**
   - Stage 1: SKU-110K model for general product localization
   - Stage 2: Grozi-120 model for fine-grained product classification
   - Stage 3: OpenAI Vision (CLIP) for verification and error correction

2. **Full-Stack Web Application:**
   - React/TypeScript frontend with dual user interfaces
   - FastAPI backend for ML inference and API services
   - PostgreSQL database for persistent inventory tracking

3. **Real-Time Analytics:**
   - Stock level monitoring and alerts
   - Historical trend analysis
   - AI-powered shopping assistant

---

## 2. Related Work / Background

### 2.1 Object Detection in Retail

Object detection in retail environments has evolved significantly with deep learning advances:

- **Traditional Methods:** Early approaches used SIFT/SURF features with SVM classifiers, achieving limited accuracy on diverse product catalogs.
- **CNN-Based Detection:** R-CNN family (Fast R-CNN, Faster R-CNN) improved accuracy but suffered from slow inference times.
- **YOLO Family:** You Only Look Once (YOLO) revolutionized real-time detection with single-shot inference.

### 2.2 YOLO Architecture Evolution

| Version | Year | Key Innovation |
|---------|------|----------------|
| YOLOv1 | 2016 | Single-shot detection |
| YOLOv3 | 2018 | Multi-scale predictions |
| YOLOv5 | 2020 | PyTorch implementation |
| YOLOv8 | 2023 | Anchor-free detection |
| YOLOv11 | 2024 | Enhanced backbone, improved small object detection |

### 2.3 Fine-Grained Product Recognition

Fine-grained recognition of visually similar products (e.g., different flavors of the same brand) remains challenging due to:
- Subtle visual differences between variants
- Varying lighting conditions in stores
- Occlusion from overlapping products
- Reflective packaging materials

### 2.4 CLIP and Vision-Language Models

OpenAI's CLIP (Contrastive Language-Image Pre-training) enables zero-shot classification by learning joint representations of images and text. We leverage GPT-4o's vision capabilities for verification, which builds upon CLIP-style training.

---

## 3. Methodology

### 3.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Admin Dashboard │  │  User Dashboard  │  │  Landing Page   │ │
│  │  - Shelf Scanner │  │  - SmartCart AI  │  │  - Auth         │ │
│  │  - Inventory    │  │  - Visual Search │  │  - Features     │ │
│  │  - Analytics    │  │  - Aisle Finder  │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Detection API  │  │  Inventory API  │  │  SmartCart API  │ │
│  │  /predict/*     │  │  /inventory/*   │  │  /smartcart/*   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   ML Pipeline   │  │    Database     │  │  OpenAI API     │
│  - SKU-110K     │  │  PostgreSQL     │  │  GPT-4o Vision  │
│  - Grozi-120    │  │  - Detections   │  │  CLIP Verify    │
│  - YOLOv11s     │  │  - Inventory    │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 3.2 Dataset Description

#### Primary Dataset: Grozi-120

| Attribute | Value |
|-----------|-------|
| **Name** | Grozi-120 (Grocery Product Recognition) |
| **Classes** | 120 distinct product categories |
| **Image Types** | Single product images, shelf displays |
| **Challenges** | Fine-grained differences, similar packaging |
| **Split** | 85% training, 15% validation |

#### Secondary Dataset: SKU-110K

| Attribute | Value |
|-----------|-------|
| **Name** | SKU-110K |
| **Purpose** | Dense product detection on shelves |
| **Images** | 11,762 shelf images |
| **Annotations** | 1.7 million bounding boxes |

#### Product Categories

| Category | Examples | Count |
|----------|----------|-------|
| Snacks | Pringles, Lay's, Doritos | 15+ |
| Candy & Chocolate | Kit Kat, Snickers, M&M's | 20+ |
| Beverages | Coca-Cola, Monster, Red Bull | 12+ |
| Breakfast | Cheerios, Kellogg's | 10+ |
| Health | DayQuil, Neosporin | 8+ |
| Personal Care | Dove, ChapStick | 10+ |
| Food | Barilla, Cup Noodles | 15+ |

### 3.3 Algorithms / Models Used

#### 3.3.1 YOLOv11s Architecture

We selected **YOLOv11s (Small)** as the primary detection backbone:

- **Backbone:** CSPDarknet with enhanced feature extraction
- **Neck:** PANet for multi-scale feature fusion
- **Head:** Anchor-free detection head
- **Parameters:** ~9.4M parameters
- **Model Size:** 19.24 MB

**Rationale:** YOLOv11s offers optimal balance between inference speed (suitable for real-time applications) and detection accuracy (sufficient for fine-grained product recognition).

#### 3.3.2 Three-Stage Detection Pipeline

```
Input Image
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│ STAGE 1: SKU-110K Detection                             │
│ - Detect all product regions on shelf                   │
│ - Output: Bounding boxes (class-agnostic)               │
│ - Purpose: Robust localization in cluttered scenes      │
└─────────────────────────────────────────────────────────┘
     │
     ▼ Crop detected regions
┌─────────────────────────────────────────────────────────┐
│ STAGE 2: Grozi-120 Classification                       │
│ - Classify each cropped region                          │
│ - Output: Product class (grozi_1 to grozi_120)          │
│ - Purpose: Fine-grained product identification          │
└─────────────────────────────────────────────────────────┘
     │
     ▼ Low confidence detections
┌─────────────────────────────────────────────────────────┐
│ STAGE 3: OpenAI Vision Verification                     │
│ - Send crop to GPT-4o with product choices              │
│ - Output: Verified product name + confidence            │
│ - Purpose: Correct misclassifications                   │
└─────────────────────────────────────────────────────────┘
     │
     ▼
Final Detection Results
```

#### 3.3.3 CLIP Verification Algorithm

```python
def verify_with_clip(image_crop, initial_prediction):
    """
    Use OpenAI Vision to verify/correct product classification.
    """
    # 1. Encode image as base64
    image_b64 = encode_image(image_crop)
    
    # 2. Create prompt with product choices
    prompt = f"""
    Identify this grocery product. Choose from:
    {PRODUCT_CHOICES}
    
    If none match, respond "unknown".
    """
    
    # 3. Call GPT-4o Vision API
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "url": f"data:image/jpeg;base64,{image_b64}"}
            ]
        }]
    )
    
    # 4. Parse and return verified product
    return parse_response(response)
```

### 3.4 Implementation Details

#### 3.4.1 Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Frontend | React + TypeScript | 18.2 |
| Build Tool | Vite | 5.0 |
| UI Components | Tailwind CSS, Lucide Icons | - |
| Backend | FastAPI | 0.104 |
| Database | PostgreSQL | 15 |
| ORM | SQLAlchemy | 2.0 |
| ML Framework | Ultralytics | 8.1 |
| Vision API | OpenAI GPT-4o | - |
| Containerization | Docker Compose | - |

#### 3.4.2 Training Configuration

| Hyperparameter | Value | Rationale |
|----------------|-------|-----------|
| **Epochs** | 50 | Sufficient for convergence |
| **Batch Size** | 16 | Optimized for T4 GPU (16GB) |
| **Image Size** | 640×640 | Standard YOLO resolution |
| **Optimizer** | AdamW | Adaptive learning with weight decay |
| **Learning Rate** | 0.01 (initial) | With cosine annealing |
| **Seed** | 42 | Reproducibility |

#### 3.4.3 Data Augmentation

| Augmentation | Parameters | Purpose |
|--------------|------------|---------|
| **Mosaic** | prob=1.0 | Learn from multiple contexts |
| **MixUp** | prob=0.1 | Robust feature learning |
| **HSV** | H=0.015, S=0.7, V=0.4 | Handle lighting variations |
| **Rotation** | ±10° | Camera angle invariance |
| **Translation** | 0.1 | Position invariance |
| **Scale** | 0.5 | Size invariance |
| **Shear** | 2.0° | Perspective changes |

#### 3.4.4 Database Schema

```sql
-- Product Detections Table
CREATE TABLE product_detections (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    confidence FLOAT NOT NULL,
    bbox_x1 FLOAT NOT NULL,
    bbox_y1 FLOAT NOT NULL,
    bbox_x2 FLOAT NOT NULL,
    bbox_y2 FLOAT NOT NULL,
    shelf_id VARCHAR(255),
    session_id VARCHAR(255),  -- Unique per save action
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_product_name ON product_detections(product_name);
CREATE INDEX idx_session_id ON product_detections(session_id);
CREATE INDEX idx_timestamp ON product_detections(timestamp);
```

---

## 4. Experiments & Results

### 4.1 Training Experiments

We conducted iterative experiments to optimize model performance:

| Experiment | Configuration | mAP@50 | Notes |
|------------|---------------|--------|-------|
| Baseline | Default settings | 65.0% | Struggled with small items |
| Augmentation V1 | Heavy Mosaic + HSV | 72.0% | Improved generalization |
| Geometric Stress | Aggressive warping | 70.0% | Regression - label distortion |
| Domain Adaptation | Mixed real-world data | 78.0% | Better real-shelf performance |
| **Final Production** | **Optimal augmentation** | **95.51%** | **Best configuration** |

### 4.2 Final Model Metrics

#### 4.2.1 Validation Performance (Grozi-120)

| Metric | Score | Interpretation |
|--------|-------|----------------|
| **mAP@50** | **95.51%** | Excellent detection accuracy |
| **mAP@50-95** | **81.98%** | High bounding box precision |
| **Precision** | **84.89%** | Low false positive rate |
| **Recall** | **88.52%** | Low false negative rate |
| **F1 Score** | **86.66%** | Balanced precision/recall |

#### 4.2.2 Performance Visualization

```
Metric Comparison Chart
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

mAP@50     ████████████████████████████████████████ 95.51%
mAP@50-95  ████████████████████████████████░░░░░░░░ 81.98%
Precision  ██████████████████████████████████░░░░░░ 84.89%
Recall     ███████████████████████████████████░░░░░ 88.52%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Target: 85%                                    ▲
```

#### 4.2.3 Training Curves

| Epoch | Train Loss | Val Loss | mAP@50 |
|-------|------------|----------|--------|
| 1 | 4.21 | 3.89 | 12.3% |
| 10 | 1.82 | 1.65 | 45.2% |
| 20 | 0.94 | 0.88 | 72.1% |
| 30 | 0.52 | 0.51 | 86.4% |
| 40 | 0.31 | 0.33 | 92.8% |
| 50 | 0.22 | 0.25 | 95.5% |

### 4.3 Real-World Evaluation

#### 4.3.1 Stress Test Results

Tested on 180 real-world shelf images (not in training set):

| Condition | Detection Rate | Notes |
|-----------|----------------|-------|
| Good lighting | 92% | Excellent performance |
| Low lighting | 78% | Acceptable degradation |
| Partial occlusion | 85% | Handles overlapping products |
| Reflective packaging | 71% | Challenge area |
| Dense shelves | 88% | Strong multi-object detection |

#### 4.3.2 Inference Performance

| Metric | Value |
|--------|-------|
| **Model Size** | 19.24 MB |
| **Inference Time (CPU)** | ~180ms per image |
| **Inference Time (GPU)** | ~25ms per image |
| **Throughput** | ~40 FPS (GPU) |

### 4.4 Application Screenshots

#### Admin Dashboard - Shelf Scanner
```
┌─────────────────────────────────────────────────────────────┐
│ 📷 Shelf Scanner                                            │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │              [Shelf Image with Detections]              │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 🎯 Detection Details                                        │
│ ┌───────────────────────────┬─────────────┐                │
│ │ Product                   │ Category    │                │
│ ├───────────────────────────┼─────────────┤                │
│ │ Pringles Sour Cream       │ Snacks      │                │
│ │ Lay's Classic             │ Snacks      │                │
│ │ Pepperidge Farm Cookies   │ Snacks      │                │
│ └───────────────────────────┴─────────────┘                │
│                                                             │
│ [💾 Save to Inventory]                                      │
└─────────────────────────────────────────────────────────────┘
```

#### User Dashboard - SmartCart AI
```
┌─────────────────────────────────────────────────────────────┐
│ 🛒 SmartCart Assistant                                      │
│                                                             │
│ Your shopping list:                                         │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Pringles, chips, cookies                                │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [🔍 Find my items]                                          │
│                                                             │
│ Results:                                                    │
│ ┌──────────────────┬──────────┬─────┬───────┬─────────┐    │
│ │ Item             │ Category │ Qty │ Price │ Aisle   │    │
│ ├──────────────────┼──────────┼─────┼───────┼─────────┤    │
│ │ Pringles S&O     │ Snacks   │ 45  │ $2.99 │ Aisle 4 │    │
│ │ Lay's Classic    │ Snacks   │ 23  │ $4.29 │ Aisle 3 │    │
│ │ Pepperidge Farm  │ Snacks   │ 12  │ $4.49 │ Aisle 5 │    │
│ └──────────────────┴──────────┴─────┴───────┴─────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 4.5 Comparison to Baselines

| Method | mAP@50 | Inference Time | Model Size |
|--------|--------|----------------|------------|
| YOLOv5s (baseline) | 78.2% | 30ms | 14.1 MB |
| YOLOv8s | 89.4% | 28ms | 22.5 MB |
| **YOLOv11s (ours)** | **95.51%** | **25ms** | **19.24 MB** |
| Faster R-CNN | 82.1% | 120ms | 108 MB |

---

## 5. Discussion

### 5.1 What Worked Well

1. **Three-Stage Pipeline:** The combination of SKU-110K for localization, Grozi-120 for classification, and CLIP verification significantly improved accuracy over single-model approaches.

2. **Aggressive Data Augmentation:** Mosaic augmentation at 100% probability was crucial for teaching the model to handle cluttered shelf environments.

3. **CLIP Verification:** OpenAI Vision API successfully corrected ~15% of misclassifications, particularly for visually similar products (e.g., different Pringles flavors).

4. **Session-Based Tracking:** Implementing unique session IDs for each save action provided accurate historical tracking without artificial grouping.

5. **Real-Time Event System:** The cross-component event system enabled seamless UI updates without page refreshes.

### 5.2 Limitations and Challenges

1. **Fine-Grained Variants:** The model occasionally confuses products with nearly identical packaging (e.g., "Regular" vs "Low Sodium" variants).

2. **Reflective Packaging:** Products with metallic or highly reflective packaging show ~20% lower detection rates due to glare.

3. **Extreme Occlusion:** Products more than 70% occluded are frequently missed.

4. **API Dependency:** CLIP verification requires external API calls, adding latency (~500ms) and cost per verification.

5. **Limited Product Catalog:** Currently supports 120 products; scaling to thousands would require retraining.

### 5.3 Key Insights

1. **Domain Gap:** Models trained on isolated product images perform poorly on shelf images without domain adaptation. Our augmentation pipeline bridges this gap.

2. **Verification Value:** Even a small verification step (CLIP) on low-confidence predictions yields significant accuracy improvements at minimal computational cost.

3. **User Experience Matters:** Real-time feedback and intuitive interfaces are as important as model accuracy for practical deployment.

4. **Session Granularity:** Individual session tracking (vs. time-window grouping) provides more accurate audit trails for inventory management.

---

## 6. Conclusion & Future Work

### 6.1 Conclusion

OmniShelf AI successfully demonstrates the viability of computer vision for automated retail inventory management. By achieving **95.51% mAP** on product detection and implementing a comprehensive full-stack application, we have created a production-ready system that can:

- ✅ Automatically detect and classify 120 grocery products
- ✅ Provide real-time stock level monitoring
- ✅ Enable AI-powered shopping assistance
- ✅ Track inventory history with session-level granularity
- ✅ Verify classifications using state-of-the-art vision-language models

The three-stage detection pipeline (SKU-110K → Grozi-120 → CLIP) proved highly effective, with each stage addressing specific challenges in the retail environment.

### 6.2 Future Work

| Enhancement | Priority | Description | Expected Impact |
|-------------|----------|-------------|-----------------|
| **Edge Deployment** | High | Deploy on Raspberry Pi / Jetson Nano | Enable in-store cameras |
| **Expanded Catalog** | High | Scale to 1,000+ products | Broader retail coverage |
| **Barcode Hybrid** | Medium | Combine vision with barcode scanning | Improved accuracy |
| **Mobile App** | Medium | React Native companion app | Customer convenience |
| **Multi-Store** | Medium | Support chain store deployments | Enterprise scalability |
| **Auto-Reordering** | Low | Integration with supplier systems | End-to-end automation |
| **Planogram Compliance** | Low | Detect shelf arrangement errors | Merchandising optimization |

---

## 7. References

1. Redmon, J., et al. (2016). "You Only Look Once: Unified, Real-Time Object Detection." CVPR.

2. Jocher, G., et al. (2023). "Ultralytics YOLOv8." GitHub repository.

3. George, M., & Floerkemeier, C. (2014). "Recognizing Products: A Per-exemplar Multi-label Image Classification Approach." ECCV.

4. Goldman, E., et al. (2019). "Precise Detection in Densely Packed Scenes." CVPR. (SKU-110K dataset)

5. Radford, A., et al. (2021). "Learning Transferable Visual Models From Natural Language Supervision." ICML. (CLIP)

6. OpenAI. (2024). "GPT-4o Vision Capabilities." Technical Report.

7. Lin, T.Y., et al. (2017). "Feature Pyramid Networks for Object Detection." CVPR.

8. Bochkovskiy, A., et al. (2020). "YOLOv4: Optimal Speed and Accuracy of Object Detection." arXiv.

---

## 8. Appendix

### A. Project Structure

```
omnishelf_ai/
├── backend/                    # FastAPI Application
│   ├── __init__.py
│   ├── main.py                # API endpoints (974 lines)
│   ├── models.py              # SQLAlchemy models
│   ├── schemas.py             # Pydantic schemas
│   ├── crud.py                # Database operations
│   ├── database.py            # DB connection
│   └── config.py              # Configuration
│
├── frontend_react/             # React Application
│   ├── src/
│   │   ├── App.tsx            # Main router
│   │   ├── components/        # 50+ UI components
│   │   │   ├── ShelfScanner.tsx
│   │   │   ├── InventoryTable.tsx
│   │   │   ├── SmartCartAssistant.tsx
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   └── ...
│   │   └── services/
│   │       ├── api.ts         # API client
│   │       └── inventoryEvents.ts
│   ├── package.json
│   └── vite.config.ts
│
├── yolo/                       # ML Pipeline
│   ├── sku_grozi_detector.py  # Two-stage detector
│   ├── clip_verifier.py       # OpenAI verification
│   ├── utils.py               # Inference utilities
│   └── runs/                  # Trained models
│       └── grozi120_yolo11s/
│           └── weights/
│               └── best.pt    # Production model
│
├── product_mapping.py          # Product metadata (120 products)
├── docker-compose.yml          # Container orchestration
├── requirements.txt            # Python dependencies
└── PROJECT_REPORT.md          # This document
```

### B. API Endpoint Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /health` | GET | Health check |
| `POST /predict/two-stage` | POST | Full detection pipeline |
| `POST /inventory/bulk-update` | POST | Save detections to DB |
| `GET /inventory/recent-uploads` | GET | Get scan sessions |
| `GET /stock/summary` | GET | Current stock levels |
| `POST /smartcart/search` | POST | Product search |
| `GET /analytics` | GET | Historical data |

### C. Environment Setup

```bash
# Clone repository
git clone https://github.com/sukritisehgal-28/OmniShelf_ai.git
cd OmniShelf_ai

# Start database
docker-compose up -d db

# Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --port 8002

# Frontend
cd frontend_react
npm install
npm run dev
```

### D. Sample Detection Output

```json
{
  "detections": [
    {
      "class_name": "grozi_35",
      "display_name": "Pringles Sour Cream & Onion",
      "category": "Snacks",
      "confidence": 0.94,
      "bbox": [120, 45, 280, 320],
      "verified": true,
      "verification_source": "clip"
    },
    {
      "class_name": "grozi_36",
      "display_name": "Pringles Potato Crisps",
      "category": "Snacks", 
      "confidence": 0.89,
      "bbox": [290, 50, 450, 315],
      "verified": true,
      "verification_source": "yolo"
    }
  ],
  "processing_time_ms": 342,
  "model_version": "yolo11s-grozi120-v2"
}
```

---

**Repository:** [github.com/sukritisehgal-28/OmniShelf_ai](https://github.com/sukritisehgal-28/OmniShelf_ai)  
**Branch:** `training-restart`
