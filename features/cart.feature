Feature: Adding products to the cart
  As a shopper on Toolshop
  I want to choose how many of a product to add to my cart
  So that I can buy the right amount

  Background:
    Given I am on the Toolshop home page
    And my cart is empty
    And the Claw Hammer is in stock

  Scenario: Adding 3 of a product to the cart
    When I open the Claw Hammer product page
    And I change the quantity to 3
    And I add it to my cart
    Then the cart icon shows 3 items
    And my cart shows the Claw Hammer with quantity 3

  Scenario: Adding the minimum quantity of 1
    When I open the Claw Hammer product page
    And I leave the quantity at 1
    And I add it to my cart
    Then the cart icon shows 1 item
    And my cart shows the Claw Hammer with quantity 1

  Scenario: A quantity of 0 can't be added
    When I open the Claw Hammer product page
    And I change the quantity to 0
    And I add it to my cart
    Then the Claw Hammer is not added to my cart
    And my cart is still empty
