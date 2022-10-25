Feature: As an internal Hackney User eg. HO, AHM
  AND any users who have access to the Worktray (post MVP)
  I want to log in to my work tray and see my upcoming tasks for my patch(es)
  So that I can see what work I need to be completed, and what work needs priority

  Background:
    Given I am logged in

  Scenario: AC1 - Login and View Worktray
    Given I am on the MMH home page
    Then I can see my worktray dashboard
    When I click on Filter by
    And I can see all the Processes
    And I can see all the Patches
    #And view all the jobs only within my patches under Process Status

  Scenario: AC2 - Worktray details
    Given I am on the MMH home page
    Then I can see my worktray dashboard
    And I can see the panel title
    And a Processes filter in a list with checkbox
    #And a Process status filter with a checkbox
    And there will be a select all link
    When I click on Select All link in Processes
    Then I can see Remove All link
    And an action button to apply my selected filters
    And an action button to clear my filter selections
    And days range of the items being displayed
    And by default day range is pre-selected as last 30 days
    And the number of items being displayed
    And by default number of items displayed is pre-selected as 10 items per page
    #And there will be pagination displayed
#    And I can see the Name or Address of the Tenant
#    And type of process
#    And Patch
#    And state of the process
#    And time remaining for a process
#    And process status


   Scenario: AC3 - Worktray filter display by default
     Given I am on the MMH home page
     Then I can see my worktray dashboard
        #ask Julia
    # And by default the status filter will select ALL statuses
    Then the default filter will be pre-selected to ALL available process
    #And pre-selected to ALL available status
    #And pre-selected to ONLY patches I am associated with

     #1 scenario failing
#   Scenario: AC4 - Filter by process
#     Given I am on the MMH home page
#     Then I can see my worktray dashboard
#     When I select the checkbox options within the process filter
#     And I click 'Apply filters' action button to apply my selected filters
#     Then I can see all the jobs refined within my selected parameters under that process listing displayed in order based on process status urgency
#     When I select 'Remove All' for Process
#     And I click 'Apply filters' action button to apply my selected filters
#     Then I can see all the jobs are displayed

   Scenario: AC5 - Filter by patch
     Given I am on the MMH home page
     Then I can see my worktray dashboard
#     When I select the checkbox options within the Patch filter
#     And I click 'Apply filters' action button to apply my selected filters
#     Then I can see all the jobs refined within my selected parameters under that Patch
#    # When I select 'Remove All' for Patches
#     And I click 'Apply filters' action button to apply my selected filters
#     Then I can see all the jobs are displayed
#    And is displayed in order based on process status urgency

#  New change after discussion. hiding status box
#  Scenario: AC6 - Filter by process status
#     Given I am on the MMH home page
#     Then I can see my worktray dashboard
#     When I select the checkbox options within the Process Status filter
#     And I click 'Apply filters' action button to apply my selected filters
#     Then I can see all the jobs refined within my selected parameters under that Process Status
#     When I select 'Remove All' for Process Status
#     And I click 'Apply filters' action button to apply my selected filters
#     Then I can see all the jobs are displayed
#    And is displayed in order based on process status urgency


   Scenario: AC7 - Process status addition info
     Given I am on the MMH home page
     Then I can see my worktray dashboard
     And the info icon is on display next to process status
     When I click on the information icon it will open up to show the additional status information


# create a ticket## 3439
   Scenario: AC8 - Select All / Remove All link within a filter listing for Processes
     Given I am on the MMH home page
     Then I can see my worktray dashboard
     #check with Julia
     When there is more than one listing option available within a filter
     Then it will display 'Select All' feature in a link
     When I click on it, it will select ALL items within that specific filter listing
     And the link will change to 'Remove All' in a link
     When I click on 'Remove All' it will deselect ALL items within that specific filter listing

  Scenario: AC9 - Clear selected Filters
     Given I am on the MMH home page
     Then I can see my worktray dashboard
     When I click on Filter by
     And I Select Process Sole to Joint and Change of Name
     #And I select one or more of the Patches
     #And I select oen or more of the Process Status
     And I select 'Clear filters'
     Then ALL the checkboxes within ALL filter listing will be removed
     And the existing listing display will REMAIN unchanged
     When I click the APPLY filter button
     Then the results will display NO results


  Scenario: AC10 - Selecting a process will take user to the current state of the application
   Given I am viewing my patch on worktray
   When I click on the process status button then I am taken to the current step in the process to continue the process

#
#  Scenario: AC11 - Sort by Name/Address
#   Given I am viewing my worktray
#   When I click on the ‘Name/Address’ hyperlink title
#   Then the cases will be sorted in alphabetical order based on the tenant's name and their corresponding address is displayed
#   And clicking twice will reverse the order
#  cy.contains('.ag-header-cell-label', 'Price').click()
#  // check ↑ is visible
#  cy.contains('.ag-header-cell-label', 'Price')
#  .find('[ref=eSortAsc]').should('be.visible')
#
#  Scenario: AC12 - Sort by State
#   Given I am viewing my worktray
#   When I click on the ‘State’ hyperlink title
#   Then the cases will be sorted chronologically
#   And clicking twice will reverse the order
#
#  Scenario: AC13 - Sort by Time
#   Given I am viewing my worktray
#   When I click on the ‘Time’ hyperlink title
#   Then the cases will be sorted in chronological order based on the urgency of the case
#   And clicking twice will reverse the order
#
#  Scenario: AC14 - Sort by Process State
#   Given I am viewing my work tray
#   When I click on the ‘Process state’ hyperlink title
#   Then the cases will be sorted in chronological order based on the urgency of the case
#   And clicking twice will reverse the order
#
  Scenario: AC15 - Verify Hyper-Links point to the right place
   Given I am viewing my work tray
   When I click tenant name then I am taken to the person page on a new tab
   When I click property address then I am taken to the property detail page on a new tab
   When I click the process name
   Then I see processes belonging to me in order of urgency of cases
#   When I click patch name
#   Then I see all property addresses in that patch sorted in order of urgency of cases
#   When I click next
#   Then I am taken to the next page of my work tray list


