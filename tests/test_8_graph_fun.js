let root  = new GraphNode(1,1,300,300)
let x = 2
for(let i = 250; i<400; i+=50){
    for(let j = 250; j<400; j+=50){
        if(i!==300 || j!==300){
            root.addChild(x, x, "", i, j)
            x+=1
        }
    }
}
let root2  = new GraphNode(2,2,420,500)
root2.addEdge(root)