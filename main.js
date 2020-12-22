 const hourTominute = 60;

// // convert delay HH:MM in minutes
 function delayConvert(delay)
 {    
    delay = delay.split(":");
    return parseInt(delay[0])*hourTominute + parseInt(delay[1]);
 }

 function timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
  }

// console.log(delayConvert("03:25"));
/* var fs = require('fs');
var data = fs.readFileSync('file.txt','utf8');
console.log(data);
var lines = data.split("\n"); */
/*
08:20;Paris;Berlin
5
09:20;Paris;Amsterdam;03:20
08:30;Paris;Bruxelles;01:20
10:00;Bruxelles;Amsterdam;02:10
12:30;Amsterdam;Berlin;06:10
11:30;Bruxelles;Berlin;09:20
*/


/*const train horraire = {//8:20
    P: {PA: convert("01:00" + "03:20"), PBx: convert("01:20" + "00:10")}, //12:40  //9:50
    PBx: {PBxA: convert("02:10" + "00:10")}, //12:10
    PBxA: {PBxABe:convert("00:20" + "06:10") },  //18:40
    PBxABe: {},
  };*/
  const problem = {
    start: {A: 5, B: 2},
    A: {C: 4, D: 2},
    B: {A: 8, D: 7},
    C: {D: 6, finish: 3},
    D: {finish: 1},
    finish: {}
  };
const horaire = {
    paris: 
    { 
     A:{depart: "9:20", duree:"03:20"},
     B:{depart:"08:30", duree:"01:20"}
    },
    A:
    { 
     b:{depart:"12:30", duree:"06:10"}
    },
    B: 
    { 
     A:{ depart:"10:00", duree:"02:10"},
     b:{ depart:"11:30", duree:"09:20"}
    }
  };
  
const heurdepart="08:20"
const viledepart= "paris"
const vilearrive= "b"
  
  const lowestCostNode = (costs, processed) => {
    lowest=null;
    for (const key of costs.keys()) {

      if (lowest === null || costs.get(key) < costs.get(lowest)) {
        if (!processed.includes(key)) {
          lowest = key;
        }
      }
      }
      return lowest;  
  };
  
 
  const putcosts = (villedepartfils) => {
    const myMap = new Map();
    Object.keys(villedepartfils).forEach(function(item) {
      let time=(delayConvert(villedepartfils[item].depart) - delayConvert(heurdepart))
      + delayConvert(villedepartfils[item].duree);

      console.log(item+" "+timeConvert(time));

      myMap.set(item,time);
    
    });


    return myMap;
    
  };
  
  // function that returns the minimum cost and path to reach Finish
  const dijkstra = (horaire, heurdepart,viledepart,vilearrive) => {
  
    // track lowest cost to reach each node
    const costs = putcosts(horaire[viledepart]);
  
    console.log("cost "+costs);

    // track nodes that have already been processed
    const processed = [];
  
    let node = lowestCostNode(costs, processed);
    var tmpheurdep = delayConvert(heurdepart);

    while (node) {
      console.log("node "+node);

      let cost =costs.get(node);
      let children = horaire[node]?horaire[node]:{};
      tmpheurdep = tmpheurdep+ costs.get(node);
      
      for (let n in children) {

        console.log(n);
        console.log(children[n].depart);
        console.log(children[n].duree);
        console.log(timeConvert(tmpheurdep));

        let newCost =  (delayConvert(children[n].depart) - tmpheurdep) 
                            + delayConvert(children[n].duree);
         console.log(n+" "+timeConvert(newCost));
        
        if (!costs.get(n)) {
          costs.set(n,newCost);
        }
        if (costs.get(n) > newCost) {
          costs.set(n,newCost);
        }
      }
      
      processed.push(node);
      node = lowestCostNode(costs, processed);
      
    }
    for (const [key, value] of costs) {
      console.log(`${key} = ${timeConvert(value)}`);
    }
    var distance=0
    for (const  value of costs.values()) {
      distance=distance+value
    }
    
    const results = {
      distance:timeConvert( distance),
      heureArriv:timeConvert( tmpheurdep)
    };
  
    return results;
  };
  
  console.log(dijkstra(horaire, heurdepart,viledepart,vilearrive));