@common
@property
@managePatches

@ManagePatches
Feature: View and manage patch and area assignment
	I want to view and manage patch and area assignment

	Background:
		Given I am logged in

	Scenario Outline: Navigate to manage patches from property and view details
		Given I seeded the database with an asset
		When I view the property in MMH
		And the property's patch details are displayed
		When I click on the manage patches button
		Then the manage patches page is displayed
		And the patches table is displayed

	Scenario Outline: Filter patches and areas list by area
		When I visit the manage patches page directly
		And I can see a row for patch '<patch>'
		When I select '<area option>' from the area dropdown
		Then I can see a row for patch '<patch>'

		Examples:
			| area option |  patch  |
			|     All     |   SN1   |
			|   SN Area   |   SN1   |
			|   SD Area   |   SD1   |
	
	Scenario Outline: Switch patch assignments
		When I visit the manage patches page directly
		And I switch '<patch1>' with '<patch2>'
		Then the modal warns me I am reassigning '<patch1>' to '<patch2>'
		And I click the confirm button on the modal
		Then I can see a success message for patch reassignment

		Examples:
			|  patch1   |  patch2   |
			|  SN Area  |  SH Area  |
			|  SH Area  |  SN Area  |