describe('Feedback Loop login flows', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('Should be able to visit http://localhost:3000 and see a page with movies displayed', () => {
    cy.get('.nav-bar').contains('Rancid Tomatillos')
    cy.get('.movie-container').should('be.visible')
    cy.url().should('include', '/')
  });

  it('Should display an error message if the movies do not load correctly', () => {
    cy.intercept(
      'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
    {
      statusCode: 500
    })
    cy.visit('http://localhost:3000/')
      .contains('.error', 'Movies failed to load. Please try again later!')
  })

  it('Should perform a successful GET request for all movies upon page load', () => {
   cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies/',
   {
     statusCode: 200
   })
   cy.visit('http://localhost:3000/')
     .get('.movie-container').should('be.visible')
  });

  it('Should be able to select a movie and see the movie details', () => {
    cy.get('[id=718444]')
      .click()
    cy.contains('When the hunter becomes the prey')
  });

  it('As a user, when I click on a movie, the application should perform a successful GET request for a single movie\'s details', () => {
    cy.get('[id=718444]')
      .click()
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/71844/'
    },
    {
      statusCode: 200
    })
    cy.visit('http://localhost:3000/718444')
      .contains('.movie-title', 'Rogue')
  });

  it('Should be able to click back button and return to home page', () => {
    cy.get('[id=718444]')
      .click()
    cy.get('.arrow-icon')
      .click()
    cy.get('.movie-container').should('be.visible')
  });

  it('Should display an error message if user inputs an false id in url', () => {
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3000/0420'
    },
    {
      statusCode: 404,
    })
  });
});


// cy.intercept( "GET", 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
// {
//   average_rating: 6.142857142857143,
//   backdrop_path: "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
//   id: 694919,
//   poster_path: "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
//   release_date: "2020-09-29",
//   title: "Money Plane"
// })
//
// // cy.visit('http://localhost:3000/')
//   // .get('.movie-container').should('be.visible')
