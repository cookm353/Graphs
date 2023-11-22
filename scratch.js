class Node {
    constructor(name) {
        this.name = name
        this.adjacent = []
    }
    addEdge(...names) {
        for (let name of names) {
            this.adjacent.push(name)
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

console.log(friendGraph.areConnectedBFS(marge, grampa))
console.log(friendGraph.areConnectedBFS(marge, moe))
console.log(friendGraph.areConnectedIterativeDFS(marge,grampa))
console.log(friendGraph.areConnectedIterativeDFS(marge, moe))