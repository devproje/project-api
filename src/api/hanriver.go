package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type hanriver struct {
	Area     string
	DateTime time.Time
	Temp     float64
	PH       float64
}

type rawhanriver struct {
	Data struct {
		Result struct {
			Code string `json:"CODE"`
		} `json:"RESULT"`
		Row []struct {
			MsrDate string `json:"MSR_DATE"`
			MsrTime string `json:"MSR_TIME"`
			SiteID  string `json:"SITE_ID"`
			WTemp   string `json:"W_TEMP"`
			WPH     string `json:"W_PH"`
			WDO     string `json:"W_DO"`
			WTN     string `json:"W_TN"`
			WTP     string `json:"W_TP"`
			WTOC    string `json:"W_TOC"`
			WPHEN   string `json:"W_PHEN"`
			WCN     string `json:"W_CN"`
		} `json:"row"`
	} `json:"WPOSInformationTime"`
}

func rawHanURL(area int) string {
	return fmt.Sprintf("http://openapi.seoul.go.kr:8088/sample/json/WPOSInformationTime/%d/%d", area, area)
}

func GetHanRiver(area int) (*hanriver, error) {
	url := rawHanURL(area)
	res, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	raw, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	var rawData rawhanriver
	err = json.Unmarshal(raw, &rawData)
	if err != nil {
		return nil, err
	}

	input := rawData.Data.Row[0]

	ys := input.MsrDate[:len(input.MsrDate)-4]
	ms := input.MsrDate[len(input.MsrDate)-4 : len(input.MsrDate)-2]
	ds := input.MsrDate[len(input.MsrDate)-2:]

	strip := strings.Split(input.MsrTime, ":")

	y, _ := strconv.ParseInt(ys, 10, 64)
	m, _ := strconv.ParseInt(ms, 10, 64)
	d, _ := strconv.ParseInt(ds, 10, 64)

	hour, _ := strconv.ParseInt(strip[0], 10, 64)
	min, _ := strconv.ParseInt(strip[1], 10, 64)

	temp, _ := strconv.ParseFloat(input.WTemp, 64)
	ph, _ := strconv.ParseFloat(input.WPH, 64)

	date := time.Date(
		int(y),
		time.Month(int(m)),
		int(d),
		int(hour),
		int(min),
		0,
		0,
		time.Now().Location(),
	)

	data := hanriver{
		Area:     input.SiteID,
		DateTime: date,
		Temp:     temp,
		PH:       ph,
	}

	return &data, nil
}
