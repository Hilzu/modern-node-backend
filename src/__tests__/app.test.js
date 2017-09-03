import request from "supertest";
import app from "../app";

describe("/", () => {
  test("responds with 200 hello world", async () => {
    const response = await request(app.callback()).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ hello: "world" });
  });
});
