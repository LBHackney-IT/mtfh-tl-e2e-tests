@Navigation
Feature: Navigation
    Page Navigation

    Background: Navigate to the search page
      Given I am logged in
      Given I navigate to the search landing page
      Then I am on the search landing page

  Scenario: Return to search page after viewing a person
    When I enter a search term and click search
    Then I click on a search result
    And I click the back button
    Then I am returned to the search results page

  Scenario: Return to person page after adding a comment
    When I enter a search term and click search
    Then I click on a search result
    And I click add new comment
    And I click the back button
    Then I am returned to the person page

  Scenario: Return to search page outside of user flow
    When I navigate to a person
    And I click the back button
    Then I am on the search landing page

  @Accessibility
  Scenario: Accessibility Testing
    And have no detectable a11y violations