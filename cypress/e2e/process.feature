# @authentication
# @common
# @processes
# @root

# Feature: Processes menu for easier navigation
# I want to be able to link directly from any of the 3 Manage My Home entity pages (tenure/person/property) into the google form I use to record information
# So that I can easily record information without the need to keep multiple screens open

# Background:
#   Given I am logged in
#   And I seeded the database

# #  commented the below as its failing in Dev - record not found in Dev
# #@Positive
# #Scenario Outline: Display process options for person
# #    Given I have loaded a Person record "<record>"
# #    When I select New Process menu "<processType>"
# #    Then I am directed to the main process landing page
# #    And I can see a list of processes
# #
# #        Examples:
# #        | processType  | record                                 |
# #        | person       | da05aabb-3757-43c8-3028-c9ecbe72a067   |


#   #commented this as the record is not found in staging
# #@Positive
# #Scenario Outline: Display process options for property
# #    Given I view a property "<record>"
# #    When I select New Process menu "<processType>"
# #    Then I am directed to the main process landing page
# #    And I can see a list of processes
# #
# #        Examples:
# #        | processType  | record                                 |
# #        | property     | f85e4390-9256-e4dc-0443-2e510b362cac   |

# #@Positive
# #Scenario Outline: Initiate sole to joint process from tenure
# #  When I view a tenure "<tenure>"
# #  Then the tenure information is displayed
# #  When I select New Process menu "<processType>"
# #  Then I am directed to the main process landing page
# #  And I can see a list of processes
# #  When I select a process "<process>"
# #  # The below line has been commented becoz it needs user authentication to go to the google form
# #  #### Delete this line -> And I select a sub process "<subProcess>"
# #  #TO DO -> google form opens and need authorization
# #  # Then I am on the google form Tenancy Change and can see the data "<yourName>" "<propertyAddress>" "<propertyRef>" "<tenancyReference>"
# #  Examples:
# #  | tenure                               | processType | process               | subProcess                          |  yourName            | propertyAddress       |propertyRef|tenancyReference|
# #  | e832a76f-8bcf-238c-7ad1-6ef1b408b316 | tenure      | Other tenancy changes | Sole tenant requests a joint tenure |FAKE_Julie FAKE_Davies|34A Craven Walk N16 6BU|00046299   |FN00046299      |

# # Refactor for stateless tests is WIP. Will update this test once refactoring is completed.
# # @Positive
# # Scenario Outline: Display process options for tenure

# Scenario Outline: Process landing page loaded
#   Given I select to initiate a Sole To Joint process
#   Then the property details are shown
#   Then the start process button is disabled
#   When I accept the terms and conditions
#   And I click the start process button
#   Then the status is set to Awaiting proposed tenant selection
#   Then Sole tenant requests a joint tenure page is displayed
#   When I select a person to add as a joint tenant "<tenant>"
#   And I click the next button
#   Then I can see the text "<tenant>" adding "<proposedTenant>" in the header section
#   Then Eligibility checks passed page is displayed
#   And I can see Further eligibility questions

#   Examples:
#     | tenant           | proposedTenant   |
#     | Add API E2E Test | Add API E2E Test |

#   Scenario: Selecting back or cancelling out of the process
#   Given I select to initiate a Sole To Joint process
#   When I click the cancel process button
#   Then I am taken back to the processes menu
#   Given I select to initiate a Sole To Joint process
#   When I click the back link
#   Then I am taken back to the processes menu

# Scenario Outline: Verify Automatic checks fail and Close Case Process is initiated
#   Given I select to initiate a Sole To Joint process
#   When I accept the terms and conditions
#   And I click the start process button
#   Then Sole tenant requests a joint tenure page is displayed
#   When I select a person to add as a joint tenant "<tenant>"
#   And I click the next button
#   Then Automatic Eligibility checks Failed page is displayed
#   When I select the checkbox 'I confirm that an outcome letter has been sent to the resident'
#   And I click on the confirm button
#   Then 'Thank you for your confirmation' message is displayed with a link to Return to Home page

#   Examples:
#     | tenant               |
#     | FAKE_Katy FAKE_Turne |

# Scenario Outline: Verify Automatic checks Pass and Manual Checks Fail and Close case process is initiated
#   Given I select to initiate a Sole To Joint process
#   When I accept the terms and conditions
#   And I click the start process button
#   Then Sole tenant requests a joint tenure page is displayed
#   When I select a person to add as a joint tenant "<tenant>"
#   And I click the next button
#   Then I can see the text "<tenant>" adding "<proposedTenant>" in the header section
#   And Eligibility checks passed page is displayed
#   And I can see Further eligibility questions
#   When I select the answers for these questions
#   And I click the next button
#   Then the page is displayed with the text 'Passed automatic eligibility checks' and 'Not eligible for a sole to joint tenure'
#   When I select the checkbox 'I confirm that an outcome letter has been sent to the resident'
#   And I click on the confirm button
#   Then 'Thank you for your confirmation' message is displayed with a link to Return to Home page

#   Examples:
#     | tenant           | proposedTenant   |
#     | Add API E2E Test | Add API E2E Test |
