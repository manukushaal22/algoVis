function inorder(root)
{
    if (root == null)
        return;
    var s = [];
    var curr = root;
    while (curr != null || s.length > 0)
    {
        while (curr != null)
        {
            s.push(curr);
            curr = curr.getLeftChild();
        }
        curr = s.pop();
        curr.setNodeColor("green");
        curr.unSetNodeColor();
        curr = curr.getRightChild();
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

inorder(root)
