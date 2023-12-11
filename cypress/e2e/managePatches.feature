@common
@property
@managePatches

@ManagePatches
Feature: View and manage patch and area assignment
	I want to view and manage patch and area assignment

	Background:
		Given I am logged in

	Scenario: Navigate to manage patches from property, view details, return to property
		Given I seeded the database with an asset
		When I view the property in MMH
		And the property's patch details are displayed
		When I click on the manage patches button
		Then the manage patches page is displayed
		And the patches table is displayed
		When I click on the back link
		Then the property's patch details are displayed

	Scenario Outline: Filter patches and areas list by area
		When I visit the manage patches page directly
		And I can see a row for patch '<patch>'
		When I select '<area option>' from the area dropdown
		Then I can see a row for patch '<patch>'
		And I cannot see a row for patch '<notpatch>'
		Examples:
			| area option |  patch  |  notpatch  |
			|     All     |   SN1   |            |
			|   SN Area   |   SN1   |     SD1    |
	
	Scenario Outline: Reassign a patch
		When I visit the manage patches page directly
		And I reassign '<patchName>' to a new officer
		Then I can see a row for patch '<patchName>' with a name and email address
		And I can see a success message for patch reassignment
		Examples:
			|  patchName  |
			|   SN Area   |
			|   SN Area   |
