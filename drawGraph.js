//vis.js Framework is used: https://visjs.org/#gallery
let grafo = new Grafo();
let default_vertexes = ['Aguascalientes',         'Mexicali',                 'La Paz',                     'Campeche',           'Tuxtla Gutiérrez',      
                        'Chihuahua',          'Ciudad de México',            'Saltillo',                    'Colima',                 'Durango',   
                        'Toluca de Lerdo',      'Guanajuato',           'Chilpancingo de Bravo',        'Pachuca de Soto',          'Guadalajara',             
                          'Morelia',            'Cuernavaca',                 'Tepic',                     'Monterrey',                'Oaxaca',    
                      'Puebla de Zaragoza', 'Santiago de Querétaro',        'Chetumal',                 'San Luis Potosí',            'Culiacán',       
                        'Hermosillo',            'Villahermosa',          'Ciudad Victoria',       'Tlaxcala de Xicohténcatl',    'Xalapa-Enríquez',
                          'Mérida',              'Zacatecas'];

let nodes = new vis.DataSet([]);
for (let i=0; i<default_vertexes.length; i++) {
  grafo.addVertex(default_vertexes[i]);
  nodes.add({
    id: grafo.vertex_num,
    label: default_vertexes[i],
  });
}

let edges = new vis.DataSet([]);

addQuickConnection('Aguascalientes', 'Zacatecas', 110, 125, 200);
addQuickConnection('Aguascalientes', 'Zacatecas', 130, 140, 0);
addQuickConnection('Aguascalientes', 'Guadalajara', 170, 200, 320);
addQuickConnection('Aguascalientes', 'San Luis Potosí', 115, 120, 179);
addQuickConnection('Aguascalientes', 'Guanajuato', 132, 150, 200);

addQuickConnection('Guadalajara', 'Tepic', 135, 180, 210);
addQuickConnection('Guadalajara', 'Morelia', 296, 250, 367);
addQuickConnection('Guadalajara', 'Guanajuato', 213, 279, 333);
addQuickConnection('Guadalajara', 'Colima', 223, 217, 200);

addQuickConnection('Colima', 'Morelia', 395, 450, 499);

addQuickConnection('Zacatecas', 'Durango', 290, 320, 400);
addQuickConnection('Zacatecas', 'San Luis Potosí', 190, 224, 336);
addQuickConnection('Zacatecas', 'Saltillo', 340, 450, 560);

//NORTH
addQuickConnection('Mexicali', 'La Paz', 700, 847, 1000);
addQuickConnection('Mexicali', 'Hermosillo', 573, 677, 750);

addQuickConnection('Hermosillo', 'Chihuahua', 432, 543, 600);
addQuickConnection('Hermosillo', 'Culiacán', 539, 620, 1000);

addQuickConnection('Chihuahua', 'Durango', 511, 530, 600);
addQuickConnection('Chihuahua', 'Culiacán', 520, 602, 800);
addQuickConnection('Chihuahua', 'Saltillo', 564, 651, 700);

addQuickConnection('Saltillo', 'Monterrey', 113, 129, 300);
addQuickConnection('Saltillo', 'Durango', 324, 410, 490);

addQuickConnection('Monterrey', 'Ciudad Victoria', 313, 400, 411);

//SOUTH
addQuickConnection('Mérida', 'Chetumal', 320, 450, 700);

addQuickConnection('Chetumal', 'Campeche', 329, 432, 710);

addQuickConnection('Campeche', 'Villahermosa', 420, 500, 517);

addQuickConnection('Tuxtla Gutiérrez', 'Campeche', 267, 330, 400);

addQuickConnection('Oaxaca', 'Tuxtla Gutiérrez', 397, 410, 500);

addQuickConnection('Chilpancingo de Bravo', 'Oaxaca', 389, 420, 477);
addQuickConnection('Chilpancingo de Bravo', 'Morelia', 417, 470, 490);

addQuickConnection('Cuernavaca', 'Chilpancingo de Bravo', 325, 399, 420);


/**** Code for Testing Framework ****/
//grafo.addConnection('A', 'B', 10, 12, 120);

/*var nodes = new vis.DataSet([
  { id: 1, label: default_vertexes[0] },
  { id: 2, label: default_vertexes[1] },
  { id: 3, label: default_vertexes[2] },
  { id: 4, label: default_vertexes[3] },
  { id: 5, label: default_vertexes[4] },
  { id: 6, label: default_vertexes[5] },
]);*/

/*var edges = new vis.DataSet([
  { from: findId('Aguascalientes'), to: findId('Mexicali'), background: false, length: 200},
  { from: 1, to: 4, background: false },
  { from: 1, to: 5, background: true },
]);*/

