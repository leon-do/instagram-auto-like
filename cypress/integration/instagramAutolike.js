const username = 'usernameHere';
const password = 'passwordHere';
const tags = ['fishing', 'mountain', 'climbing', 'adventure'];
Cypress.env('RETRIES', 99); // https://github.com/Bkucera/cypress-plugin-retries

describe('instagram auto like', () => {
  it('should log in, then loop through likes', () => {
    // login
    cy.visit('https://www.instagram.com/accounts/login/')
      .wait(5000)
      .get('input')
      .eq(0)
      .type(username)
      .get('input')
      .eq(1)
      .type(password)
      .type('{enter}')
      .wait(5000)
      .then(() => loop());

    // click like
    function loop() {
      cy.visit(
        `https://www.instagram.com/explore/tags/${
          tags[Math.floor(Math.random() * tags.length)]
        }`
      )
        .get(
          '#react-root > section > main > article > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(1)'
        )
        .click()
        .wait(5000)
        .get('section')
        .find('svg[aria-label="Like"]')
        .click()
        .wait(Math.random() * 60000)
        .then(() => loop());
    }
  });
});
