class Node {
    constructor(name, adjacent = new Set()) {
        this.name = name
        this.adjacent = adjacent
    }
    addEdge(...names) {
        for (let name of names) {
            this.adjacent.add(name)
        }
    }
}

const seal = new Node("Seal")
const penguin = new Node("Penguin")
const fish = new Node("Fish")
const squid = new Node("Squid")

seal.addEdge(penguin, fish, squid)
// console.log(seal)

const adjacencyList = {
    A: ["B", "F"],
    B: ["A", "C"],
    C: ["B", "D"],
    D: ["C", "E"],
    E: ["D", "F"],
    F: ["E", "A"]
}

// console.log(adjacencyList.A)

const adjacencyMatrix = [
    [0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0]
]

class PersonNode {
    constructor(name, adjacent = new Set()) {
        this.name = name
        this.adjacent = adjacent
    }
    showConnections() {
        for (let person of this.adjacent) {
            console.log(person.name)
        }
    }
}

class FriendGraph {
    constructor() {
        this.nodes = new Set()
    }
    /**
     * Add a person to list
     * @param {PersonNode} person Person to be added to the graph
     */
    addPerson(person) {
        this.nodes.add(person)
    }
    /**
     * 
     * @param  {...PersonNode} people Comma separated list of people to be added to graph
     */
    addPeople(...people) {
        for (let p of people) {
            this.addPerson(p)
        }
    }
    /**
     * Adds connection between the two people
     * @param {PersonNode} person1 First person to be 
     * @param {PersonNode} person2 
     */
    setFriends(person1, person2) {
        person1.adjacent.add(person2)
        person2.adjacent.add(person1)
    }
    /**
     * Checks if two people are connected
     * @param {PersonNode} person1 
     * @param {PersonNode} person2 
     * 
     * @returns {boolean}
     */
    areConnectedBFS(person1, person2) {
        let toVisitQueue = [person1]
        const seen = new Set(toVisitQueue)
        while (toVisitQueue.length) {
            let currPerson = toVisitQueue.shift()

            if (currPerson == person2) return true

            for (let neighbor of currPerson.adjacent) {
                if (!seen.has(neighbor)) {
                    toVisitQueue.push(neighbor)
                    seen.add(neighbor)
                }
            }
        }

        return false
    }
    areConnectedIterativeDFS(person1, person2) {
        const toVisitStack = [person1]
        const seen = new Set(toVisitStack)

        while(toVisitStack.length) {
            const currPerson = toVisitStack.pop()

            if (currPerson == person2) return true

            for (let neighbor of currPerson.adjacent) {
                if(!seen.has(neighbor)) {
                    toVisitStack.push(neighbor)
                    seen.add(neighbor)
                }
            }
        }
        
        return false
    }
    areConnectedRecursiveDFS(person1, person2) {

    }
}

const homer = new PersonNode("Homer")
const marge = new PersonNode("Marge")
const maggie = new PersonNode("Maggie")
const lisa = new PersonNode("Lisa")
const grampa = new PersonNode("Grampa")
const moe = new PersonNode("Moe")
const barney = new PersonNode("Barney")
const lenny = new PersonNode("Lenny")
const friendGraph = new FriendGraph()

friendGraph.setFriends(homer, marge)
friendGraph.setFriends(homer, maggie)
friendGraph.setFriends(homer, lisa)
friendGraph.setFriends(marge, maggie)
friendGraph.setFriends(maggie, lisa)
friendGraph.setFriends(lisa, grampa)
friendGraph.setFriends(moe, barney)
friendGraph.setFriends(barney, lenny)
friendGraph.addPeople(homer, marge, lisa, maggie, grampa, moe, barney, lenny)

// console.log(friendGraph.areConnectedBFS(marge, grampa))
// console.log(friendGraph.areConnectedBFS(marge, moe))
// console.log(friendGraph.areConnectedIterativeDFS(marge,grampa))
// console.log(friendGraph.areConnectedIterativeDFS(marge, moe))

class Graph {
    constructor() {
      this.nodes = new Set();
    }
  
    // this function accepts a Node instance and adds it to the nodes property on the graph
    addVertex(vertex) {
      this.nodes.add(vertex)
    }
  
    // this function accepts an array of Node instances and adds them to the nodes property on the graph
    addVertices(vertexArray) {
      for (let v of vertexArray) {
        this.nodes.add(v)
      }
    }
  
    // this function accepts two vertices and updates their adjacent values to include the other vertex
    addEdge(v1, v2) {
      v1.adjacent.add(v2)
      v2.adjacent.add(v1)
    }
  
    // this function accepts two vertices and updates their adjacent values to remove the other vertex
    removeEdge(v1, v2) {
      v1.adjacent.delete(v2)
      v2.adjacent.delete(v1)
    }
  
    // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
    removeVertex(vertex) {
      this.nodes.delete(vertex)
    }
  
    // this function returns an array of Node values using DFS
    depthFirstSearch(start) {
      const toVisitStack = [start]
      const seen = new Set(toVisitStack)
      const visitedNodes = []

      console.log(visitedNodes)
      console.log('Checking node', start.name)
  
      while (toVisitStack.length) {
        let currPerson = toVisitStack.pop()
        visitedNodes.push(currPerson.name)
        // console.log(currPerson.name)
  
        for (let neighbor of currPerson.adjacent) {
          if (!seen.has(neighbor)) {
            console.log('Checking node', neighbor.name)
            seen.add(neighbor)
            toVisitStack.push(neighbor)
            // visitedNodes.push(neighbor.name)
            // console.log(neighbor.name)
          }
        }
      }
      return visitedNodes
    }
  
    // this function returns an array of Node values using BFS
    breadthFirstSearch(start) {
      const toVisitQueue = [start]
      const seen = new Set(toVisitQueue)
      const visitedNodes = [start.value]
  
      while (toVisitQueue.length) {
        let currPerson = toVisitQueue.shift()
  
        for (let neighbor of currPerson.adjacent) {
          if (!seen.has(neighbor)) {
            seen.add(neighbor)
            toVisitQueue.push(neighbor)
            visitedNodes.push(neighbor.value)
          }
        }
      }
      return visitedNodes
    }
  }

let graph = new Graph();
let S = new Node("S");
let P = new Node("P");
let X = new Node("X");
let U = new Node("U");
let Q = new Node("Q");
let Y = new Node("Y");
let V = new Node("V");
let R = new Node("R");
let W = new Node("W");
let T = new Node("T");

graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);

console.log("DFS:", graph.depthFirstSearch(S))