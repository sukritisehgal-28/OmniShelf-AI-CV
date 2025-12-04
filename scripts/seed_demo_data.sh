#!/usr/bin/env bash

# Seed the database with detections + 7-day stock history so the dashboard has data.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PYTHON="python"
if [[ -x "venv/bin/python" ]]; then
  PYTHON="venv/bin/python"
fi

echo "Seeding detections from yolo/real_shelf_evaluation.csv..."
$PYTHON load_detections.py

echo "Generating 7 days of stock history..."
$PYTHON generate_stock_history.py

echo "✅ Demo data seeded. You can now view metrics in the Streamlit dashboard."
