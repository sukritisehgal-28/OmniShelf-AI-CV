from __future__ import annotations

from datetime import datetime

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend import models
from backend.database import get_db
from backend.main import app

SQLALCHEMY_DATABASE_URL = "sqlite+pysqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)


@pytest.fixture(autouse=True)
def setup_database():
    connection = engine.connect()
    transaction = connection.begin()
    models.Base.metadata.create_all(bind=connection)
    db = sessionmaker(bind=connection, autoflush=False, autocommit=False)()

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    yield db
    db.close()
    transaction.rollback()
    connection.close()
    models.Base.metadata.drop_all(bind=engine)
    app.dependency_overrides.clear()


@pytest.fixture()
def client():
    return TestClient(app)


def test_health_endpoint(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def _sample_detection(product_name: str = "Cereal", shelf_id: str = "S1"):
    return {
        "product_name": product_name,
        "confidence": 0.9,
        "bbox_x1": 1.0,
        "bbox_y1": 2.0,
        "bbox_x2": 3.0,
        "bbox_y2": 4.0,
        "shelf_id": shelf_id,
        "timestamp": datetime.now().isoformat(),
    }


def test_create_detections_and_stock_flow(client):
    payload = [_sample_detection(), _sample_detection("Cereal", "S2")]
    response = client.post("/detections/", json=payload)
    assert response.status_code == 200
    assert len(response.json()) == 2

    stock_response = client.get("/stock/Cereal")
    assert stock_response.status_code == 200
    data = stock_response.json()
    assert data["total_count"] == 2
    assert set(data["shelf_ids"]) == {"S1", "S2"}


def test_shopping_list_flow(client, setup_database):
    db = setup_database
    planogram_entry = models.Planogram(product_name="Milk", shelf_id="A1", expected_stock=5)
    db.add(planogram_entry)
    db.commit()

    client.post("/detections/", json=[_sample_detection("Milk", "A1")])

    response = client.post("/shopping-list", json={"items": ["Milk", "Bread"]})
    assert response.status_code == 200
    items = response.json()["items"]
    milk_item = next(item for item in items if item["product_name"] == "Milk")
    assert milk_item["shelf_id"] == "A1"
    assert milk_item["count"] == 1
    bread_item = next(item for item in items if item["product_name"] == "Bread")
    assert bread_item["stock_level"] == "OUT"


def test_alert_flow(client):
    payload = {
        "product_name": "grozi_19",
        "alert_type": "LOW_STOCK",
        "message": "Coke running low on shelf S1",
        "resolved": False,
    }

    create_resp = client.post("/alerts", json=payload)
    assert create_resp.status_code == 200
    created = create_resp.json()
    assert created["product_name"] == payload["product_name"]
    assert created["resolved"] is False

    list_resp = client.get("/alerts")
    assert list_resp.status_code == 200
    alerts = list_resp.json()
    assert len(alerts) == 1
    assert alerts[0]["message"] == payload["message"]

    resolve_resp = client.put(f"/alerts/{created['id']}/resolve")
    assert resolve_resp.status_code == 200
    resolved_alert = resolve_resp.json()
    assert resolved_alert["resolved"] is True
