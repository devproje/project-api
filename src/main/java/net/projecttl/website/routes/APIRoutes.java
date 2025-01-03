package net.projecttl.website.routes;

import net.projecttl.website.service.HistoryService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class APIRoutes {
    private final HistoryService historyService;

    public APIRoutes(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping(value = "/api/hc", produces = MediaType.APPLICATION_JSON_VALUE)
    public String hc() {
        return "{\"ok\": 1, \"message\": \"" + historyService.hello() + "\"}";
    }
}
