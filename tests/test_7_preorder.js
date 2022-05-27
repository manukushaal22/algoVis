function preorder(root, node)
{
    if (node == null)
    {
        return;
    }

    var nodeStack = [];
    nodeStack.push(root);
    while (nodeStack.length > 0)
    {
        var mynode = nodeStack[nodeStack.length - 1];
        mynode.setNodeColor("green")
        mynode.unSetNodeColor()
        nodeStack.pop();
        if (mynode.getRightChild() != null)
        {
            nodeStack.push(mynode.getRightChild());
        }
        if (mynode.getLeftChild() != null)
        {
            nodeStack.push(mynode.getLeftChild());
        }
    }
}

let root = new GraphNode(1,6, 400, 100)
let left = root.addLeftChild(4,2,"");
let right = root.addRightChild(5,7, "");
right.addRightChild(6,8, "");
left.addRightChild(7,9, "");

function insert(curr, val){
    while(curr.getLeftChild() || curr.getRightChild()) {
        if(val > curr.val)
            curr = curr.getRightChild();
        else
            curr = curr.getLeftChild();
    }
    if(val > curr.val)
        curr.addRightChild(1, val);
    else
        curr.addLeftChild(2, val);
}



insert(root, 4)

preorder(root,root)
