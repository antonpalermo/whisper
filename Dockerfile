FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS build
WORKDIR /usr/apps

COPY . /usr/apps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run -r build

RUN pnpm deploy --filter=wisp-core --prod /prod/wisp-core
RUN pnpm deploy --filter=wisp-admin --prod /prod/wisp-admin
RUN pnpm deploy --filter=wisp-client --prod /prod/wisp-client

FROM base AS wisp-core

COPY --from=build /prod/wisp-core /prod/wisp-core
WORKDIR /prod/wisp-core

EXPOSE 8000
CMD [ "pnpm", "start" ]

FROM base AS wisp-admin

COPY --from=build /prod/wisp-admin /prod/wisp-admin
WORKDIR /prod/wisp-admin

EXPOSE 8001
CMD [ "pnpm", "start" ]

FROM base AS wisp-client

COPY --from=build /prod/wisp-client /prod/wisp-client
WORKDIR /prod/wisp-client

EXPOSE 8001
CMD [ "pnpm", "start" ]
