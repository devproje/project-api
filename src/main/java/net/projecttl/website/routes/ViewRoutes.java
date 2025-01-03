package net.projecttl.website.routes;

import net.projecttl.website.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/")
public class ViewRoutes {
    private final HistoryService historyService;

    @Autowired
    public ViewRoutes(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public String index() {
        System.out.println(historyService.hello());
        return "index";
    }

    @GetMapping("/history")
    public String history(Model model) {
        return "history";
    }
}
