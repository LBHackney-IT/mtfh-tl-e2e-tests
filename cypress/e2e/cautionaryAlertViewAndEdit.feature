Feature: Create Cautionary Alerts

  Background:
    Given I am logged in
    And There's a person with a cautionary alert

  Scenario: Cautionary Alert information can be viewed by getting to it from Person page
    When I'm on the person's with cautionary alert page
    And I navigate to that person's cautionary alert's page
    Then The page title should reflect the page's purpose & contain person's name
    And The cautionary alert table should show the correct information

  Scenario: Cautionary Alert 'back' button switches to Person page
    When I'm on the Cautionary Alert View page
    And I click on the 'back' button
    Then I get redirected to back to the person page
    And I should see the cautionary alert I navigated from

  Scenario: Cautionary Alert 'close' button switches to Person page
    When I'm on the Cautionary Alert View page
    And I click on the 'close' button
    Then I get redirected to back to the person page
    And I should see the cautionary alert I navigated from

  Scenario: Cautionary Alert 'end alert' button reveals extra alert editing options and UI changes
    When I'm on the Cautionary Alert View page
    And I click on the 'end alert' button
    Then The 'end date' input should become visible
    And The 'end alert' button gets replaced with 'confirm' button

  Scenario: Cautionary Alert can be ended with specified 'end date'
    When I'm on the person's with cautionary alert page
    And I navigate to that person's cautionary alert's page
    And I click on the 'end alert' button
    And I select the 'end date' for the alert
    And I click the 'confirm' button
    Then I get redirected to back to the person page
    And The cautionary alert should not be listed under the person anymore
