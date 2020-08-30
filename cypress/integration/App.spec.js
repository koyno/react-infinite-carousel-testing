describe('React Leaf Carousel', () => {

  beforeEach(() => {
    cy.viewport(600, 600) //2 images in viewport
    cy.visit('/')
  })

  //check whether lazy loading works
  it('lazy loading', () => {
    //check only 2 images are loaded
    cy.get('[data-testid="img0"]').should('exist').and('have.attr', 'alt', 'image')
    cy.get('[data-testid="img1"]').should('exist').and('have.attr', 'alt', 'image')
    cy.get('[data-testid="img2"]').should('not.exist')
    cy.get('[data-testid="infinite-carousel-button-next"]').click()
    cy.get('[data-testid="img2"]').should('exist').and('have.attr', 'alt', 'image')
  })

  //check whether responsive breakpoints works
  it('responsive breakpoints', () => {
    //cy.viewport(600, 600) is already set
    cy.get('[data-testid="img0"]').should('be.visible')
    cy.get('[data-testid="img1"]').should('be.visible')
    cy.get('[data-testid="img2"]').should('not.be.visible')
    cy.get('[data-testid="img3"]').should('not.be.visible')
    
    cy.viewport(1000, 600)
    cy.get('[data-testid="img0"]').should('be.visible')
    cy.get('[data-testid="img1"]').should('be.visible')
    cy.get('[data-testid="img2"]').should('be.visible')
    cy.get('[data-testid="img3"]').should('not.be.visible')

    cy.viewport(1400, 600)
    cy.get('[data-testid="img0"]').should('be.visible')
    cy.get('[data-testid="img1"]').should('be.visible')
    cy.get('[data-testid="img2"]').should('be.visible')
    cy.get('[data-testid="img3"]').should('be.visible')
    cy.get('[data-testid="img4"]').should('not.be.visible')
  })

  // check if images really changing
  it('arrows and dots', () => {
    cy.get('[data-testid="infinite-carousel-button-next"]').click()
    cy.get('[data-testid="img0"]').should('not.be.visible')
    cy.get('[data-testid="img1"]').should('not.be.visible')
    cy.get('[data-testid="img2"]').should('be.visible')
    cy.get('[data-testid="img3"]').should('be.visible')
    cy.get('[data-testid="img4"]').should('not.be.visible')

    cy.get('[data-testid="infinite-carousel-button-previous"]').click()
    cy.get('[data-testid="img0"]').should('be.visible')
    cy.get('[data-testid="img1"]').should('be.visible')
    cy.get('[data-testid="img2"]').should('not.be.visible')
    cy.get('[data-testid="img3"]').should('not.be.visible')
    
    cy.get('[data-testid="infinite-carousel-dots"]>button').each(($el, index) => {
      cy.wrap($el).click()
      cy.log(index)
      let page = index*2 //2 images on a single page
      cy.get('[data-testid="img'+(page-1)+'"]').should('not.be.visible')
      cy.get('[data-testid="img'+page+'"]').should('be.visible')
      cy.get('[data-testid="img'+(page+1)+'"]').should('be.visible')
      cy.get('[data-testid="img'+(page+2)+'"]').should('not.be.visible')
    })
  })
  
})