package com.euleoterio.jobs;

import com.euleoterio.models.Event;
import com.euleoterio.services.EventService;
import io.quarkus.scheduler.Scheduled;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped
public class DailyJob {

    private static final Logger LOGGER = Logger.getLogger(DailyJob.class);

    @Inject
    EventService eventService;

    // Cron programado para rodar a cada minuto, para fim de testes
    @Scheduled(cron = "0 * * ? * *")
    public void executeDailyTask() {
        LOGGER.info("Executing daily task at " + LocalDateTime.now());

        List<Event> events = eventService.listAll();
        for (Event event : events) {
            try {
                eventService.updateEvent(event.id, event);
            } catch (Exception e) {
                LOGGER.error("Erro ao processar o evento com ID " + event.id + ": " + e.getMessage());
            }
        }
    }
}