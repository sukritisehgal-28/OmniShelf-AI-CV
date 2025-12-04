#!/usr/bin/env bash

# Dev helper to launch backend (FastAPI) and frontend (Streamlit) together.
# - Ensures venv is activated
# - Verifies the Colab-trained model exists
# - Starts uvicorn in the background, then Streamlit in the foreground
# - Cleans up the backend process on exit

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ -d "venv" && -x "venv/bin/activate" ]]; then
  # shellcheck source=/dev/null
  source "venv/bin/activate"
else
  echo "ERROR: venv not found. Create it first: python -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
  exit 1
fi

MODEL="$ROOT/yolo/runs/detect/train_colab/weights/best.pt"
if [[ ! -f "$MODEL" ]]; then
  echo "WARNING: Model not found at $MODEL"
  echo "The /predict endpoint will be disabled until you add your trained checkpoint."
fi

UVICORN_HOST="${UVICORN_HOST:-0.0.0.0}"
UVICORN_PORT="${UVICORN_PORT:-8002}"
export API_BASE_URL="${API_BASE_URL:-http://localhost:${UVICORN_PORT}}"

echo "Starting backend: uvicorn backend.main:app --host ${UVICORN_HOST} --port ${UVICORN_PORT} --reload"
uvicorn backend.main:app --host "${UVICORN_HOST}" --port "${UVICORN_PORT}" --reload &
UV_PID=$!

cleanup() {
  echo "Stopping backend (pid ${UV_PID})"
  kill "${UV_PID}" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "Starting frontend: streamlit run frontend/app.py (API_BASE_URL=${API_BASE_URL})"
streamlit run frontend/app.py
