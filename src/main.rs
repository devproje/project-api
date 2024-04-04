mod api;
mod routes;

use log::{error, info};
use crate::routes::{index, v1};
use actix_web::{App, HttpServer, web};

extern crate dotenv;

static DEFAULT_ADDR: &str = "0.0.0.0";
static DEFAULT_PORT: u16 = 3000;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    log4rs::init_file("logging.yml", Default::default())
        .expect("Failed to initialize logging");

    let route = || {
        App::new()
            .service(index::handler)
            .service(web::scope("/v1").configure(v1))
    };

    let addr: &str = DEFAULT_ADDR;
    let port: u16 = DEFAULT_PORT;

    let server = HttpServer::new(route);
    match server.bind((addr, port)) {
        Ok(server) => {
            info!("Starting server at http://{}:{}", addr, port);
            server.run().await
        },
        Err(e) => {
            error!("Error: {}", e);
            std::process::exit(1);
        }
    }
}