//------------------->Network Object
let container = document.getElementById("graph");
let data = {
  nodes: nodes,
  edges: edges,
};
let options = {
  autoResize: true,
  height: '100%',
  width: '100%',
  edges: {
    shadow: true,
    smooth: true,
    background: {
      enabled: true,
      color: "#2E79FF",
    },
  },
};

let network = new vis.Network(container, data, options);

// FUNCTIONS HERE:
function refreshVisGraph() {
  data = {
    nodes: nodes,
    edges: edges,
  };
  network = new vis.Network(container, data, options);
}

//finds the ID of a node
function findId(searchLabel) {
  return nodes.get({
    filter: function(item) {
      return item.label == searchLabel;
    }
  })[0].id;
}

//Saves code adding vertex to HTML and 'grafo'
function addQuickVertex(vertexToAdd) {
  grafo.addVertex(vertexToAdd);
  nodes.add({
    id: grafo.vertex_num,
    label: vertexToAdd,
  });
}

//Saves code adding connection to HTML and 'grafo'
function addQuickConnection(node1, node2, cdist, ctime, ccost) {
  grafo.addConnection(node1, node2, cdist, ctime, ccost);
  let node1Id = findId(node1), node2Id = findId(node2);
  if(node1Id > node2Id) {
    const tmp = node1Id;
    node1Id = node2Id;
    node2Id = tmp;
  }
  edges.add({
    id: grafo.connection_num, from: node1Id, to: node2Id, background: false,
  });
  addConnectionInList(node1, node2, cdist, ctime, ccost);
}

/** From and to HTML Functions **/
//------------------->Add New Vertex
const txtNodeName = document.querySelector('#vertex_name');
function addNewNode() {
  if(txtNodeName.value=="") {
    alert("Por favor ingrese un nombre");
    return;
  }
  if(!grafo.vertexAlreadyExists(txtNodeName.value)) {
    addQuickVertex(txtNodeName.value);
  } else {
    alert("Ese elemento ya esta en el grafo, por favor ingrese otro");
  }
  txtNodeName.value="";
}

//------------------->Add New Connection
const txtNode1 = document.querySelector('#vertex_1'),
      txtNode2 = document.querySelector('#vertex_2'),
      txtDist = document.querySelector('#distance'),
      txtTime = document.querySelector('#time'),
      txtCost = document.querySelector('#cost');
function addNewConnection() {
  if(txtNode1.value=="" || txtNode2.value=="" || txtDist.value=="" || txtTime.value=="" || txtCost.value=="") {
    alert("Por favor complete los datos para la conexión");
    return;
  }
  addQuickConnection(txtNode1.value, txtNode2.value, txtDist.value, txtTime.value, txtCost.value);
  txtNode1.value = "";
  txtNode2.value = "";
  txtDist.value = "";
  txtTime.value = "";
  txtCost.value = "";
  //All background = false
  for(let i=1; i<=edges.length; i++) {
    edges.get(i).background = false;
  }
  modifyCurrentBestPathP("", []);
  refreshVisGraph();
}

//------------------->Add New Div in Connect
function addConnectionInList(node1, node2, cdist, ctime, ccost) {
  let dynamicListId=grafo.connection_num;
  const listConn = document.querySelector('#connections_list');
  listConn.innerHTML+=
  '<li>'+
    '<div class="connection">'+
      '<p class="insert-p">Conexión: '+node1+' - '+node2+'</p>'+
      '<span class="menu-span">Nodo 1: </span><input type="text" value="'+node1+'" id="vertex1_'+dynamicListId+'" disabled required/>'+
      '<br>'+
      '<span class="menu-span">Nodo 2: </span><input type="text" value="'+node2+'" id="vertex2_'+dynamicListId+'" disabled required/>'+
      '<br>'+
      '<span class="menu-span">Distancia en kilómetros: </span><input type="number" value="'+cdist+'" id="distance_'+dynamicListId+'" required/>'+
      '<br>'+
      '<span class="menu-span">Tiempo en minutos: </span><input type="number" value="'+ctime+'" id="time_'+dynamicListId+'" required/>'+
      '<br>'+
      '<span class="menu-span">Costo: </span><input type="number" value="'+ccost+'" id="cost_'+dynamicListId+'" required/>'+
      '<input type="submit" value="Actualizar" id="update_'+dynamicListId+'" onclick="updateQuickConnection('+dynamicListId+')"/>'+
      '<input type="submit" value="Bloquear" id="block_'+dynamicListId+'" onclick="disableQuickConnection('+dynamicListId+')"/>'+
    '</div>'+
  '</li>';
}

