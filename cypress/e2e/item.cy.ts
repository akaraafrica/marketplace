import data from "../fixtures/data.json";
const { _ } = Cypress;

describe("Marketplace Page", function () {
  beforeEach(function () {
    cy.visit("/marketplace");
  });

  it("renders all marketplace items", function () {
    const items = Object.keys(data.items);

    // _.each(items, (lesson, index) => {
    //   const lessons = data.items[lesson].lessons

    //   cy.getBySel(`tutorial-${index}`).within(() => {
    //     _.each(lessons, (lesson, index) => {
    //       const lessonTitle = lessons[index].title
    //       cy.getBySel(`tutorial-lesson-${index}`).contains(lessonTitle)
    //     })
    //   })
    // })
  });
});

export {};
