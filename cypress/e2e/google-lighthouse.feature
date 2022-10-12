@GoogleLighthouse

Feature: Google Lighthouse audit

    Background: Login
      Given I am logged in

    Scenario: Home page audit
      Then I perform a Lighthouse audit on the home page
      And have no detectable a11y violations
    
    Scenario: Search landing page audit
      Then I perform a Lighthouse audit on the search page
      And have no detectable a11y violations

    Scenario Outline: Search results page audit
      When I enter any of the following criteria "<characters>"
      And I click on the search button
      Then I perform a Lighthouse audit on the page
      And have no detectable a11y violations

      Examples:
        | characters |
        | James      |

    Scenario: Person page audit
      Then I perform a Lighthouse audit on the person page
      And have no detectable a11y violations

    Scenario: Person comment page audit
      Then I perform a Lighthouse audit on the person comment page 
      And have no detectable a11y violations

    Scenario: Tenure page audit
      Then I perform a Lighthouse audit on the tenure page
      And have no detectable a11y violations

    Scenario: Create person page audit
      Then I perform a Lighthouse audit on the create person page
      And have no detectable a11y violations

    Scenario: Contact details page audit
      Then I perform a Lighthouse audit on the contact details page
      And have no detectable a11y violations

    Scenario: Edit person page audit
      Then I perform a Lighthouse audit on the edit person page
      And have no detectable a11y violations

    Scenario: Activity history page audit
      Then I perform a Lighthouse audit on the activity history page
      And have no detectable a11y violations