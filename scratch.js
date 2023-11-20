// Adjacency matrix
const graph = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
]

console.log(graph[0][1])

class SimpleMap {
    constructor() {
        this._items = []
    }

    set(k, v) {
        this._items.push([k, v])
    }

    get(k) {
        let kv = this._items.find(kv => k === kv[0])
        return kv ? kv[1] : undefined
    }

    has(k) {
        return this._items.find(kv => k === kv[0]) !== undefined
    }

    delete(k) {
        let i = this._items.findItem(kv => k === kv[0])
        if (i !== -1) this._items.splice(i, 1)
    }

    keys() { return this._items.map(kv => kv[0])}
    values() { return this._items.map(kv => kv[1])}
    entries() { return this._items}
}

const newMap = new SimpleMap()

newMap.set("foo", "foo")
newMap.set("bar", "bar")
newMap.set("baz", "baz")

console.log(newMap.get("bar"))
console.log(newMap.has("baz"))


class HashMap {
    constructor() {
        this._items = []
    }
    hash(key) {
        return Array.from(key).reduce(
            (accum, char) => accum + char.charCodeAt(), 0)
    }
    set(k, v) {
        const hashedKey = this.hash(k)
        this._items[hashedKey] = v
    }
    get(k) {
        const hashedKey = this.hash(k)
        return this._items[hashedKey]
    }
}

const fruit = new HashMap()
fruit.set("apple", "red")
fruit.set("grape", "purple")
fruit.set("lime", "green")

console.log(fruit.get("orange"))