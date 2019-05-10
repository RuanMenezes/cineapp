
describe('MovieList', () => {

  it('title', ()=> {
    browser.get("/")
    var title = element(by.css('#movies h1'))
    expect(title.getText()).toEqual("Cadastro de filmes")
  })

})