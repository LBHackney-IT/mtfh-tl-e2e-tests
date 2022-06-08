Feature: As an internal Hackney user
         I want to request relevant supporting documents from both Sole to Joint applicants (the existing tenant and the new tenant)
         So that I can evidence that the applicant is eligible


  Background:
    Given I am logged in

@ignore
#  Scenario Outline: AC1. View request for documents page
#    Given the application has passed eligibility and the housing officer breach of tenancy checks for the tenure "<tenure>"
#    When I click the Next button
#    Then Request Documents page is displayed with success message for "Eligibility checks passed"
#    And "Supporting documents" text is displayed
#    # bug 2914 raised for the typo
#    #And "Checking supporting documents" text and Resident's contact details are displayed for the "<tenant>"
#    And "Checking suporting documents" text and Resident's contact details are displayed for the "<tenant>"
#    And a radio button to automatically request the documents on DES is displayed
#    And a radio button to make an appointment to review the Supporting documents is displayed
#    Examples:
#      | tenure                               | tenant                    | proposedTenant            |
#      | 4b50a9db-b2b8-91a4-1ab5-391277577537 | FAKE_Hannah FAKE_Turner | FAKE_Trevor FAKE_Townsend |

#  Scenario Outline: AC 1.1 Link to current tenant’s person page
#    Given I am on the Request Documents page
#    When I click on the current tenant’s name in the heading
#    Then I am taken to the current tenant’s person page, which will be opened in a new tab ( check with Julian)
#    Examples:
#      | tenure                               | tenant                 | proposedTenant         |
#      | 1f76a9f4-8ece-3b6f-4fb7-7fcf30a619e4 | FAKE_Claire FAKE_Blake | FAKE_Claire FAKE_Blake |
#
#  Scenario: AC1.2 User has not put in any input
#    Given I am on the Request Documents page
#    When I have not selected any of the radio button options
#    Then the option to proceed to the next step is disabled
#
#  Scenario: AC2.1 Confirm request of documents electronically via DES
#    Given I have selected electronically requesting the documents via DES
#    And I have proceeded to the next step
#  #And the case is marked as "Awaiting supporting documents through DES"
#  #And a case activity log is created
#
#  Scenario: AC3. Request documents via office appointment
#    Given I select that I have made an appointment to check supporting documents
#    When I input the appointment date and time
#    Then the option to proceed is enabled
#    And I am able to proceed to "Review Documents"
#  #And the case remains as “Awaiting supporting documents appointment”, but the state changes
#  #And a case activity log is created
#
#  Scenario: AC4. Progress indicator
#    Given I am on this step of the process
#    Then I will see an indicator of where I am in the process of Request Documents

 #######  The below buttons functionality has not been developed yet
#  Scenario: AC5. Buttons under the progress indicator
#    Given I am completing a Sole to Joint process
#    Then underneath the progress indicator I will see a number of buttons 'Reassign Case' 'Cancel Process' 'Case Activity History'









