# Use official Node.js image for backend build
FROM node:18 AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Use official Node.js image for frontend build
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Production image for backend with static frontend
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=backend /app/backend ./backend
COPY --from=frontend /app/frontend/build ./frontend/build
WORKDIR /app/backend
ENV NODE_ENV=production
ENV MONGO_URI=mongodb+srv://stdsystem:wtassignment2@cluster0.bodcgne.mongodb.net/studentdb?retryWrites=true&w=majority&appName=Cluster0
EXPOSE 5000
CMD ["node", "server.js"]
