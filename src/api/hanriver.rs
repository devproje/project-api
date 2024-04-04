use std::format;
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct HanRiver {
    area: String,
    datetime: String,
    temp: f64,
    ph: f64
}

#[derive(Serialize)]
pub struct HanRiverError {
    ok: i32,
    pub status: u16,
    reason: String
}

#[derive(Deserialize)]
struct RawData {
    #[serde(rename = "WPOSInformationTime")]
    data: POSInfo
}

#[derive(Deserialize)]
struct POSInfo {
    row: Vec<Row>
}

#[derive(Deserialize)]
struct Row {
    #[serde(rename = "MSR_DATE")]
    msr_date: String,
    #[serde(rename = "MSR_TIME")]
    msr_time: String,
    #[serde(rename = "SITE_ID")]
    site_id: String,
    #[serde(rename = "W_TEMP")]
    temp: String,
    #[serde(rename = "W_PH")]
    ph: String
}

fn url(area: i32) -> String {
    return format!("http://openapi.seoul.go.kr:8088/sample/json/WPOSInformationTime/{area}/{area}");
}

pub async fn get(area: i32) -> Result<HanRiver, HanRiverError> {
    if (area < 1) || (area > 5) {
        return Err(HanRiverError {
            ok: 0,
            status: 400,
            reason: "Invalid area".to_string()
        });
    }

    let res = reqwest::get(url(area)).await;
    let body = match res.unwrap().json::<RawData>().await {
        Ok(x) => x,
        Err(err) => return Err(HanRiverError {
            ok: 0,
            status: 500,
            reason: err.to_string()
        })
    };
    let mut time: Vec<String> = Vec::new();

    body.data.row[0].msr_time.split(":").for_each(|sp: &str| {
        time.push(sp.to_string());
    });

    let datetime = format!(
        "{}-{}-{}T{}:{}:00+09:00",
        &body.data.row[0].msr_date[0..4],
        &body.data.row[0].msr_date[4..6],
        &body.data.row[0].msr_date[6..8],
        time[0],
        time[1]
    );

    Ok(HanRiver {
        area: body.data.row[0].site_id.to_string(),
        datetime: datetime.to_string(),
        temp: body.data.row[0].temp.parse().unwrap_or_else(|_| 0.0),
        ph: body.data.row[0].ph.parse().unwrap_or_else(|_| 0.0)
    })
}
