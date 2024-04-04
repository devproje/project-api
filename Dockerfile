FROM rust:alpine3.19

WORKDIR /opt/app/src
COPY . .

RUN apk add --no-cache openssl-dev
RUN cargo build --release

RUN mv ./target/release/project-api /opt/app
RUN mv ./logging.yml /opt/app

ENTRYPOINT ["/opt/app/project-api"]
