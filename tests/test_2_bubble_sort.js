function bubbleSort( arr, n)
{
    var i, j;
    for (i = 0; i < n-1; i++)
    {
        for (j = 0; j < n-i-1; j++)
        {
            if (arr.getVal(j) > arr.getVal(j+1))
            {
                arr.swapIndices(j,j+1);

            }
        }

    }
}

let a = new ArrayBox(50,50,10,10,true, false)
for(let i=50; i>0;i--)
    a.pushEnd(i)

bubbleSort(a, 50)