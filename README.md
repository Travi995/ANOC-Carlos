## Overview
This project is a NestJS application configured to run with PostgreSQL 16.2 via Docker Compose, using environment variables defined in a `.env` file.

## Prerequisites
- Docker CE ([install guide](https://docs.docker.com/get-docker/)) :contentReference[oaicite:0]{index=0}  
- Docker Compose (Compose file format version 3) :contentReference[oaicite:1]{index=1}  
- Node.js ≥ 18.x and npm (for local development)

## Environment Variables
Copy the example file and customize:

```bash
npm install

# Levanta los servicios con Docker Compose
docker-compose up -d    # :contentReference[oaicite:1]{index=1}

# Ejecuta la aplicación NestJS en modo desarrollo
npm run start:dev  
