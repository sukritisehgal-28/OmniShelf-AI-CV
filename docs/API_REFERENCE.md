# OmniShelf AI - API Reference

Backend API documentation for the FastAPI server running on port **8002**.

---

## Base URL

```
http://localhost:8002
```

---

## Health & Status

### `GET /health`
Health check endpoint.

**Response:**
```json
{ "status": "healthy" }
```

---

## Detection API

### `POST /predict/two-stage`
Run the full three-stage detection pipeline on a shelf image.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (image file)

**Response:**
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
    }
  ],
  "processing_time_ms": 342,
  "model_version": "yolo11s-grozi120-v2"
}
```

---

## Inventory API

### `POST /inventory/bulk-update`
Save detected products to the database.

**Request:**
```json
{
  "detections": [
    {
      "product_name": "Pringles Sour Cream & Onion",
      "confidence": 0.94,
      "bbox": [120, 45, 280, 320],
      "category": "Snacks"
    }
  ],
  "shelf_id": "shelf_scan"
}
```

**Response:**
```json
{
  "status": "success",
  "saved_count": 1,
  "session_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### `GET /inventory/recent-uploads`
Get recent scan sessions grouped by session_id.

**Query Parameters:**
- `limit` (optional): Number of sessions to return (default: 10)

**Response:**
```json
[
  {
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2025-12-05T14:30:00Z",
    "product_count": 5,
    "products": [...]
  }
]
```

### `GET /inventory`
Get all inventory items with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search by product name
- `limit` (optional): Limit results

---

## Stock API

### `GET /stock/summary`
Get current stock levels summary.

**Response:**
```json
{
  "total_products": 120,
  "in_stock": 85,
  "low_stock": 20,
  "out_of_stock": 15,
  "categories": {
    "Snacks": { "count": 45, "value": 134.55 },
    "Beverages": { "count": 30, "value": 89.70 }
  }
}
```

### `GET /stock/alerts`
Get stock alerts (low stock and out of stock items).

**Response:**
```json
{
  "alerts": [
    {
      "product_name": "Pringles Original",
      "current_stock": 0,
      "alert_type": "out_of_stock"
    }
  ]
}
```

---

## SmartCart API

### `POST /smartcart/search`
Search for products by name or shopping list.

**Request:**
```json
{
  "query": "pringles, chips, cookies"
}
```

**Response:**
```json
{
  "results": [
    {
      "product_name": "Pringles Sour Cream & Onion",
      "category": "Snacks",
      "quantity": 45,
      "price": 2.99,
      "aisle": "Aisle 4"
    }
  ]
}
```

---

## Analytics API

### `GET /analytics`
Get historical analytics data.

**Query Parameters:**
- `start_date` (optional): Start date for range
- `end_date` (optional): End date for range
- `category` (optional): Filter by category

**Response:**
```json
{
  "daily_scans": [...],
  "category_breakdown": {...},
  "stock_trends": [...]
}
```

---

## Error Responses

All endpoints return standard error responses:

```json
{
  "detail": "Error message description"
}
```

**HTTP Status Codes:**
- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

---

## Interactive Documentation

Visit [http://localhost:8002/docs](http://localhost:8002/docs) for the Swagger UI interactive API explorer.

---

*Last Updated: December 2025*
