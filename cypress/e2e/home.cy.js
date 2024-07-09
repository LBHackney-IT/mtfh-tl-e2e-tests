import HomePageObjects from "../pageObjects/homePage";
import FooterPageObjects from "../pageObjects/sharedComponents/footer"; 
import HeaderPageObjects from "../pageObjects/sharedComponents/header";

const homePage = new HomePageObjects();
const footer = new FooterPageObjects();
const header = new HeaderPageObjects();

const tags = ['@header', '@authentication', '@common', '@root', '@Production' ]
const devices = ['ipad-2', 'ipad-mini', 'iphone-3', 'iphone-4', 'iphone-5', 'iphone-6', 'iphone-6+', 'iphone-7', 'iphone-8', 'iphone-xr', 'iphone-se2', 'macbook-11', 'macbook-13', 'macbook-15', 'macbook-16', 'samsung-note9', 'samsung-s10']


describe('MMH Home page', {tags: tags}, ()=> {
        
   
    it('should show header and footer logout', ()=> {
        homePage.visit()
        homePage.iAmOnTheHomePage()
       
        homePage.signInButton().should('be.visible')
        header.headerIsDisplayed();
        footer.footerIsDisplayed();
        footer.footerLinksAreDisplayed();
        footer.footerLinksAreCorrect();
    })

    it('should show header and footer login', ()=> {
        cy.login();
        window.localStorage.setItem(
            "features",
            JSON.stringify(Cypress.config("featureToggles"))
        );
        homePage.visit()
        homePage.iAmOnTheHomePage()
        homePage.headerLinks().contains('Welcome')
        header.headerIsDisplayed();
        footer.footerIsDisplayed();
        footer.footerLinksAreDisplayed();
        footer.footerLinksAreCorrect();

    })

    it('Accessibility Testing', ()=> {
        cy.login();
        window.localStorage.setItem(
            "features",
            JSON.stringify(Cypress.config("featureToggles"))
        );
        homePage.visit()
        homePage.iAmOnTheHomePage()

        cy.checkA11y(null, null, axeTerminalLog, { skipFailures: true });

        function axeTerminalLog(violations) {
            cy.task(
            "log",
            `${violations.length} accessibility violation${
                violations.length === 1 ? "" : "s"
            } ${violations.length === 1 ? "was" : "were"} detected`
            );

            const violationData = violations.map(
            ({ id, impact, description, nodes }) => ({
                id,
                impact,
                description,
                nodes: nodes.length,
            })
            );
            cy.task("table", violationData);
        }
    })

    devices.forEach((device)=> {
        it('should work on all device', ()=> {
            cy.login();
            window.localStorage.setItem(
                "features",
                JSON.stringify(Cypress.config("featureToggles"))
            );

            cy.viewport(`${device}`);
            homePage.visit()
            homePage.iAmOnTheHomePage()
            homePage.headerLinks().contains('Welcome')
            header.headerIsDisplayed();
            footer.footerIsDisplayed();
            footer.footerLinksAreDisplayed();
            footer.footerLinksAreCorrect();
        }) 
    })
})