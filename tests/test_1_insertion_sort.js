function insertionSort(V, N) {
    let i, j, key;

    for (i = 1; i < N; i++) {
        j = i;

        // Insert V[i] into list 0..i-1
        while (j > 0 && V.getVal(j) < V.getVal(j - 1)) {

            // Swap V[j] and V[j-1]
            V.swapIndices(j, j-1)
            // let temp = V[j];
            // V[j] = V[j - 1];
            // V[j - 1] = temp;
            // Decrement j by 1
            j -= 1;
        }
    }
}

let a = new ArrayBox(100,100,20,20,true)
for(let i=10; i>0;i--)
    a.pushEnd(i)

insertionSort(a, 10)