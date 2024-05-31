Feature: As an internal Hackney User
    I want to be able to initiate a change of name process from the processes page,
    via the person page
    So that I can complete a legal change of name for a person

    # TODO - Refactor this whole file to seed the db with process in a certain state for each step
    Background:
        Given I am logged in

    # COMMENTED OUT THE FIRST 3 TESTS AS THEY CAUSE THE BROWSER IN CIRCLECI TO CRASH 
    # @SmokeTest
    # Scenario Outline: AC1 - CoN Process through 'Request Documents electronically' - APPROVE Application
    #     Given I seeded the database with a person with an active tenure
    #     Then I visit the 'Person details' page
    #     And I click on 'New Process' button
    #     And I select 'Changes to a tenancy' from the processes menu
    #     Then a further sub menu is expanded into view
    #     When I select 'Change of Name' to initiate the change of name process for the selected person
    #     Then 'Change of Name' page is displayed
    #     And Start Process button is disabled
    #     When I select the checkbox 'I have explained to the tenant'
    #     Then Start Process button is enabled
    #     When I select the button
    #     Then Change of Name edit page is displayed
    #     And Next button is disabled
    #     And Status Stepper is at "Tenant's new name"
    #     When I select Title and enter First and Last name
    #     And I click on Next button
    #     Then I am on the supporting documents page
    #     And Status Stepper is at "Request Documents"
    #     When I do not confirm the Tenant declaration checkbox and I click on Next button
    #     Then Tenant declaration validation message is displayed
    #     When I select Request Documents electronically and click on Next button
    #     Then 'Review Documents' page is displayed
    #     And Status Stepper is at "Review Documents"
    #     When I select only the first option to confirm I have seen all the documents
    #     And I click on Next button
    #     Then a validation error message is displayed
    #     When I select all the checkboxes to confirm I have seen all the documents
    #     And I click on Next button
    #     Then I am on the "Tenure Investigation" page
    #     And Status Stepper is at "Submit case"
    #     When I select Submit case button
    #     Then I am on the "Next Steps" page
    #     And Status Stepper is at "Finish"
    #     When I click on 'Continue' button
    #     Then I am on the Review Application page
    #     And Status Stepper is at "Review application"
    #     When I recommend the outcome as 'Approve'
    #     And I select 'I confirm that the tenure investigation has been completed'
    #     And I click on 'Confirm' button
    #     Then I am on the "Tenure investigator recommendation: Approve application" page
    #     When I select the option 'I have passed the case to the Area Housing Manager'
    #     And I select decision as 'Approve'
    #     And I confirm 'I confirm that this is an instruction received by the Area Housing Manager'
    #     And I click 'Confirm' button
    #     Then a validation error message for AHM "You must enter manager's name" is displayed
    #     When I enter Area Housing Manager name as 'Test Housing Manager'
    #     And I click 'Confirm' button
    #     Then I am on the HO and AHM approved page

    # @SmokeTest
    # Scenario Outline: AC2 - Tenure Investigator APPROVE the Application and HO or AHM DECLINE the Application
    #     Given I seeded the database with a person with an active tenure
    #     Then I visit the 'Person details' page
    #     And I click on 'New Process' button
    #     And I select 'Changes to a tenancy' from the processes menu
    #     Then a further sub menu is expanded into view
    #     When I select 'Change of Name' to initiate the change of name process for the selected person
    #     Then 'Change of Name' page is displayed
    #     And Start Process button is disabled
    #     When I select the checkbox 'I have explained to the tenant'
    #     Then Start Process button is enabled
    #     When I select the button
    #     Then Change of Name edit page is displayed
    #     And Next button is disabled
    #     And Status Stepper is at "Tenant's new name"
    #     When I select Title and enter First and Last name
    #     And I click on Next button
    #     Then I am on the supporting documents page
    #     And Status Stepper is at "Request Documents"
    #     When I select Request Documents electronically and click on Next button
    #     Then 'Review Documents' page is displayed
    #     And Status Stepper is at "Review Documents"
    #     When I select all the checkboxes to confirm I have seen all the documents
    #     And I click on Next button
    #     Then I am on the "Tenure Investigation" page
    #     And Status Stepper is at "Submit case"
    #     When I select Submit case button
    #     Then I am on the "Next Steps" page
    #     And Status Stepper is at "Finish"
    #     When I click on 'Continue' button
    #     Then I am on the Review Application page
    #     And Status Stepper is at "Review application"
    #     When I recommend the outcome as 'Decline'
    #     And I select 'I confirm that the tenure investigation has been completed'
    #     And I click on 'Confirm' button
    #     Then I am on the "Tenure investigator recommendation: Decline application" page
    #     When I select the option 'I have passed the case to the Area Housing Manager'
    #     And I select decision as 'Approve'
    #     And I confirm 'I confirm that this is an instruction received by the Area Housing Manager'
    #     When I enter Area Housing Manager name as 'Test Housing Manager'
    #     And I click 'Confirm' button
    #     Then a modal dialog box is displayed
    #     Then I am on the HO and AHM Declined page

    # Scenario Outline: AC3 - Field Validation error messages for Title, FirstName and LastName
    #     Given I seeded the database with a person with an active tenure
    #     Then I visit the 'Person details' page
    #     When I click on 'New Process' button
    #     And I select 'Changes to a tenancy' from the processes menu
    #     Then a further sub menu is expanded into view
    #     When I select 'Change of Name' to initiate the change of name process for the selected person
    #     Then 'Change of Name' page is displayed
    #     When I select the checkbox 'I have explained to the tenant'
    #     When I select the button
    #     Then Change of Name edit page is displayed
    #     When I enter Title only
    #     And I click on Next button
    #     Then a validation error message for 'First name' and 'Last name' are displayed
    #     When I enter 'Title' and 'First name' only
    #     And I click on Next button
    #     Then a validation error message for 'Last name' is displayed
    #     When I enter 'Title' and 'Last name' only
    #     And I click on Next button
    #     Then a validation error message for 'First name' is displayed
    #     When I enter 'First name' and 'Last name' only
    #     And I click on Next button
    #     Then a validation error message for 'Title' is displayed

    Scenario Outline: AC4 - CoN Process through 'Make an appointment to check supporting documents'
        Given I seeded the database with a person with an active tenure
        Then I visit the 'Person details' page
        And I click on 'New Process' button
        And I select 'Changes to a tenancy' from the processes menu
        Then a further sub menu is expanded into view
        When I select 'Change of Name' to initiate the change of name process for the selected person
        Then 'Change of Name' page is displayed
        And Start Process button is disabled
        When I select the checkbox 'I have explained to the tenant'
        Then Start Process button is enabled
        When I select the button
        Then Change of Name edit page is displayed
        And Next button is disabled
        And Status Stepper is at "Tenant's new name"
        When I select Title and enter First and Last name
        And I click on Next button
        Then I am on the supporting documents page
        And Status Stepper is at "Request Documents"
        When I select 'I have made an appointment to check supporting documents' and click on Next button
        Then 'Review Documents' page is displayed
        And 'Office appointment scheduled' message box is displayed

    Scenario Outline: AC5 - Close case at Review Documents stage
        Given I seeded the database with a person with an active tenure
        Then I visit the 'Person details' page
        And I click on 'New Process' button
        And I select 'Changes to a tenancy' from the processes menu
        Then a further sub menu is expanded into view
        When I select 'Change of Name' to initiate the change of name process for the selected person
        Then 'Change of Name' page is displayed
        And Start Process button is disabled
        When I select the checkbox 'I have explained to the tenant'
        Then Start Process button is enabled
        When I select the button
        Then Change of Name edit page is displayed
        And Next button is disabled
        And Status Stepper is at "Tenant's new name"
        When I select Title and enter First and Last name
        And I click on Next button
        Then I am on the supporting documents page
        And Status Stepper is at "Request Documents"
        When I select 'I have made an appointment to check supporting documents' and click on Next button
        Then 'Review Documents' page is displayed
        And 'Office appointment scheduled' message box is displayed
        When I click on Close Case button
        Then modal dialog is displayed with 'Reason for close case'
        When I enter the reason and I click on Close case button
        Then 'Review Documents' page is displayed with message 'Change of name application will be closed' and reason
        When I select checkbox to confirm outcome letter and I click on Confirm button
        Then "Thank you for your confirmation" message is displayed

    Scenario Outline: AC6 - Processes list page, people with inactive tenures
        Given I seeded the database with an asset with a previous tenure
        Then I visit the 'Person details' page
        And I click on 'New Process' button
        Then I am on the Processes list page
        And I am not able to see the Change Of Name process listed

    Scenario Outline: AC7 - Update Contact Details in Request Documents Page
        Given I seeded the database with a person with an active tenure
        Then I visit the 'Person details' page
        And I click on 'New Process' button
        And I select 'Changes to a tenancy' from the processes menu
        Then a further sub menu is expanded into view
        When I select 'Change of Name' to initiate the change of name process for the selected person
        Then 'Change of Name' page is displayed
        When I select the checkbox 'I have explained to the tenant'
        When I select the button
        Then Change of Name edit page is displayed
        And Status Stepper is at "Tenant's new name"
        When I select Title and enter First and Last name
        And I click on Next button
        Then I am on the supporting documents page
        And Status Stepper is at "Request Documents"
        When I click on the link 'the contact details'
        Then "Update contact details" modal dialog is displayed
        When I enter data email address and phone number
        Then I am on the supporting documents page
        And the details email address and phone number are displayed
        When I click on the link 'the contact details'
        And I click on Remove email address and Remove phone number
        Then I am on the supporting documents page

    Scenario Outline: AC8 - Error Validation in Update Contact Details Modal Dialog
        Given I seeded the database with a person with an active tenure
        Then I visit the 'Person details' page
        And I click on 'New Process' button
        And I select 'Changes to a tenancy' from the processes menu
        Then a further sub menu is expanded into view
        When I select 'Change of Name' to initiate the change of name process for the selected person
        Then 'Change of Name' page is displayed
        When I select the checkbox 'I have explained to the tenant'
        When I select the button
        Then Change of Name edit page is displayed
        And Status Stepper is at "Tenant's new name"
        When I select Title and enter First and Last name
        And I click on Next button
        Then I am on the supporting documents page
        And Status Stepper is at "Request Documents"
        When I click on the link 'the contact details'
        Then "Update contact details" modal dialog is displayed
        When I click on Save email address without entering any data
        Then Validation error message is displayed for email address
        When I click on Save Phone number without entering any data
        Then Validation error message is displayed for phone number