FROM node:23.11.0-alpine AS base
ARG PORT=3000
WORKDIR /src

# Deps
FROM base AS deps
COPY --link package.json package-lock.json .
RUN npm ci --omit dev

# Build
FROM deps AS build
COPY --link . .
RUN npm run build

# Run (production)
FROM base
ENV PORT=$PORT
ENV NODE_ENV=production
COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]