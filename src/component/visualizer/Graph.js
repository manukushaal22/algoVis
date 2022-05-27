import {Styles, Timer} from "./common";

class Graph {
    constructor(id, val, x, y) {
        this.id = id
        this.val = val
        this.x = x;
        this.y = y;
        this.children = [];
        this.parents = [];
        this.r = Styles.node_size
        let container = document.getElementById("container")
        let this_node = this;
        this.ele = this.createCircleElement(this.x, this.y, this.r, Styles.node_color)
        this.text_ele = this.createTextElement(this.x, this.y, "white", this.val)
        this.delayed(()=> {
            container.appendChild(this.ele)
            container.appendChild(this.text_ele)
        })
        let svg = this.ele
        let startX, startY, elementX, elementY, element;
        let text = this.text_ele, textX, textY;
        let parentEdges=[], childEdges=[];
        let parents = this.parents, children = this.children;

        svg.addEventListener('mousedown', e => {
            const className = e.target.getAttribute( 'class');
            if (className.indexOf('draggable') >= 0) {
                startX = e.offsetX;
                startY = e.offsetY;
                element = e.target;
                elementX = +element.getAttribute( 'cx');
                elementY = +element.getAttribute('cy');
                textX = +text.getAttribute( 'x');
                textY = +text.getAttribute('y');
                for (const parent of parents) {
                    parentEdges.push({
                        edge: parent.edge,
                        edge_label: parent.edge_label,
                        x: +parent.edge.getAttribute( 'x2'),
                        y: +parent.edge.getAttribute( 'y2')
                    })
                }
                for (const child of children) {
                    childEdges.push({
                        edge: child.edge,
                        edge_label: child.edge_label,
                        x: +child.edge.getAttribute( 'x1'),
                        y: +child.edge.getAttribute( 'y1')
                    })
                }
                svg.addEventListener('mousemove', onMouseMove);
            }
        });
        let onMouseMove = e => {
            let x_change = e.offsetX - startX;
            let y_change = e.offsetY - startY;
            if (x_change * x_change + y_change * y_change > 100) {
                let newEleX = elementX + x_change, newEleY = elementY + y_change
                element.setAttribute('cx', newEleX);
                element.setAttribute('cy', newEleY);
                text.setAttribute('x', textX + x_change)
                text.setAttribute('y', textY + y_change)
                for (const parent of parentEdges) {
                    let x2 = newEleX;
                    if(x2 < parent.x){
                        x2 += this_node.r/1
                    } else if(x2 > parent.x){
                        x2 -= this_node.r/1
                    }
                    let y2 = newEleY;
                    if(y2 < parent.y){
                        y2 += this_node.r/1
                    } else if(y2 > parent.y){
                        y2 -= this_node.r/1
                    }
                    parent.edge.setAttribute('x2', x2);
                    parent.edge.setAttribute('y2', y2);
                    parent.edge_label.setAttribute('x', ((+parent.edge.getAttribute('x1'))+x2)/2)
                    parent.edge_label.setAttribute('y', ((+parent.edge.getAttribute('y1'))+y2)/2)
                }
                for (const child of childEdges) {
                    let x1 = child.x + x_change
                    let y1 = child.y + y_change
                    child.edge.setAttribute('x1', x1);
                    child.edge.setAttribute('y1', y1);
                    child.edge_label.setAttribute('x', ((+child.edge.getAttribute('x2'))+x1)/2)
                    child.edge_label.setAttribute('y', ((+child.edge.getAttribute('y2'))+y1)/2)
                }
            }
        };
        svg.addEventListener('mouseup', e => {
            svg.removeEventListener('mousemove', onMouseMove);
        });
    }

    delayed(fun){
        setTimeout(fun, Timer.timer)
        Timer.timer += Timer.unit
    }

    setNodeColor(color) {
        this.delayed(()=>{
            this.ele.setAttribute("fill", color);
        })
    }

    unSetNodeColor(color) {
        this.delayed(()=>{
            this.ele.setAttribute("fill", Styles.node_color);
        })
    }

    createCircleElement(cx, cy, r, color) {
        let ele = document.createElementNS('http://www.w3.org/2000/svg', "circle")
        ele.setAttribute("cx", cx.toString())
        ele.setAttribute("cy", cy.toString())
        ele.setAttribute("r", r.toString())
        ele.setAttribute("fill", color)
        ele.setAttribute("class", "draggable")
        return ele
    }

    createTextElement(cx, cy, color, text) {
        let ele2 = document.createElementNS('http://www.w3.org/2000/svg', "text")
        ele2.setAttribute("x", cx.toString())
        ele2.setAttribute("y", cy.toString())
        ele2.setAttribute("fill", color)
        ele2.innerHTML = text.toString();
        return ele2
    }

    createLineElement(x1, y1, x2, y2, head=true) {
        let edge = document.createElementNS('http://www.w3.org/2000/svg', "line");
        edge.setAttribute("x1", x1.toString());
        edge.setAttribute("y1", y1.toString());
        edge.setAttribute("x2", x2.toString());
        edge.setAttribute("y2", y2.toString());
        edge.setAttribute("style", "stroke:"+Styles.edge_color+";stroke-width:2");
        if(head)
            edge.setAttribute("marker-end", "url(#arrow)")
        return edge;
    }

    fetchChildObject(node_id) {
        let node = null;
        if(typeof node_id === "number") {
            node = this.getChild(node_id)
            if(node === null) {
                throw new Error("Child with given id doesn't Exist")
            }
        }
        return node
    }

