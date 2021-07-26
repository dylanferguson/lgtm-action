ARG TAG=16-buster-slim
FROM node:$TAG

WORKDIR /app

CMD ["run build"]

ENTRYPOINT ["npm"]