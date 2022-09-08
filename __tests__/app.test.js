const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const { application } = require("express");

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
describe("/api/reviews", () => {
  describe("GET /api/reviews/:review_id", () => {
    it("status: 200, response with an array of review objects with its properties  ", () => {
      const review_id = 7;

      return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.review).toEqual(
            expect.objectContaining({
              review_id: 7,
              title: "Mollit elit qui incididunt veniam occaecat cupidatat",
              designer: "Avery Wunzboogerz",
              owner: "mallionaire",
              review_img_url:
                "https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              review_body:
                "Consectetur incididunt aliquip sunt officia. Magna ex nulla consectetur laboris incididunt ea non qui. Enim id eiusmod irure dolor ipsum in tempor consequat amet ullamco. Occaecat fugiat sint fugiat mollit consequat pariatur consequat non exercitation dolore. Labore occaecat in magna commodo anim enim eiusmod eu pariatur ad duis magna. Voluptate ad et dolore ullamco anim sunt do. Qui exercitation tempor in in minim ullamco fugiat ipsum. Duis irure voluptate cupidatat do id mollit veniam culpa. Velit deserunt exercitation amet laborum nostrud dolore in occaecat minim amet nostrud sunt in. Veniam ut aliqua incididunt commodo sint in anim duis id commodo voluptate sit quis.",
              category: "social deduction",
              created_at: "2021-01-25T11:16:54.963Z",
              votes: 9,
            })
          );
        });
    });
    describe("GET /api/reviews/:review_id ERRORS", () => {
      it("status:400, should respond with error message bad request when given invalid data type", () => {
        return request(app)
          .get("/api/reviews/unknownID")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("bad request");
          });
      });
      it("status:404, should respond with error with error message review not found ", () => {
        const reviewid = 983;
        return request(app)
          .get(`/api/reviews/${reviewid}`)
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe(
              `review with id: ${reviewid} does not exist`
            );
          });
      });
    });
  });
});
