use actix_web::{get, Responder};
use actix_web::web::Redirect;

static URL: &str = "https://github.com/devproje/project-api.git";

#[get("/")]
pub async fn handler() -> impl Responder {
    Redirect::to(URL).permanent()
}
