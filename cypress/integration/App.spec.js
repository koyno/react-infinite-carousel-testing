//it's possible to get these props straight from App.js
//using cypress-react-unit-test, but it won't work in integration tests
const breakpoints = [768, 1200, 1600];
const animationDuration = 500;

describe("React Leaf Carousel", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  //test will fail if slidesToScroll > slidesToShow (it doesn't make sense anyway)
  it("lazy loading", () => {
    //store how many images are visible
    cy.get("img:visible")
      .its("length")
      .then((len) => {
        //check the last visible image exist and the next doesn't
        cy.get('[data-testid="img' + (len - 1) + '"]').should("exist");
        cy.get('[data-testid="img' + len + '"]').should("not.exist");

        //check the image is available after becoming visible
        cy.get('[data-testid="infinite-carousel-button-next"]').click();
        cy.get('[data-testid="img' + len + '"]').should("exist");
      });
  });

  //viewport redraw is slow
  let pause = 1000;
  breakpoints.forEach((breakpoint) => {
    it(`breakpoint ${breakpoint}px`, () => {
      //get images quantity for "breakpoint-1" size
      cy.viewport(breakpoint - 1, 600).wait(pause);
      cy.get("img:visible")
        .its("length")
        .then((len1) => {
          //and compare with "breakpoint".
          //naïve assumption that different breakpoints have different number of images
          cy.viewport(breakpoint, 600).wait(pause);
          cy.get("img:visible").its("length").should("not.eq", len1);
        });
    });
  });

  //test will fail without cy.wait() if animation is turned on
  it("arrows and dots", () => {
    //store how many images are visible
    cy.get("img:visible")
      .its("length")
      .then((len) => {
        //arrows
        //check the next image after visible one isn't visible yet
        cy.get('[data-testid="img' + len + '"]').should("not.be.visible");

        cy.get('[data-testid="infinite-carousel-button-next"]').click();
        cy.get('[data-testid="img' + len + '"]').should("be.visible");

        //cy.wait(animationDuration)
        cy.get('[data-testid="infinite-carousel-button-previous"]').click();
        cy.get('[data-testid="img' + len + '"]').should("not.be.visible");

        //dots
        cy.get('[data-testid="infinite-carousel-dots"]>button').each(
          ($el, index) => {
            cy.wrap($el).click();

            //compute IDs for images
            let page = index * len;

            //cy.wait(animationDuration)
            cy.get('[data-testid="img' + (page - 1) + '"]').should(
              "not.be.visible"
            );
            cy.get('[data-testid="img' + page + '"]').should("be.visible");
            cy.get('[data-testid="img' + (page + len - 1) + '"]').should(
              "be.visible"
            );
            cy.get('[data-testid="img' + (page + len) + '"]').should(
              "not.be.visible"
            );
          }
        );
      });
  });
});
