describe("The Home Page", () => {
  it("displays the login form when not logged in", () => {
    cy.visit("http://localhost:5173");
    cy.get('[data-testid="login"]').should("be.visible");
    cy.get("input#username").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("displays the logout button when logged in", () => {
    cy.setCookie("auth", "123");
    cy.visit("http://localhost:5173");
    cy.get('button[type="button"]').should("be.visible");
  });

  it("logs the user out when the logout button is clicked", () => {
    cy.setCookie("auth", "123");
    cy.visit("http://localhost:5173");
    cy.get('[data-testid="log-out-header"]').click();
    cy.getCookie("auth").should("be.null");
    cy.get('[data-testid="login"]').should("be.visible");
  });
});
