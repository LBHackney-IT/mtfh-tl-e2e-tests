Feature: test google home page

  Scenario: Navigate to Google Home page and search for Cypress text
    Given I navigate to Google Home Page
    When I enter text 'Cypress' in the search box and click on button
    Then I am on the relevant page