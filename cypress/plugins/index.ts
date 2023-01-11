/// <reference types="cypress" />
// @ts-ignore
require("dotenv").config();

/**
 * @type {Cypress.PluginConfig}
 */

export default (on: any, config: any) => {
  config.env.siteURL = process.env.SITE_URL;
  require("cypress-metamask-v2/cypress/plugins")(on);
  return config;
};
