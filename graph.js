class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }


  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    if (!(vertex instanceof Node)) {
      throw new Error('addVertex only accepts instances of the Node class');
    }
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      if (!(vertex instanceof Node)) {
        throw new Error('addVertices only accepts arrays containing Node instances');
      }
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (!(v1 instanceof Node) || !(v2 instanceof Node)) {
      throw new Error('addEdge only accepts instances of the Node class');
    }
  
    v1.adjacent.add(v2);
    v2.adjacent.add(v1); 
  }
  

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (!(v1 instanceof Node) || !(v2 instanceof Node)) {
      throw new Error('removeEdge only accepts instances of the Node class');
    }
  
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }
  

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (!(vertex instanceof Node)) {
      throw new Error('removeVertex only accepts instances of the Node class');
    }
  
    // 1. Remove the vertex from the graph's nodes
    this.nodes.delete(vertex);
  
    // 2. Remove references to the vertex from other nodes' adjacency lists
    for (const node of this.nodes) {
      node.adjacent.delete(vertex);
    }
  }
  
  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // DFS uses a stack (LIFO)
    const visited = new Set(); 
    const result = [];
  
    function dfs(node) {
      visited.add(node);
      result.push(node.value);
  
      for (const neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }
  
    dfs(start); 
    return result;
  }
  

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    // BFS uses a queue (FIFO)
    const visited = new Set(); 
    const result = [];
    const queue = [start]; 
  
    while (queue.length > 0) {
      const node = queue.shift(); // Dequeue
  
      if (!visited.has(node)) {
        visited.add(node);
        result.push(node.value);
  
        for (const neighbor of node.adjacent) {
          queue.push(neighbor); // Enqueue
        }
      }
    }
  
    return result;
  }
  
}

module.exports = {Graph, Node}