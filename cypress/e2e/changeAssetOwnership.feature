@property
@authentication
@common
@root
@search

Feature: Property Add
    Change asset ownership

    Background:
        Given I am logged in

    # TODO: Merge top two tests into one
    @SmokeTest
    Scenario Outline: 'A user can access the "Edit asset ownership" form in the main asset view in MMH'
        Given I seeded the database with an asset
        When I view the property in MMH
        Then I see a section about the asset ownership
        And I can access the form to change the ownership of the asset by clicking on the button
        And I am taken to the 'Edit asset ownership' form

    @SmokeTest
    Scenario Outline: 'Edit asset ownership form page elements are present'
        Given I seeded the database with an asset
        And I am on the MMH 'Edit asset ownership' page for the asset
        Then I can see two radio options to change the ownership of the asset
        And I can see the 'Confirm change' and 'Back to asset' buttons

    Scenario Outline: 'Edit asset ownership form - Ownership change successful'
        Given I seeded the database with an asset
        And I am on the MMH 'Edit asset ownership' page for the asset
        Then I see one of the radio buttons is already checked, to display the current asset ownership
        Given I have not made a change yet, I should be unable to submit the form as the button is disabled
        Then I change the ownership of the asset
        And I see that the submit button is now enabled and the 'Edit asset ownership' can be submitted
        Then I submit the 'Edit asset ownership' form
        And I see a success message to confirm the asset ownership has been edited

    Scenario Outline: 'Edit asset ownership form - Ownership change failure'
        Given I seeded the database with an asset
        And I am on the MMH 'Edit asset ownership' page for the asset
        Then I see one of the radio buttons is already checked, to display the current asset ownership
        Given I have not made a change yet, I should be unable to submit the form as the button is disabled
        Then I change the ownership of the asset
        And I see that the submit button is now enabled and the 'Edit asset ownership' can be submitted
        Then I submit the 'Edit asset ownership' form, but an error occurs
        And I see an error message to confirm the asset ownership has NOT been edited
