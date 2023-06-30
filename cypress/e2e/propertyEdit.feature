@authentication
@common
@processes
@property
@root

Feature: Property Edit
    Edit property address

    Background:
        Given I am logged in

    @SmokeTest
    Scenario Outline: 'Edit address details button is disabled if the property has no valid UPRN'
        Given I seeded the database with an asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571", and with no valid UPRN
        When I view the asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571", in MMH
        Given that the property has no valid UPRN, I can see a disabled button that says 'Cannot edit: UPRN missing'

    @SmokeTest
    Scenario Outline: 'Edit address details button is enabled if the property has a valid UPRN'
        Given I seeded the database with an asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571", and with a valid UPRN
        When I view the asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571", in MMH
        Given that the property has a valid UPRN, I can see a button that says 'Edit address details'

    @SmokeTest
    Scenario Outline: 'Edit property address page elements are present'
        Given I seeded the database with an asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571", and with a valid UPRN
        Given I am on the MMH 'Edit property address' page, for asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571"
        Then I should see the heading 'Edit property address', and property details for the 'Suggestion from the Local Gazetteer' and the 'Current address'
        And the 'Update to this address' and 'Cancel' buttons are present, along with a 'Back to asset' link at the top

    @SmokeTest
    Scenario Outline: 'Edit property address - patch address is successful'
        Given I seeded the database with an asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571", and with a valid UPRN
        Given I am on the MMH 'Edit property address' page, for asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571"
        And I edit the address line 1 of the address
        Then I click on 'Update to this address' button, and the PATCH requests are successful for asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571"
        And I can see the address line 1 of the 'Current address' has changed successfully
        And I can see a success message at the top of the screen
        And the 'Update to this address' and 'Cancel' buttons should be replaced by the 'Back to asset view' button

    @SmokeTest
    Scenario Outline: 'Edit property address - patch address is not successful'
        Given I seeded the database with an asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571", and with a valid UPRN
        Given I am on the MMH 'Edit property address' page, for asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571"
        And I edit the address line 1 of the address
        Then I click on 'Update to this address' button, and the PATCH requests fail for asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571"
        And I should see and error indicating that the request failed

    @SmokeTest
    Scenario Outline: 'Edit property address - LLPG address fails to be retrieved'
        Given I seeded the database with an asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571", and with a valid UPRN
        Given I am on the MMH 'Edit property address' page, for asset with GUID "a865b43a-7dc7-496b-8965-5d5064983571", but the LLPG address fails to be retrieved
        Then I should see an error message indicating that the LLPG address could not be loaded
        And I should see a heading that says 'New address details' instead of 'Suggestion from the Local Gazetteer'
        And the address fields, despite not being autopopulated, should be blank and editable
        And the 'Update to this address' button should be enabled