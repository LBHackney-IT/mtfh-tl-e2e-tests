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
    And I fill in a valid 'end date' for the alert
    And I click the 'confirm' button
    Then I get redirected to back to the person page
    And The cautionary alert should not be listed under the person anymore

  Scenario: End date input shows the validation error when the entered date is not valid
    When I'm on the Cautionary Alert View page
    And I click on the 'end alert' button
    And I fill in an 'end date' for the alert that is not allowed
    Then The 'end date' input error message gets displayed on the screen
    And The 'confirm' button gets locked out

  Scenario: End date input hides the validation error when the entered date is corrected
    When I'm on the Cautionary Alert View page
    And I click on the 'end alert' button
    And I fill in an 'end date' for the alert that is not allowed
    And I fill in a valid 'end date' for the alert
    Then The 'end date' input error message is NOT displayed on the screen
    And The 'confirm' button gets unlocked

  Scenario: When an 'End Alert' form submission fails, a Page Error is displayed
    And Given an impending 'End Alert' endpoint failure
    When I'm on the Cautionary Alert View page
    And I click on the 'end alert' button
    And I fill in a valid 'end date' for the alert
    And I click the 'confirm' button
    Then The page error is displayed notifying the user about request failure
    And User should stay on the manage cautionary alert page
