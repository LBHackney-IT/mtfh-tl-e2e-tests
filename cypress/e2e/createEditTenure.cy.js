import CreateTenurePageObjects from "../pageObjects/createTenurePage";
import { seedDatabase } from "../helpers/DbHelpers";


const createTenurePage = new CreateTenurePageObjects();
const tags = ['@tenure', '@authentication', '@common', '@root', '@search', '@worktray', '@personal-details']

describe('create and edit tenure', {'tags': tags}, ()=>{
    beforeEach(() => {
        cy.login();
        seedDatabase();
    });

    it('should create a new tenure', ()=> {

    })
})
