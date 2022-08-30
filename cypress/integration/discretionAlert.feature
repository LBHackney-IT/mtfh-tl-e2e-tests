Feature: As an internal Hackney user (eg. Housing Officer)
         I want to see if a person, property or tenure has a cautionary alert against them
         So that I can act with caution when interacting with residents at a property

  Background:
    Given I am logged in

  @SmokeTest
  Scenario Outline: AC1 - Viewing Discretion alert details on a persons page
    Given A person "<person>" has a discretion alert assigned to them
    When I view the persons profile page
    Then I will be able to view a RED bell next to "Discretion alert"
    When I click on the accordion element
    Then discretion type "<alertType>" and the description "<alertDescription>" are displayed
  Examples:
    | person                               | alertType    | alertDescription   |
    | 8d027289-0f0e-56a2-6473-980544f46b29 | Verbal Abuse | Tenant was abusive |

    # commented the below as its failing in Dev - record not found in Dev
#  @SmokeTest
#  Scenario Outline: AC2 - Viewing Discretion alert details on a property page
#    Given A property "<property>" has a person with a discretion alert assigned to them
#    When I view a property profile page
#    Then I will be able to view a RED bell next to "Discretion alert"
#    When I click on the accordion element
#    Then discretion type "<alertType>" and the description "<alertDescription>" are displayed
#  Examples:
#      | property                             | alertType          | alertDescription                                                                                                                                                                                                                                                                                 |
#      | 81385307-ddd2-9699-599c-6aaa94f6f4b7 | Do not visit alone | No Lone Visits - Tenant has violent tendencies - Tenant is care in the community. 2 or 3 Operatives should attend jointly at all times, no works are to commence until Glen Wallker (Risk & Compliance Officer) confirms floor adhesive is free of asbestos and threat level is no longer there. |

  @SmokeTest
  Scenario Outline: AC3 - Viewing Discretion alert details on a tenure page
    Given A tenure "<tenure>" has a person "<person>" with a discretion alert assigned to them
    When I view a tenure profile page
    Then I will be able to see the RED caution bell next to the property name
    And I will be able to see the RED discretion alert next to the person name
    Examples:
      | tenure                               | person                               |
      | ae46a00e-ed68-cc9f-b091-85c452c55a03 | 8d027289-0f0e-56a2-6473-980544f46b29 |