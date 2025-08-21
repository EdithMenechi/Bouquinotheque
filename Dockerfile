FROM node:23.11-alpine as base
ARG PORT=3000
WORKDIR /src

# Build
FROM base as build
COPY --link package.json package-lock.json .
RUN npm ci --omit dev
COPY --link . .
RUN npm run build

# Run
FROM base
ENV PORT=$PORT
ENV NODE_ENV=production
COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]