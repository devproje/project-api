use rand::Rng;
use std::time::Instant;
use actix_web::{get, HttpResponse, Responder};
use actix_web::http::StatusCode;
use actix_web::web::Query;
use serde::{Deserialize, Serialize};
use crate::api::hanriver::{get, HanRiver};

#[derive(Serialize)]
struct HanRiverResp {
    ok: i32,
    status: u16,
    id: i32,
    data: HanRiver,
    response_time: String
}

#[derive(Deserialize)]
struct URLQuery {
    area: Option<String>
}

#[get("/hanriver")]
async fn handler(query: Query<URLQuery>) -> impl Responder {
    let start = Instant::now();

    let mut rng = rand::thread_rng();
    let mut area = rng.gen_range(1..=5);
    match &query.area {
        None => (),
        Some(x) => area = x.parse().unwrap()
    }

    let res = get(area).await;
    let data = match res {
        Ok(data) => data,
        Err(err) => {
            return HttpResponse::build(StatusCode::from_u16(err.status).unwrap()).json(err);
        }
    };

    HttpResponse::Ok().json(HanRiverResp {
        ok: 1,
        status: 200,
        id: area,
        data,
        response_time: format!("{}ms", start.elapsed().as_millis())
    })
}
