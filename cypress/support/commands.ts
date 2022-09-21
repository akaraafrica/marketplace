/// <reference path="../global.d.ts" />

// @ts-ignore
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

// @ts-ignore
Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

let LOCAL_STORAGE_MEMORY: any = {};

// @ts-ignore
Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

// @ts-ignore
Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

// @ts-ignore
Cypress.Commands.add("signupUserAndLogin", () => {
  // 1. Create a random data for our new user.
  const user = {
    email: "samuelnnj@gmail.com",
    password: "password",
    address: "0x3ba7568510BB3D9B59Db3cF3317B6fDC8D66a260",
  };

  // 2. Send sign up API call
  return cy
    .request({
      url: "/api/user/signup",
      method: "POST",
      body: user,
      failOnStatusCode: false,
    })
    .then(({ body }) => {
      // 3. Send log in API call
      console.log(body);
      cy.request({
        url: "/api/user/login",
        method: "POST",
        body: {
          email: user.email,
          password: user.password,
        },
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }).then(({ body }) => {
        console.log(body);

        // Save received auth token to local storage
        window.localStorage.setItem("accessToken", body.accessToken);
        return body.data;
      });
    });
});
export {};
