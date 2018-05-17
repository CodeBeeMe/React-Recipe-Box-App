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
      <h2>- The Recipe Box -</h2>
    </div>
  );
};

//Footer
const Footer = () => {
  return (
    <div id="footer" className="navbar-fixed-bottom text-center">
      <h6>Designed and coded by <a href="https://github.com/Madness2aMaze" target="_blank" id="footbar" title="©2018 Cătălin Anghel-Ursu @Madness2aMaze - All Rights Reserved">@Madness2aMaze ©2018 - All Rights Reserved</a> | <a href="http://codepen.io/Madness2aMaze/" title="More of my works" target="_blank"><i className="fab fa-codepen"></i></a> | <a href="https://www.freecodecamp.com/" target="_blank" title="FreeCodeCamp" ><i className="fab fa-free-code-camp"></i></a>
      </h6>
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
      box,
      handleClose,
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
          data-keyboard="false"
          data-backdrop="static"
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
                  onClick={handleClose}
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
                  onClick={handleClose}
                  >
                  Close
                </button>
                <button
                  type="submit"
                  id="add"
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
    this.state = {
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);    
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }
  
  render() {
    const {
      nameInput,
      itemsInput,
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
              id={el.title}
              className="btn-all btn-edit"
              data-toggle="modal"
              data-target="#recipeModal"
              data-items={el.ingreds}
              value={el.title}
              onClick={handleEdit}
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
      box: [],
      entry: ""
    };
    
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);
  }
  
    
  // saves the state to the browser's localStorage with the Key "_Madness2aMaze_recipes"
  saveToLocalStorage() {
    setTimeout(() => {
      localStorage.setItem("_Madness2aMaze_recipes", JSON.stringify(this.state.box));
    },100);    
  }
  
  // updates the state with the Value (storedRecipes) from the localStorage Key ("_Madness2aMaze_recipes")
  getFromLocalStorage() {
    // default value ready to be loaded on first app load
    let defaultRecipes = [{title: "Salad", ingreds: ["Lettuce", " Green Onion", " Sweet Peppers", " Tomatoes", " Extra-virgin Olive Oil", " Lemon Juice", " Salt"]}, {title: "Pizza Carbonara", ingreds: ["Pizza dough", " White sauce", " Mozzarella", " Gorgonzola", " Bacon", " Parmesan"]}, { title: "Vanilla Pancakes", ingreds: [ "Flour", " Milk", " Eggs", " Vanilla", " Salt", " 3 Cubes of Brown Sugar"]}];
    
    // value stored for the "_Madness2aMaze_recipes" Key
    let storedRecipes = JSON.parse(localStorage.getItem("_Madness2aMaze_recipes"));
    
    if (typeof localStorage["_Madness2aMaze_recipes"] != "undefined") {
      this.setState({
        box: storedRecipes
      });
    } else {
      this.setState({
        box: defaultRecipes
      });
    }
  }
  
  componentDidMount() {   
    this.getFromLocalStorage();
  }
  
  handleNameChange(event) {
    this.setState({
      nameInput: event.target.value
    });
  }
  
  handleItemsChange(event) {
    this.setState({
      itemsInput: event.target.value
    });
  }
  
  handleClose() {
    $("#recipeModalLabel").text("Add a new recipe");
    $("#add").removeClass("btn-save");
    $("#add").addClass("btn-add");
    $("#add").html("<i class='fas fa-plus-circle'/> Recipe");
    $('#recipe-name').css('background', '#fff');
    this.setState({
      nameInput: "",
      itemsInput: ""
    });
  }
  
  handleEdit(event) {
    $("#recipeModalLabel").text("Edit recipe");
    $("#add").removeClass("btn-add");
    $("#add").addClass("btn-save");
    $("#add").text("Save");
    let recipe = document.getElementById(event.target.value);    
    this.setState({
      nameInput: event.target.value,
      itemsInput: recipe.dataset.items
    });
    this.saveToLocalStorage();
  }

  handleDelete(event) {
    this.setState({
      entry: event.target.value
    });
    setTimeout(() => {
      function removeByAttr(arr, attr, val) {
        for (let i = arr.length; i--;) {
          if (arr[i][attr] === val) {
            arr.splice(i, 1);
          }
        }
        return arr;
      };
      this.setState({
        box: removeByAttr(this.state.box, "title", this.state.entry)
      });
      this.saveToLocalStorage();
    }, 10);
  }

  addNewRecipe() {
    let name = this.state.nameInput; // name of the recipe
    let items = this.state.itemsInput.split(","); // ingredients array
    //console.log(name);
    //console.log(items);
    
    function checkIfExists(arr, attr1, attr2, val) {
      for (let i = arr.length; i--;) {
        if (arr[i][attr1] === val) {
          arr[i][attr2] = items;
          return true; //the recipe exists already in the box
        }          
      }
      return false; //the recipe is new
    };
    
    //checking if the recipe-name input field is empty
    if (name === "") {
      $('.modal').modal(); //calls the modal dialog
      setTimeout(() => {
        if ($('#recipe-name').val() === "") { //if empty
          $('#recipe-name').css('background', '#ffccd0'); //make the input field redish to prompt the user to add a name to the recipe
          return false;
        } else {
          $('#recipe-name').css('background', '#fff'); // all is well, nothing is changed
        }
      }, 10);
    } else if (!checkIfExists(this.state.box, 'title', 'ingreds', name)) { //calls the checkifExists() func with 3 specific args
      this.setState({
        box: [...this.state.box, {title: name, ingreds: items}]
      });      
    }    
  }

  handleSubmit() {
    this.addNewRecipe();
    this.saveToLocalStorage();
    //resets the modal title and primary button label on submit
    $("#recipeModalLabel").text("Add a new recipe");//modal title
    $("#add").removeClass("btn-save");
    $("#add").addClass("btn-add");
    $("#add").html("<i class='fas fa-plus-circle'/> Recipe");//modal primary button label
    //resets the style for the #recipe-name input
    $('#recipe-name').css('background', '#fff');
    this.setState({
      nameInput: "",
      itemsInput: ""
    });
  }

  render() {
    //Logs
    //console.log(this.state.nameInput);
    //console.log(this.state.itemsInput);
    //console.log(this.state.box);
    //console.log(this.state.entry);
    
    const {
      nameInput,
      itemsInput,
      box,
      entry
    } = this.state;

    return (
      <div>
        <Title />
        <Modal
          handleClose={this.handleClose}
          nameInput={nameInput}
          handleNameChange={this.handleNameChange}
          itemsInput={itemsInput}
          handleItemsChange={this.handleItemsChange}
          handleSubmit={this.handleSubmit}
          box={box}
          />
        <div className="box">
          <Accordion
            nameInput={nameInput}
            itemsInput={itemsInput}
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
            className="btn-all btn-start"
            data-toggle="modal"
            data-target="#recipeModal"
            >
            <i className="fas fa-plus-circle" /> Recipe
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<BoxApp />, document.getElementById("content"));
