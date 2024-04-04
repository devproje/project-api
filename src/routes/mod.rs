use actix_web::web;

pub mod index;
mod hanriver;
mod hc;

pub fn v1(conf: &mut web::ServiceConfig) {
    conf.service(hanriver::handler)
        .service(hc::handler);
}
