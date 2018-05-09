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

//Title
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
    const {
      nameInput,
      itemsInput,
      nameOutput,
      itemsOutput,
      box,
      handleNameChange,
      handleItemsChange,
      handleSubmit
    } = this.props;

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
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="modal-title add-edit" id="recipeModalLabel">
                  Add a new recipe
                </h3>
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
                      value={nameInput}
                      onChange={handleNameChange}
                      placeholder="Name your recipe"
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
                      value={itemsInput}
                      onChange={handleItemsChange}
                      placeholder="Separate, Ingredients, With, Commas"
                      />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-all btn-close"
                  data-dismiss="modal"
                  >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn-all btn-add"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  >
                  <i className="fas fa-plus-circle" /> Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PanelGroup = ReactBootstrap.PanelGroup;
const Panel = ReactBootstrap.Panel;

class Accordion extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: "1"
    };
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    const {
      nameInput,
      itemsInput,
      nameOutput,
      itemsOutput,
      box,
      entry,
      handleEdit,
      handleDelete
    } = this.props;

    const recipeStats = box.map(el => (
      <Panel eventKey={box.indexOf(el) + 1} key={box.indexOf(el) + 1}>
        <Panel.Heading>
          <Panel.Title toggle key={el.title + box.indexOf(el) + 1}>
            {el.title}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <div className="ingreds text-center">
            <h5>Ingredients</h5>
          </div>
          <ul className="list-group">
            {el.ingreds.map(item => (
              <li className="list-group-item list-group-item-action" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <div id="panel-footer" className="modal-footer">
            <button
              type="button"
              className="btn-all btn-del"
              value={el.title}
              onClick={handleDelete}
              >
              Delete
            </button>
            <button
              type="button"
              className="btn-all btn-add"
              value={el.title}
              //onClick={handleEntryChange}
              >
              Edit
            </button>
          </div>
        </Panel.Body>
        <div className="counter">
          <h6>recipe #{box.indexOf(el) + 1}</h6>
        </div>
      </Panel>
    ));

    return (
      <PanelGroup
        accordion
        id="accordion-controlled"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
        >
        {recipeStats}
      </PanelGroup>
    );
  }
}

class BoxApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      itemsInput: "",
      nameOutput: "",
      itemsOutput: [],
      box: [],
      entry: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);    
    this.addNewRecipe = this.addNewRecipe.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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

  handleEdit() {
    this.setState({
      nameInput: "",
      itemsInput: ""
    });
  }

  handleDelete(event) {
    this.setState({
      entry: event.target.value
    });
    setTimeout(() => { 
      function removeByAttr(arr, attr, value) {
      let i = arr.length;
      while (i--) {
        if (
          arr[i] &&
          arr[i].hasOwnProperty(attr) &&
          (arguments.length > 2 && arr[i][attr] === value)
        ) {
          arr.splice(i, 1);
        }
      }
      return arr;
    };
    this.setState({
      box: removeByAttr(this.state.box, "title", this.state.entry)
    }); }, 10);  
  }

  addNewRecipe() {
    let name = this.state.nameInput;
    const items = this.state.itemsInput.split(","); // ingredients array

    console.log(name);
    console.log(items);

    if (name === "") {
      name = "Untitled recipe";
      this.setState({
        box: [...this.state.box, { title: name, ingreds: items }]
      });
    } else {
      this.setState({
        box: [...this.state.box, { title: name, ingreds: items }]
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
    console.log(this.state.entry);
    const {
      nameInput,
      itemsInput,
      nameOutput,
      itemsOutput,
      box,
      entry
    } = this.state;

    return (
      <div>
        <Title />
        <Modal
          nameInput={nameInput}
          handleNameChange={this.handleNameChange}
          itemsInput={itemsInput}
          handleItemsChange={this.handleItemsChange}
          handleSubmit={this.handleSubmit}
          nameOutput={nameOutput}
          itemsOutput={itemsOutput}
          box={box}
          />
        <div className="box">
          <Accordion
            nameInput={nameInput}
            itemsInput={itemsInput}
            nameOutput={nameOutput}
            itemsOutput={itemsOutput}
            box={box}
            entry={entry}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
            />
          <div className="info">
            <h6>A box for all your favorite recipes!</h6>
          </div>
        </div>
        <div className="button text-center">
          <button
            type="button"
            className="btn-all btn-add"
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

ReactDOM.render(<BoxApp />, document.getElementById("content"));
