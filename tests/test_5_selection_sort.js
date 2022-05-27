function selectionSort(arrr,  n)
{
    let i, j, min_idx;
    let mins = []
    let arr = arrr.getList()
    console.log(arr)
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        min_idx = i;
        for (j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        var temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
        mins.push([i, min_idx])
    }
    console.log(arr)
    for(const a of mins)
        arrr.swapIndices(a[0], a[1])
}
let ar = new ArrayBox(100,100,5,5,true, false)
for(let i=100; i>0;i--)
    ar.pushEnd(i)
selectionSort(ar,100)