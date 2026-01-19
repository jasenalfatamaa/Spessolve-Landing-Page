# Stage 1: Base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Stage 2: Dependencies
FROM base AS deps
RUN npm ci

# Stage 3: Test
FROM deps AS test
COPY . .
RUN npm run test

# Stage 4: Build
FROM deps AS build
COPY . .
RUN npm run build

# Stage 5: Production
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
