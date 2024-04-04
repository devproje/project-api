FROM rust:latest

WORKDIR /opt/app/src
COPY . .

RUN apt install openssl
RUN cargo build --release

RUN mv ./target/release/project-api /opt/app
COPY ./logging.yml /opt/app

ENTRYPOINT ["/opt/app/project-api"]
