@property
@authentication
@common
@root
@search

Feature: Property Add
    New property

    Background:
        Given I am logged in

    # TODO: Combine smoke tests into one scenario
    @SmokeTest
    Scenario Outline: 'New property - Page headings/sections and form action buttons are present'
        Given I am on the MMH 'New property' page
        Then I should see the main heading 'New Property', and the user disclaimer along with the other secondary headings: Address, Property management, Asset details
        And the 'Create new property' and 'Cancel' buttons are present, along with a 'Back' link at the top

    Scenario Outline: 'New property - Errors are shown for the "required" fields, when the form is submitted without these'
        Given I am on the MMH 'New property' page
        And I press the 'Create new property' button without editing any of the fields
        Then errors for the required form fields should be visible

    @SmokeTest
    Scenario Outline: 'New property - Managing organisation field is populated with the default option of 'London Borough of Hackney'
        Given I am on the MMH 'New property' page
        Then I should see the 'Managing organisation' field populated with the default option of 'London Borough of Hackney'

    @SmokeTest
    Scenario Outline: 'New property - when the required fields are populated, and the POST request is successful, a success message is displayed'
        Given I am on the MMH 'New property' page
        And I enter a value for field 'Property Reference'
        And I select an option for field 'Asset Type'
        And I select a parent asset
        And I enter a value for field 'Address line 1'
        And I enter a valid value for field 'Postcode'
        And I choose the option 'Yes' for field 'Is LBH property?'
        And I choose the option 'Yes' for field 'Add Default SOR Contracts'
        When I click on 'Create new property' button, and the POST request is successful
        And I see a success message, indicating that the asset has been created successfully
        Then I should be able to view new property in MMH

    Scenario Outline: 'New property - when the required fields are populated, and the POST request fails, an error message is displayed'
        Given I am on the MMH 'New property' page
        And I enter a value for field 'Property Reference'
        And I select an option for field 'Asset Type'
        And I select a parent asset
        And I enter a value for field 'Address line 1'
        And I enter a valid value for field 'Postcode'
        And I choose the option 'Yes' for field 'Is LBH property?'
        And I choose the option 'Yes' for field 'Add Default SOR Contracts'
        When I click on 'Create new property' button, and the POST request fails
        Then I see an error message, indicating that there was a problem creating the new asset

    @SmokeTest
    Scenario Outline: 'New property - a user is able to add, remove, edit Patch information for the new asset'
        Given I am on the MMH 'New property' page
        And I find the Patch field heading
        And I see one Patch dropdown field available to start with and I select a value
        When I remove the Patch dropdown field, using the 'Remove patch' as no longer required, I should see a total of 0 Patch dropdown field