    getEdgeEnds(n1, n2){
        let x2 = n2.x;
        if(x2 < n1.x){
            x2 += n2.r/1
        } else if(x2 > n1.x){
            x2 -= n2.r/1
        } 
        let x1 = n1.x;
        if(x1 < n2.x){
            x1 += n1.r/1.4
        } else if(x1 > n2.x){
            x1 -= n1.r/1.4
        }
        let y2 = n2.y;
        let old_y2 = y2
        if(y2 < n1.y){
            y2 += n2.r/1
        } else if(y2 > n1.y){
            y2 -= n2.r/1
        }
        let y1 = n1.y;
        if(y1 < n2.y){
            y1 += n1.r/1.4
        } else if(y1 > n2.y){
            y1 -= n1.r/1.4
        }
        if(x1 === x2){
            y2 = old_y2 - n2.r/0.7
        }
        return {x1:x1, y1:y1, x2:x2, y2:y2}
    }

    addEdge(node, label=""){
        let container = document.getElementById("container")
        if(this.id === node.id){
            let self_child = this.children.filter((e) => e.self)
            let edge_labels, self_edge;
            if(self_child.length > 0){
                self_child = self_child[0]
                self_edge = self_child.edge
                self_child.edge_labels.push(label)
                edge_labels = self_child.edge_labels
            } else {
                self_edge = this.createLineElement(this.x-this.r, this.y-this.r, this.x+this.r, this.y-this.r, false)
                edge_labels = [label]
                node.parents.push({
                    edge: self_edge,
                    edge_labels: edge_labels,
                    node: this,
                    self: true
                })
                this.children.push({
                    edge: self_edge,
                    edge_labels: edge_labels,
                    node: node,
                    self: true
                });
            }
            let labels = this.createTextElement(self_edge.getAttribute("x1"), self_edge.getAttribute("y1")-5, "black", edge_labels.toString())
            this.delayed(()=>{
                container.append(self_edge)
                container.append(labels)
            })
            return;
        }
        let edgeEnds = this.getEdgeEnds(this, node)
        let edge = this.createLineElement(edgeEnds.x1, edgeEnds.y1, edgeEnds.x2, edgeEnds.y2)
        let edge_label = this.createTextElement((edgeEnds.x1+edgeEnds.x2)/2,(edgeEnds.y1+edgeEnds.y2)/2,"black", label)
        node.parents.push({
            edge: edge,
            edge_label: edge_label,
            node: this
        })
        this.children.push({
            edge:edge,
            edge_label: edge_label,
            node: node
        });
        this.delayed(() => {
            container.appendChild(edge);
            container.appendChild(edge_label);
        })
        return edge;
    }

    removeEdge(child_id) {
        let child = this.fetchChildObject(child_id)
        this.delayed(()=>{
            child.edge.remove()
        })
        child.parents.filter(parent => parent.node.id !== this.id)
        this.children.filter(child => child.node.id !== child_id)
    }

    addChild(child_id, child_val, label, child_x, child_y, GraphRef = Graph) {
        let child_node = new GraphRef(child_id, child_val, child_x, child_y);
        this.addEdge(child_node, label)
        return child_node;
    }

    addLeftChild(id, val) {
        if(id===null){
            throw Error("id is null")
        }
        return this.addChild(id, val, 'L', this.x-Styles.node_padding, this.y+Styles.node_padding)
    }

    addRightChild(id, val) {
        return this.addChild(id, val, 'R', this.x+Styles.node_padding, this.y+Styles.node_padding)
    }

    getLeftChild(){
        let lChild = this.children.filter((c)=>c.edge_label.innerHTML==='L')
        if(lChild.length > 0)
            return lChild[0].node
        return null;
    }

    getRightChild(){
        let rChild = this.children.filter((c)=>c.edge_label.innerHTML==='R')
        if(rChild.length > 0)
            return rChild[0].node
        return null;
    }

    getChild(child_id){
        for (const child of this.children) {
            if(child.node.id === child_id)
                return child;
        }
        return null;
    }

    selfDestruct(){
        for (const child of this.children) {
            this.delayed(()=>{
                child.edge.remove()
                child.edge_label.remove()
            })
        }
        for (const parent of this.parents) {
            this.delayed(()=>{
                parent.edge.remove()
                parent.edge_label.remove()
            })
        }
        this.delayed(()=>{
            this.ele.remove()
            this.text_ele.remove()

        })
    }

    removeChild(child_id) {
        let child = this.fetchChildObject(child_id)
        this.delayed(()=>{
            child.edge.remove()
            child.edge_label.remove()
            this.text_ele.remove()
        })
        child.node.selfDestruct()
        this.children = this.children.filter(child => child.node.id !== child_id)
    }

    removeLeftChild(){
        this.getLeftChild().selfDestruct()
    }
    removeRightChild(){
        this.getRightChild().selfDestruct()
    }
}

class GraphDefault extends Graph {
    constructor(id, val, x = 300, y = 50) {
        super(id, val, x, y);
        this.maxChildLimit = 5
        this.padding = Styles.node_padding
    }

    addChild(child_id, child_val, label) {
        if (this.children.length === this.maxChildLimit) {
            throw new Error("Max child limit reached")
        }
        let child_y = this.y + this.padding
        let x_loc = []
        let sign = -1, pos = this.padding
        for (let i = 0; i < this.maxChildLimit - 1; i++) {
            x_loc.push(sign * pos)
            if (sign > 0)
                pos += this.padding
            sign = -sign
        }
        x_loc.push(0);
        let child_x = this.x + x_loc[this.children.length]
        return super.addChild(child_id, child_val, label, child_x, child_y, GraphDefault)
    }

}

export {Graph, GraphDefault}
