@Search
Feature: T&L Search Function
    I want to search for a keyword

  Background:
    Given I am on the search page

  Scenario: Search for a keyword
    When I enter a search term
    And I click on the search button
    Then it performs a search

  Scenario: Search for a list of keywords
    When When I enter a list of search terms
    | searchTerm |
    | abc        |
    | 123        |
    And I click on the search button


