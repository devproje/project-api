mod routes;
mod api;

use log::{info};
use crate::routes::{index, v1};
use actix_web::{App, HttpServer, web};

extern crate dotenv;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    log4rs::init_file("logging.yml", Default::default()).unwrap();

    info!("Starting server at http://{}:{}", "0.0.0.0", 3000);

    let route = || {
        App::new()
            .service(index::handler)
            .service(web::scope("/v1").configure(v1))
    };

    HttpServer::new(route).bind(("0.0.0.0", 3000))?.run().await
}
