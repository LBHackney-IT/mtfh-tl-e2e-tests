@authentication
@common
@processes
@property
@root

Feature: Related assets
    Related assets

    Background:
        Given I am logged in

    @SmokeTest
    Scenario Outline: 'Asset has less than 3 children and the link to "Related asset page" is not displayed'
        Given I seeded the database with an asset
        And The asset has less than than 3 related children assets
        When I view the property in MMH
        Then I should not see the link to the 'Related asset page' as there are not enough children asset

    @SmokeTest
    Scenario Outline: 'Asset has more than 3 children and the link to "Related asset page" is displayed'
        Given I seeded the database with an asset
        And The asset has more than than 3 related children assets
        When I view the property in MMH
        Then I should see the link to the 'Related asset page'

    @SmokeTest
    Scenario Outline: 'When visiting the "Related asset page", related assets are displayed (parent and children)'
        Given I seeded the database with an asset
        And The asset has more than than 3 related children assets
        When I visit the 'Related asset page' for the asset
        Then I should see the main heading, the current property, its asset type and the related assets

    @SmokeTest
    Scenario Outline: 'When visiting the "Related asset page", for an asset with no related assets, a message is displayed to inform the user no related assets are available'
        Given I seeded the database with an asset without any parent asset information
        And The asset has no related children assets
        When I visit the 'Related asset page' for the asset
        Then I should see a message that says no related assets are available

    @SmokeTest
    Scenario Outline: 'When visiting the "Related asset page", when the request fails to retrieve children assets, an error is displayed'
        Given I seeded the database with an asset
        And The request to retrieve related children assets fails
        When I visit the 'Related asset page' for the asset
        Then I should see an error on the screen saying related children assets could not be retrieved

    @SmokeTest
    Scenario Outline: 'When visiting the "Related asset page", when the request fails to retrieve the asset, an error is displayed'
        Given I seeded the database with an asset
        And The request to retrieve the asset fails
        When I visit the 'Related asset page' for the asset
        Then I should see an error on the screen saying the asset could not be retrieved