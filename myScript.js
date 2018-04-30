/* !Date:12.04.2018 Copyright ©2018 JavaScript & React code by Cătălin Anghel-Ursu @Madness2aMaze (https://codepen.io/Madness2aMaze)
- All Rights Reserved!

MIT License

Copyright (c) 2018 Cătălin Anghel-Ursu (https://github.com/Madness2aMaze/Recipe-Box-App)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

const Title = () => {
  return (
    <div id="title" className="text-center">
      <h1>- The Recipe Box -</h1>
    </div>
  );
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div
          className="modal focus"
          id="recipeModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="recipeModalLabel"
          aria-hidden="true"
          >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title add-edit" id="recipeModalLabel">
                  Add a new recipe
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label
                      htmlFor="recipe-name"
                      className="col-form-label add-edit"
                      >
                      Recipe:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipe-name"
                      value={this.props.name}
                      onChange={this.props.handleNameChange}
                      placeholder="Name of the recipe"
                      />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="ingredients-text"
                      className="col-form-label add-edit"
                      >
                      Ingredients:
                    </label>
                    <textarea
                      className="form-control"
                      id="ingredients-text"
                      value={this.props.items}
                      onChange={this.props.handleItemsChange}
                      placeholder="Separate, Ingredients, With, Commas"
                      />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-dismiss="modal"
                  >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  data-dismiss="modal"
                  onClick={this.props.handleSubmit}
                  >
                  <i className="fas fa-plus-circle" /> Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="view-edit-modal">
          <div
            className="modal focus"
            id="editModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
            >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header text-center">
                  {/*title*/}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body edit-body">
                  <form>
                    <div className="form-group text-center">
                      <label
                        htmlFor="ingredients-text"
                        className="col-form-label"
                        >
                        <div className="ingreds">Ingredients</div>
                      </label>
                      <ul className="list-group">{/*list*/}</ul>
                    </div>
                  </form>
                </div>
                <div className="modal-footer edit-footer">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    data-dismiss="modal"
                    onClick={this.handleDelete}
                    >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-dark"
                    data-dismiss="modal"
                    onClick={this.handleSubmit}
                    >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      itemsInput: "",
      nameOutput: "",
      itemsOutput: [],
      box: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);
    this.addNewRecipe = this.addNewRecipe.bind(this);
    this.handleRecipeOpen = this.handleRecipeOpen.bind(this);
    this.openRecipe = this.openRecipe.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      nameInput: event.target.value
    });
  }

  handleItemsChange(event) {
    event.preventDefault();
    this.setState({
      itemsInput: event.target.value
    });
  }

  handleRecipeOpen(event) {
    this.setState({
      nameOutput: event.target.value
    });
  }

  openRecipe() {
    this.setState({});
  }

  handleDelete() {}

  addNewRecipe() {
    function Recipe(title, ingreds) {
      //Recipe Object Constructor
      this.title = title;
      this.ingreds = ingreds;
    }
    let name = this.state.nameInput;
    const items = this.state.itemsInput.split(","); // ingredients array
    console.log(name);
    console.log(items);
    if (name === "") {
      name = "Untitled";
      this.setState({
        box: [...this.state.box, new Recipe(name, items)]
      });
    } else {
      this.setState({
        box: [...this.state.box, new Recipe(name, items)]
      });
    }
  }

  handleSubmit() {
    this.addNewRecipe();
    this.setState({
      nameInput: "",
      itemsInput: ""
    });
  }

  render() {
    console.log(this.state.box);
    const { nameInput, itemsInput, nameOutput, itemsOutput, box } = this.state;
    //const title = nameOutput.map(el => (<h3>{el}</h3>));

    //----------------------------------------
    const title = box.map(el => (
      <h5 className="modal-title edit" id="recipeModalLabel" key={el.title}>
        {el.title}
      </h5>
    ));
    const list = box.map(el =>
                         el.ingreds.map(item => (
      <li className="list-group-item list-group-item-action" key={item}>
        {item}
      </li>
    ))
                        );
    //-----------------------------------------

    const recipeStats = box.map(el => (
      <tr>
        <td id={box.indexOf(el) + 1} key={box.indexOf(el) + 1}>
          {box.indexOf(el) + 1}
        </td>
        <td id="names" key={el.title + box.indexOf(el) + 1}>
          <a
            href="#"
            data-toggle="modal"
            data-target="#editModal"
            value={el.title}
            onClick={this.handleRecipeOpen}
            >
            {el.title}
          </a>
        </td>
        <td id="ingred-string" key={el.ingreds.length + box.indexOf(el) + 1}>
          {el.ingreds.join(",")}
        </td>
      </tr>
    ));

    return (
      <div>
        <Title />
        <Modal
          name={nameInput}
          handleNameChange={this.handleNameChange}
          items={itemsInput}
          handleItemsChange={this.handleItemsChange}
          handleSubmit={this.handleSubmit}
          />
        <div className="box">
          <div className="table-responsive">
            <table className="table table-striped table-light">
              <thead>
                <tr>
                  <th>#</th>
                  <th id="names">Name</th>
                  <th>Ingredients</th>
                </tr>
              </thead>
              <tbody>{recipeStats}</tbody>
            </table>
            <div className="footer">
              <h6>A box for all your favorite recipes!</h6>
            </div>
          </div>
        </div>
        <div className="button text-center">
          <button
            type="button"
            className="btn btn-outline-dark"
            data-toggle="modal"
            data-target="#recipeModal"
            >
            <i className="fas fa-plus-circle" /> Recipe
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
