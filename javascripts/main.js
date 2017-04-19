// Use AJAX | Promises to load all 3 JSON files
// Iterate over all JSON files and match the human with their appropriate pet(s)
// ES6-ify it all!

$(document).ready(function(){


    var loadHumans = function () {
        return new Promise(function(resolve, reject) {
            $.ajax("./database/humans.json")
            .done(function(data1){
                resolve(data1.humans);
            })
            .fail(function(error){
                reject(error);
            });
        });
    };

    var loadDogs = function () {
        return new Promise(function(resolve, reject) {
            $.ajax("./database/dogs.json")
            .done(function(data1){
                resolve(data1.dogs);
            })
            .fail(function(error){
                reject(error);
            });
        });
    };

    var loadCats = function () {
        return new Promise(function(resolve, reject) {
            $.ajax("./database/cats.json")
            .done(function(data1){
                resolve(data1.cats);
            })
            .fail(function(error){
                reject(error);
            });
        });
    };

    var loadDinos = function () {
        return new Promise(function(resolve, reject) {
            $.ajax("./database/dinos.json")
            .done(function(data1){
                resolve(data1.dinos);
            })
            .fail(function(error){
                reject(error);
            });
        });
    };

  var myHumans = [];
  var myAnimals = [];
  var checkForTypeMatch = function (human, pet) {
    var interestedInArray = human["interested-in"];
    var isMatchNumber = interestedInArray.indexOf(pet.type);
    if(isMatchNumber === -1){
      return false;
    }else{
      return true;
    }
  };


  var checkForKidFriendly = function(human, pet){
    var hasKids = human["has-kids"];
    var isKidFriendly = pet["kid-friendly"];
    var isMatched = true;
    if(hasKids && !isKidFriendly){
      isMAtched = false;
      console.log("check work", isMatched);
    }
    return isMatched;
  };




  loadHumans().then(function(humans){
      humans.forEach(function(human){
          human.matches = [];
          myHumans.push(human);
      });
      Promise.all([loadDogs(), loadCats(), loadDinos()]).then(function(result){
        console.log(result);
        result.forEach(function(call){
          call.forEach(function(animal){
            myAnimals.push(animal);
          });
        });
        // console.log(myAnimals, myHumans);
        for (var i=0;i<myHumans.length; i++){
          for(var k=0;k<myAnimals.length; k++){
            if(checkForTypeMatch(myHumans[i], myAnimals[k]) && checkForKidFriendly(myHumans[i], myAnimals[k])){
              myHumans[i].matches.push(myAnimals[k]);
            }

          }
        }
        // console.log(myHumans);
        writeToDOM(myHumans);
      })
      .catch(function(errors){
        console.log("erorr", errors);
      });
  }).catch(function(humanerror){
    console.log("human error", humanerror);
  });




  var outputContainer = $("#output");

    var writeToDOM = function (humanArray) {
    var domString = "";
    for (var i = 0; i < humanArray.length; i++) {
      domString += `<div class="human row">`;
      domString += `<div class="col-sm-4">`;
      domString += `<img src="${humanArray[i].image}">`;
      domString += `<p>${humanArray[i].name}</p>`;
      domString += `</div>`;
      domString += `<div class="col-sm-8 overflow-row">`;
      for (var j = 0; j < humanArray[i].matches.length; j++){
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
