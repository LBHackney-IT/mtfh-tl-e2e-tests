@authentication
@common
@processes
@root
@tenure

Feature: View repairs
    As an Internal Hackney user (such as a Housing Officer or Area housing Manager)
    I want to be able to view all active repairs on a property
    So that I have a complete record of what repairs and adaptations are being worked on for that property

    Background:
    Given I am logged in


    @SmokeTest
    Scenario Outline: View property details
        When I view a property "<property>"
        Then I can see a list of repairs against that property

        Examples:
            | property                             |
            | f3c1ff42-d81e-6207-48c3-e0e8854b3b98 |