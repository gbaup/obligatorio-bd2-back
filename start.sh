#!/bin/bash

export $(grep -v '^#' .env | xargs)

if [ "$USE_LOCAL_DB" = "true" ]; then
  echo "🗃️ Levantando app + base de datos local..."
  docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d
else
  echo "🚀 Levantando solo app (sin DB)..."
  docker-compose -f docker-compose.yml up -d
fi
