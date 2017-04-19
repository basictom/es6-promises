// Use AJAX | Promises to load all 3 JSON files
// Iterate over all JSON files and match the human with their appropriate pet(s)
// ES6-ify it all!
//  No more VAR (Replace with LET, CONST)

$(document).ready(function(){


    const loadHumans = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./database/humans.json")
            .done((data1) => resolve(data1.humans))
            .fail((error) => reject(error));
        });
    };

    const loadDogs = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./database/dogs.json")
            .done((data1) => resolve(data1.dogs))
            .fail((error) => reject(error));
        });
    };

    const loadCats = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./database/cats.json")
            .done((data1) => resolve(data1.cats))
            .fail((error) => reject(error));
        });
    };

    const loadDinos = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./database/dinos.json")
            .done((data1) => resolve(data1.dinos))
            .fail((error) => reject(error));
        });
    };

  const myHumans = [];
  const myAnimals = [];
  const checkForTypeMatch = (human, pet) => {
    const interestedInArray = human["interested-in"];
    const isMatchNumber = interestedInArray.indexOf(pet.type);
    if(isMatchNumber === -1){
      return false;
    }else{
      return true;
    }
  };


  const checkForKidFriendly = (human, pet) => {
    const hasKids = human["has-kids"];
    const isKidFriendly = pet["kid-friendly"];
    let isMatched = true;
    if(hasKids && !isKidFriendly){
      isMAtched = false;
      console.log("check work", isMatched);
    }
    return isMatched;
  };




  loadHumans().then((humans) => {
      humans.forEach((human) => {
          human.matches = [];
          myHumans.push(human);
      });
      Promise.all([loadDogs(), loadCats(), loadDinos()]).then((result) => {
        console.log(result);
        result.forEach((call) => {
          call.forEach((animal) => myAnimals.push(animal));
        });
        // console.log(myAnimals, myHumans);
        for (let i=0;i<myHumans.length; i++){
          for(let k=0;k<myAnimals.length; k++){
            if(checkForTypeMatch(myHumans[i], myAnimals[k]) && checkForKidFriendly(myHumans[i], myAnimals[k])){
              myHumans[i].matches.push(myAnimals[k]);
            }

          }
        }
        // console.log(myHumans);
        writeToDOM(myHumans);
      })
      .catch((errors) => {
        console.log("erorr", errors);
      });
  }).catch((humanerror) => {
    console.log("human error", humanerror);
  });




  const outputContainer = $("#output");

    const writeToDOM = (humanArray) => {
    let domString = "";
    for (let i = 0; i < humanArray.length; i++) {
      domString += `<div class="human row">`;
      domString += `<div class="col-sm-4">`;
      domString += `<img src="${humanArray[i].image}">`;
      domString += `<p>${humanArray[i].name}</p>`;
      domString += `</div>`;
      domString += `<div class="col-sm-8 overflow-row">`;
      for (let j = 0; j < humanArray[i].matches.length; j++){
        domString += `<div class="animal">`;
        domString += `<img src="${humanArray[i].matches[j].image}">`;
        domString += `<p>${humanArray[i].matches[j].name}</p>`;
        domString += `<p>${humanArray[i].matches[j].description}</p>`;
        domString += `</div>`;
      }
      domString += `</div>`;
      domString += `</div>`;
    }
    outputContainer.append(domString);
  };



});
