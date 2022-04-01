class Graph {

    createNode(val)  {
        let container = document.getElementById("container")
        let dum = document.createElementNS('http://www.w3.org/2000/svg', "circle")
        dum.setAttribute("cx", "50")
        dum.setAttribute("cy", "50")
        dum.setAttribute("r", "10")
        dum.setAttribute("fill", "red")
        container.appendChild(dum);
    }
}

export default Graph