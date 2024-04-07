#!/bin/sh

if [ "$APP_STAGE" = "dev" ]; then
  uvicorn api.main:api --host 0.0.0.0 --port 8000 --reload
else
  uvicorn api.main:api --host 0.0.0.0 --port 8000
fi