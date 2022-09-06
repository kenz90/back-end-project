const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => {
  return db.end();
});

describe("/api/categories", () => {
  describe("GET /api/categories", () => {
    test("status: 200, should respond with all categories", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((result) => {
          expect(result.body.categories).toHaveLength(4);
          result.body.categories.forEach((category) => {
            expect(category).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET /api/categories ERRORS", () => {
    test("status: 404, should respond with error message not found when given incorrect route", () => {
      return request(app)
        .get("/api/caaateoriesus")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("not found");
        });
    });
  });
});
