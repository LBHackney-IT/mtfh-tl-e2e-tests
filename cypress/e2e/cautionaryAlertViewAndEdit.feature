Feature: Create Cautionary Alerts

  Background:
    Given I am logged in
    And There's a person with a cautionary alert

  Scenario: Cautionary Alert information can be viewed by getting to it from Person page
    When I'm on the Cautionary Alert View page
    Then The page title should reflect the page's purpose & contain person's name
    And The cautionary alert table should show the correct information
