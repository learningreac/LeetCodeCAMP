//215. 数组中的第K个最大元素

const findKthLargest = (nums, k) => {
    let heap = [];

    // k-size min Heap
    for (let i = 0; i < k; i++) {
        heap.push(nums[i]);
    };
    buildMinHeap(heap, k);

    // 从第kth遍历数组，若元素大于堆顶，替换堆顶元素并继续堆化
    for (let i = k; i < nums.length; i++) {
        if (heap[0] < nums[i]) {
            heap[0] = nums[i];
            minHeapify(heap, 0, k);
        }
    }

    return heap[0];
};

// 这里的nums是传入的新参数，不是最outer函数的nums. 这里指的是新建的数组heap.
function buildMinHeap(nums, heapSize) {
    for (let i = (Math.floor(nums.length / 2) - 1); i >= 0; i--) {
        minHeapify(nums, i, heapSize);
    }
}
function minHeapify(nums, i, heapSize) {
    let left = i * 2 + 1;
    let right = i * 2 + 2;
    let min = i;

    if (left < heapSize && nums[left] < nums[min]) {
        min = left;
    }; // compare the parent node with the left node;
    if (right < heapSize && nums[right] < nums[min]) {
        min = right; // compare the right node with the updated min node;
    };
    if (min !== i) {
        [nums[i], nums[min]] = [nums[min], nums[i]]; // swap node VALUE, INDEX WON'T CHANGE
        // update the child nodes
        minHeapify(nums, min, heapSize);
    };
}