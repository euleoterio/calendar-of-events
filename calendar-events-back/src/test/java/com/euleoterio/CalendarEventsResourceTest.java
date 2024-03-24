package com.euleoterio;


import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

@QuarkusTest
class CalendarEventsResourceTest {
    @Test
    void testHelloEndpoint() {
        given()
          .when().get("/events")
          .then()
             .statusCode(200);
    }

}