function updateQuickConnection(elementID) {
  const node1 = document.querySelector('#vertex1_'+elementID).value,
        node2 = document.querySelector('#vertex2_'+elementID).value,
        dist = document.querySelector('#distance_'+elementID).value,
        time = document.querySelector('#time_'+elementID).value,
        cost = document.querySelector('#cost_'+elementID).value;
  if(node1=="" || node2=="" || dist=="" || time=="" || cost=="") {
    alert("Por favor complete los datos para actualizar la conexión");
    return;
  }
  grafo.updateConnection(elementID, node1, node2, dist, time, cost);
  //All background = false
  for(let i=1; i<=edges.length; i++) {
    edges.get(i).background = false;
  }
  modifyCurrentBestPathP("", []);
  refreshVisGraph();
}

let blockedConections = [];
function disableQuickConnection(elementID) {
  const node1 = document.querySelector('#vertex1_'+elementID),
        node2 = document.querySelector('#vertex2_'+elementID),
        dist = document.querySelector('#distance_'+elementID),
        time = document.querySelector('#time_'+elementID),
        cost = document.querySelector('#cost_'+elementID),
        updateBtn = document.querySelector('#update_'+elementID),
        blockBtn = document.querySelector('#block_'+elementID);

  switch(blockBtn.value)  {
    case "Bloquear":
      grafo.deleteConnection(elementID);
      blockedConections.push(elementID);
      //After locking
      blockBtn.value = "Desbloquear";
      node1.disabled = true;
      node2.disabled = true;
      dist.disabled = true;
      time.disabled = true;
      cost.disabled = true;
      updateBtn.disabled = true;
      break;
    case "Desbloquear":
      grafo.restoreConnection(elementID);
      //After unlocking
      blockBtn.value = "Bloquear";
      node1.disabled = false;
      node2.disabled = false;
      dist.disabled = false;
      time.disabled = false;
      cost.disabled = false;
      updateBtn.disabled = false;
      break;
  }
  for(let i=1; i<=edges.length; i++) {
    edges.get(i).background = false;
  }
  modifyCurrentBestPathP("", []);
  refreshVisGraph();
}

const best_path_distance = document.querySelector('#best_path_distance'),
      best_path_time = document.querySelector('#best_path_time'),
      best_path_cost = document.querySelector('#best_path_cost'),
      current_best_path = document.querySelector('#current_best_path'),
      current_best_path_track = document.querySelector('#current_best_path_track');
function findBestPath() {
  const best_path_node1 = document.querySelector('#best_path_node1').value,
        best_path_node2 = document.querySelector('#best_path_node2').value;
  if(best_path_node1=="" || best_path_node2=="") {
    alert("Por favor complete los datos para mostrar el mejor camino");
    return;
  }
  if(!(grafo.vertexAlreadyExists(best_path_node1) && grafo.vertexAlreadyExists(best_path_node2))) {
    alert("Ingrese nodos que esten ambos en el grafo");
    return;
  }
  //All background = false
  for(let i=1; i<=edges.length; i++) {
    edges.get(i).background = false;
  }

  let result, edgePath = [], nodesPath = [], endingWeight;
  if(best_path_distance.checked) {
    let dijkstra = grafo.dijkstra(best_path_node1, best_path_node2, "distance");
    result = dijkstra[0];
    edgePath = dijkstra[1];
    nodesPath = dijkstra[2];
    endingWeight = " kilómetros";
  } else if (best_path_time.checked) {
    let dijkstra = grafo.dijkstra(best_path_node1, best_path_node2, "time");
    result = dijkstra[0];
    edgePath = dijkstra[1];
    nodesPath = dijkstra[2];
    endingWeight = " minutos";
  } else if(best_path_cost.checked) {
    let dijkstra = grafo.dijkstra(best_path_node1, best_path_node2, "cost");
    result = dijkstra[0];
    edgePath = dijkstra[1];
    nodesPath = dijkstra[2];
    endingWeight = " pesos";
  }
  if(result==Infinity) {
    alert("Los elementos no tienen una conexión que mostrar");
  } else {
    for(let i=0; i<edgePath.length; i++) {
      let from, to;
      if(edgePath[i]+1 < edgePath[i+1]+1) {
        from = edgePath[i]+1;
        to = edgePath[i+1]+1;
      } else {
        to = edgePath[i]+1;
        from = edgePath[i+1]+1;
      }
      for(let j=1; j <=edges.length; j++) {
        if(edges.get(j).from == from && edges.get(j).to == to) {
          edges.get(j).background = true;
          break;
        }
      }
    }
    modifyCurrentBestPathP(best_path_node1+" - "+best_path_node2+": "+result+endingWeight, nodesPath);
  }
  refreshVisGraph();
}

function modifyCurrentBestPathP(string, nodesPath) {
  current_best_path.textContent = string;
  current_best_path_track.textContent = "";
  if(nodesPath.length==0 || nodesPath[0]=="") {
    return;
  }
  for(let cstring of nodesPath) {
    if(cstring!="")
      current_best_path_track.textContent+= '{'+cstring+'}; ';
  }
}