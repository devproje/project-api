FROM node:22-alpine3.20

WORKDIR /opt/website

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

# Debug Only
ENTRYPOINT ["pnpm", "-C", "/opt/website", "start"]
