import request from "supertest";
import app from "../src/app";

describe("/", () => {
  it("responds with 200 hello world", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal({ hello: "world" });
  });
});
