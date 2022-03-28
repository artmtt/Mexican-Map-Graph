class Grafo {
    constructor() {
        this.adyaList = new Map();
        this.connectionIDList = new Map();
        this.vertexIDList = [];
    }

    addVertex(vertex) {
        if(!this.vertexAlreadyExists(vertex)) {
            this.adyaList.set(vertex, []);
            this.vertexIDList.push(vertex);
        }
    }

    addConnection(v1, v2, dist, time, cost) {
        if(!this.adyaList.has(v1) && !this.adyaList.has(v2)) {
            alert("Los elementos "+v1+" y "+v2+" no existen en el grafo");
            return;
        }
        if(!this.adyaList.has(v1)) {
            alert("El elemento "+v1+" no existe en el grafo");
            return;
        }
        if(!this.adyaList.has(v2)) {
            alert("El elemento "+v2+" no existe en el grafo");
            return;
        }

        //Se añade en ambas porque es grafo no dirigido
        this.adyaList.get(v1).push({
            connection: v2,
            dist: dist,
            time: time,
            cost: cost
        });

        this.adyaList.get(v2).push({
            connection: v1,
            dist: dist,
            time: time,
            cost: cost
        });

        this.connectionIDList.set(this.connection_num+1, {
            node1: v1,
            node2: v2,
            dist: dist,
            time: time,
            cost: cost
        });

        //No permite que existan conex. duplicadas
        /*let bool=false;
        let values = this.adyaList.get(v1);
        for(let i of values) {
            if(i.connection==v2) {
                bool=true;
                break;
            }
        }

        if(bool) {
            alert("Esa relacion ya esta en el grafo, por favor ingrese otra");
        } else {
            //Se añade en ambas porque es grafo no dirigido
            this.adyaList.get(v1).push({
                connection: v2,
                time: time,
                dist: dist,
                cost: cost
            });
            this.adyaList.get(v2).push({
                connection: v1,
                time: time,
                dist: dist,
                cost: cost
            });
        }*/
    }

    get vertex_num() {
        return this.vertexIDList.length;
    }

    get connection_num() {
        return this.connectionIDList.size;
    }

    vertexAlreadyExists(vertex) {
        if(this.adyaList.has(vertex)) {
            return true;
        }
        return false;
    }

    updateConnection(elementID, node1, node2, dist, time, cost) {
        let prevDist = this.connectionIDList.get(elementID).dist,
            prevTime = this.connectionIDList.get(elementID).time,
            prevCost = this.connectionIDList.get(elementID).cost;
        //Modify Element List
        this.connectionIDList.set(elementID, {
            node1: node1,
            node2: node2,
            dist: dist,
            time: time,
            cost: cost
        });

        //Modify adyList
        let nodesI = [];
        for(let objectI of this.adyaList.get(node1)) {
            if(node2==objectI.connection && prevDist==objectI.dist && prevTime==objectI.time && prevCost==objectI.cost) {
                objectI = {
                    connection: node2,
                    dist: dist,
                    time: time,
                    cost: cost
                }
            }
            nodesI.push(objectI);
        }
        this.adyaList.set(node1, nodesI);

        let nodesJ = [];
        for(let objectI of this.adyaList.get(node2)) {
            if(node1==objectI.connection && prevDist==objectI.dist && prevTime==objectI.time && prevCost==objectI.cost) {
                objectI = {
                    connection: node1,
                    dist: dist,
                    time: time,
                    cost: cost
                }
            }
            nodesJ.push(objectI);
        }
        this.adyaList.set(node2, nodesJ);
    }

    deleteConnection(elementID) {
        let node1 = this.connectionIDList.get(elementID).node1,
            node2 = this.connectionIDList.get(elementID).node2,
            prevDist = this.connectionIDList.get(elementID).dist,
            prevTime = this.connectionIDList.get(elementID).time,
            prevCost = this.connectionIDList.get(elementID).cost;
        
        //Modify adyList
        let nodesI = [];
        for(let objectI of this.adyaList.get(node1)) {
            if(node2!=objectI.connection || prevDist!=objectI.dist || prevTime!=objectI.time || prevCost!=objectI.cost) {
                nodesI.push(objectI);
            }
        }
        this.adyaList.set(node1, nodesI);

        let nodesJ = [];
        for(let objectI of this.adyaList.get(node2)) {
            if(node1!=objectI.connection || prevDist!=objectI.dist || prevTime!=objectI.time || prevCost!=objectI.cost) {
                nodesJ.push(objectI);
            }
        }
        this.adyaList.set(node2, nodesJ);
    }

    restoreConnection(elementID) {
        let node1 = this.connectionIDList.get(elementID).node1,
            node2 = this.connectionIDList.get(elementID).node2,
            dist = this.connectionIDList.get(elementID).dist,
            time = this.connectionIDList.get(elementID).time,
            cost = this.connectionIDList.get(elementID).cost;

        this.adyaList.get(node1).push({
            connection: node2,
            dist: dist,
            time: time,
            cost: cost
        });

        this.adyaList.get(node2).push({
            connection: node1,
            dist: dist,
            time: time,
            cost: cost
        });
    }

    dijkstra(start, end, preff_weight) {
        let startID = this.vertexIDList.indexOf(start), endID = this.vertexIDList.indexOf(end);

        let weights = []; //Same indexes as vertexIDList
        let priorityq = new PriorityQueue();
        let finished = [];
        let pathBack = [];

        //Initialize other nodes weights to Infinity and the start to 0
        for(let i=0; i<this.vertex_num; i++) {
            if(this.vertexIDList[i] != start) {
                weights[i] = Infinity;
            } else {
                weights[i] = 0;
            }
        }

        priorityq.enqueue(start, 0);
        while(priorityq.queue.length!=0) {
            let cVertex = priorityq.dequeue().element;
            finished.push(cVertex);

            //element in neighbors is connection
            let neighbors = this.adyaList.get(cVertex),
                cNewWeight = -1, cVertexID = this.vertexIDList.indexOf(cVertex);
            //For all the neighbors of the current vertex
            for(let i=0; i<neighbors.length; i++) {
                let cNeighbor = neighbors[i], cNeighborID = this.vertexIDList.indexOf(cNeighbor.connection);
                //Current neighbor hasn't been seen yet
                if(!finished.includes(cNeighbor.connection)) {
                    //Dist, Time, Cost CHANGES HERE
                    let cNeighborWeight;
                    switch(preff_weight) {
                        case "distance":
                            cNeighborWeight = cNeighbor.dist;
                            break;
                        case "time":
                            cNeighborWeight = cNeighbor.time;
                            break;
                        case "cost":
                            cNeighborWeight = cNeighbor.cost;
                            break;
                    }
                    //if they aren't converted to number, JS will take 0s as String
                    cNewWeight = Number(weights[cVertexID]) + Number(cNeighborWeight); 
                    //If its smaller update it
                    if(cNewWeight < weights[cNeighborID]) {
                        weights[cNeighborID] = cNewWeight;
                        //Add the current neighbor to analyze it later
                        priorityq.enqueue(cNeighbor.connection, weights[cNeighborID]);
                        //Add the ID of the current vertex to pathBack[cNeighborID], cNeighborID is used as index because with
                        //that approach we can create a relation between the current Neighbor and the Vertex in which we are iterating over its neighbors
                        //In simple words we know from where we saw that node, relating them by IDs
                        pathBack[cNeighborID] = cVertexID;
                    }
                }
            }
        }
        //Testing
        // for(let i=0; i<weights.length; i++) {
        //     console.log(start+" - "+this.vertexIDList[i]+": "+weights[i]);
        // }
        // console.log(pathBack);

        if(weights[endID]==Infinity) {
            return [Infinity, [], []];
        }

        let pathF = [], tmp = endID;
        pathF.push(tmp);
        //Find the path from the end vertex to the start
        while(tmp != startID) {
            pathF.unshift(pathBack[tmp]);
            tmp = pathBack[tmp];
        }
        //console.log('PathF: '+pathF);

        //Find the Path of each one of the nodes in PathF
        let nodePath = [];
        for(let i=0; i<pathF.length; i++) {
            let vertex1 = this.vertexIDList[pathF[i]], vertex2 = this.vertexIDList[pathF[i+1]];
            let tmpString = "", minWeight=Infinity, wExtension;
            for(let objectI of this.adyaList.get(vertex1)) {
                let currWeight;
                switch(preff_weight) {
                    case "distance":
                        wExtension = " km";
                        currWeight = objectI.dist;
                        break;
                    case "time":
                        wExtension = " min";
                        currWeight = objectI.time;
                        break;
                    case "cost":
                        wExtension = " pesos";
                        currWeight = objectI.cost;
                        break;
                }
              if(objectI.connection == vertex2 && currWeight < minWeight) {
                minWeight = currWeight;
                tmpString = vertex1+" - "+vertex2+": "+minWeight+wExtension;
              }
            }
            nodePath.push(tmpString);
        }
        //console.log(nodePath);

        let result = [weights[endID], pathF, nodePath];
        return result;
    }

}

//JS doesnt have collections like java, so i needed to create a class :(
//Minimun Priority Queue
class PriorityQueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        const newElem = new PriorityQueueElement(element, priority);
        let isMaxPriotity = true;
        for(let i=0; i<this.queue.length; i++) {
            //It needs it because there can be repeated connections in the graph E. 2 Conn of Ags - Zac
            if(element==this.queue[i].element) {
                if(priority < this.queue[i].priority)
                    this.queue[i].priority = priority;
                isMaxPriotity = false;
                break;
            } else if(newElem.priority < this.queue[i].priority) {
                this.queue.splice(i, 0, newElem);
                isMaxPriotity = false;
                break;
            }
        }
        if(isMaxPriotity) {
            this.queue.push(newElem);
        }
    }

    dequeue() {
        return this.queue.shift();
    }
}