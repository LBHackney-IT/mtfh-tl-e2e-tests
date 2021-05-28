@GoogleLightHouse
Feature: Google Lighthouse audit

    Background: Login
      Given I am logged in

    Scenario: Home page audit
      Then I perform a Lighthouse audit on the home page
    
    Scenario: Search page audit
      Then I perform a Lighthouse audit on the search page

    Scenario: Person page audit
      Then I perform a Lighthouse audit on the person page

    Scenario: Person page audit
      Then I perform a Lighthouse audit on the person comment page  