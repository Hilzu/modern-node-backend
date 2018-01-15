import request from "supertest";
import app from "../src/app";

describe("/examples", () => {
  it("root responds with 200 hello world", async () => {
    const response = await request(app).get("/examples/");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal({ hello: "world" });
  });

  it("/echo responds with 200 and returns input", async () => {
    const response = await request(app).get("/examples/echo?input=hello");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal({ input: "hello" });
  });

  it("/echo responds with 400 without input", async () => {
    const response = await request(app).get("/examples/echo?");
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.have.property("name", "ValidationError");
    expect(response.body.error).to.have.property("status", 400);
  });

  it("/calculate responds with 200 and correct result", async () => {
    const response = await request(app)
      .post("/examples/calculate")
      .send({ lho: 3, rho: 5, op: "-" });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal({ result: -2 });
  });

  it("/calculate responds with 400 on invalid input", async () => {
    const response = await request(app)
      .post("/examples/calculate")
      .send({ lho: 1, rho: "2", op: "+" });
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.have.property("name", "ValidationError");
    expect(response.body.error).to.have.property("status", 400);
  });
});
