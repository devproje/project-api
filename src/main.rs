mod api;
mod routes;

use std::env;
use dotenv::dotenv;
use log::{error, info};
use crate::routes::{index, v1};
use actix_web::{App, HttpServer, web};

extern crate dotenv;

static DEFAULT_ADDR: &str = "0.0.0.0";
static DEFAULT_PORT: u16 = 3000;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    log4rs::init_file("log4rs.yml", Default::default())
        .expect("Failed to initialize log4rs");

    let route = || {
        App::new()
            .service(index::handler)
            .service(web::scope("/v1").configure(v1))
    };

    let addr = env::var("ADDR").unwrap_or_else(|_| DEFAULT_ADDR.to_string());
    let port: u16 = match env::var("PORT") {
        Ok(val) => val.parse().unwrap(),
        Err(_) => DEFAULT_PORT
    };

    let server = HttpServer::new(route);
    match server.bind((addr.clone(), port)) {
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
