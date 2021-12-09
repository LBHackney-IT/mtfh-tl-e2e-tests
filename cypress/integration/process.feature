@authentication
@common
@processes
@root

Feature: Processes menu for easier navigation
I want to be able to link directly from any of the 3 Manage My Home entity pages (tenure/person/property) into the google form I use to record information
So that I can easily record information without the need to keep multiple screens open

Background:
    Given I am logged in

@Positive
Scenario Outline: Display process options for person
    Given I have loaded a Person record "<record>"
    When I select New Process menu "<processType>"
    Then I am directed to the main process landing page
    And I can see a list of processes

        Examples:
        | processType  | record                                 |
        | person       | da05aabb-3757-43c8-3028-c9ecbe72a067   |

@Positive
Scenario Outline: Display process options for property
    Given I view a property "<record>"
    When I select New Process menu "<processType>"
    Then I am directed to the main process landing page
    And I can see a list of processes

        Examples:
        | processType  | record                                 |
        | property     | f85e4390-9256-e4dc-0443-2e510b362cac   |

@Positive
Scenario Outline: Initiate sole to joint process from tenure
    When I view a Tenure "<tenure>"
    Then the tenure information is displayed
    When I select New Process menu "<processType>"
    Then I am directed to the main process landing page
    And I can see a list of processes
    And I select a process "<process>"
    And I select a sub process "<subProcess>"
    

        Examples:
        | tenure                               | processType | process              | subProcess                          |
        | e832a76f-8bcf-238c-7ad1-6ef1b408b316 | tenure      | Changes to a tenancy | Sole tenant requests a joint tenure |

# Refactor for stateless tests is WIP. Will update this test once refactoring is completed.
# @Positive
# Scenario Outline: Display process options for tenure

Scenario Outline: Process landing page loaded
    Given I select to initiate a Sole To Joint process "<tenure>"
    Then the property details are shown

        Examples:
        | tenure                               |
        | 0d4f614c-32a7-e12b-f652-ceac6677a229 |

Scenario Outline: Tenant has consented to a credit check
    Given I select to initiate a Sole To Joint process "<tenure>"
    When I accept the terms and conditions
    And I click the start process button
    Then the status is set to Awaiting proposed tenant selection

        Examples:
        | tenure                               |
        | 0d4f614c-32a7-e12b-f652-ceac6677a229 |

Scenario Outline: Tenant has not consented to a credit check
    Given I select to initiate a Sole To Joint process "<tenure>"
    Then the start process button is disabled

        Examples:
        | tenure                               |
        | 0d4f614c-32a7-e12b-f652-ceac6677a229 |

Scenario Outline: Selecting back or cancelling out of the process
    Given I select to initiate a Sole To Joint process "<tenure>"
    When I click the cancel button
    Then I am taken back to the processes menu "<tenure>"
    Given I select to initiate a Sole To Joint process "<tenure>"
     When I click the back link
    Then I am taken back to the processes menu "<tenure>"

        Examples:
        | tenure                               |
        | 0d4f614c-32a7-e12b-f652-ceac6677a229 |