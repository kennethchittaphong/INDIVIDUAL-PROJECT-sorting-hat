const hpCharacters = [
    {
        id: 1,
        name: "Harry Potter",
        house: "Gryffindor",
    },
    {
        id: 2,
        name: "Ronald Weasley",
        house: "Gryffindor",
    },
    {
        id: 3,
        name: "Hermione Granger",
        house: "Gryffindor",
    },
    {
        id: 4,
        name: "Draco Malfoy",
        house: "Slytherin",
    },
    {
        id: 5,
        name: "Luna Lovegood",
        house: "Ravenclaw",
    },
    {
        id: 6,
        name: "Severus Snape",
        house: "Slytherin",
    },
    {
        id: 7,
        name : "Albus Dumbledore",
        house: "Gryffindor",
    },
    {
        id: 8,
        name: "Cedric Diggory",
        house: "Hufflepuff",
    },
    {
        id: 9,
        name: "Cho Chang",
        house: "Ravenclaw",
    },
    {
        id: 10,
        name: "Sirius Black",
        house: "Gryffindor",
    },
    {
        id: 11,
        name: "Seamus Finnigan",
        house: "Gryffindor",
    },
    {
        id: 12,
        name: "Ginevra Weasley",
        house: "Gryffindor",
    },

];

const expelled = [];
console.log(hpCharacters);

const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];


//sort
const byName = hpCharacters.sort((a, b) => {
    if (a.name < b.name) return -1;
    return 1;
});
console.log(byName);


//renderToDom
const renderToDom = (divId, textToRender) => {
    const selectedElement = document.querySelector(divId);
    selectedElement.innerHTML = textToRender;
  };


//formdata
const sortHat = () => {
    let domString = `
    <h2>Welcome to Hogwarts!</h2>
    <form id="form" class="row g-3">
    <div class="col-12">
      <h3><label for="studentName" class="form-label">Student Name</label></h3>
      <input type="text" class="form-control" id="studentName" placeholder="Enter Your Name Here">
    </div>
    <div class="col-12">
      <button type="submit" id="sort-btn">Sort!</button>
    </div>
  </form>`;
  
    renderToDom("#searchContainer", domString);
  };
    

//filterbuttons
const filterButtons = () => {
    let domString = "";
    domString =
        `<button id="Gryffindor" type="button" class="btn btn-primary">Gryffindor</button>
        <button id="Hufflepuff" type="button" class="btn btn-primary">Hufflepuff</button>
        <button id="Ravenclaw" type="button" class="btn btn-primary">Ravenclaw</button>
        <button id="Slytherin" type="button" class="btn btn-primary">Slytherin</button>
        <button id="all" type="button" class="btn btn-primary">All</button>`;

    renderToDom("#filterContainer", domString);
};


//card
const hogwartDom = (array) => {
    let domString = "";
    for (const characters of array) {
        domString += `
        <div class="card">
            <div class="card-body">
                 <h5 class="card-title">${characters.name}</h5>
                 <p class="card-text">${characters.house}</p>
                 <button id="expel--${characters.id}" class="btn btn-danger">Expel</button>
            </div>
        </div>
        `;
    }
    renderToDom("#studentContainer", domString);
};


//expel card
const expelDom = (array) => {
    let domString = "";
    for (const characters of array) {
        domString += `
        <div class="card2">
            <div class="card-body">
                 <h5 class="card-title">${characters.name}</h5>
                 <p class="card-text">${characters.house}</p>
                 <h4 class="card-text">You have been expelled!</h4>
            </div>
        </div>`;
    }
    renderToDom("#expelledContainer", domString);
};


//event listener
function eventListeners () {
    let domString = "";
    document.querySelector("#filterContainer").addEventListener("click", (e) => {
        if (e.target.id === "all") {
            hogwartDom(hpCharacters);
        }else if (e.target.id === "Gryffindor") {
            const gryffindor = hpCharacters.filter(taco => taco.house === "Gryffindor" )
            hogwartDom(gryffindor);
        }else if (e.target.id === "Hufflepuff") {
            const hufflepuff = hpCharacters.filter(taco => taco.house === "Hufflepuff" )
            hogwartDom(hufflepuff)
        }else if (e.target.id === "Ravenclaw") {
            const ravenclaw = hpCharacters.filter(taco => taco.house === "Ravenclaw" )
            hogwartDom(ravenclaw)
        }else if (e.target.id === "Slytherin") {
            const slytherin = hpCharacters.filter(taco => taco.house === "Slytherin" )
            hogwartDom(slytherin)
        }
    }
    );

    document.querySelector("#searchContainer").addEventListener("submit", (e) => {
        e.preventDefault();
        const random = Math.floor(Math.random() * houses.length)
        const inputStudent = {
            id: hpCharacters.length + 1,
            name: document.querySelector("#studentName").value,
            house: houses[random],
        };
        hpCharacters.push(inputStudent);
        hogwartDom(hpCharacters);
        console.log(inputStudent);


    });


    document.querySelector("#studentContainer").addEventListener("click", (e) => {
        if (e.target.id) {
            const [method, id] = e.target.id.split("--");
            const index = hpCharacters.findIndex((taco) => taco.id === parseInt(id));
            if (e.target.id.includes("expel"))
                expelled.push(...hpCharacters.splice(index, 1));
            hogwartDom(hpCharacters);
            expelDom(expelled);
        }
    });


};










//start up
function startApp() {
    sortHat();
    hogwartDom(hpCharacters);
    expelDom(expelled);
    filterButtons();
    eventListeners();
};

startApp();
