use actix_web::{get, HttpResponse, Responder};
use chrono_tz::Tz::Asia__Seoul;
use serde::Serialize;

#[derive(Serialize)]
struct HealthCheck {
    ok: i32,
    status: u16,
    time: String,
    unix_ms: i64
}

#[get("/hc")]
pub async fn handler() -> impl Responder {
    let now = chrono::Utc::now().with_timezone(&Asia__Seoul);
    HttpResponse::Ok().json(HealthCheck {
        ok: 1,
        status: 200,
        time: now.to_rfc3339(),
        unix_ms: now.timestamp_millis()
    })
}