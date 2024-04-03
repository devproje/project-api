use actix_web::{App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(actix_web::web::resource("/").to(|| async {
            actix_web::HttpResponse::Ok().body("Hello, world!")
        }))
    })
        .bind(("0.0.0.0", 3000))?
        .run()
        .await
}
