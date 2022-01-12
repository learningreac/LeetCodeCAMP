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
};


//347. 前 K 个高频元素
//给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
// 利用harsh table 统计每个元素出现的频率，key -> value
// heaP 还是传key 进去，但是在比较大小的时候heapify时是比较从map里get 的 value；

// top K
// solution: build a k-size min heap, the root of the heap is the smallest number.
// for the k+1 item, add seperatey to the heap by comparing this item with the root of the heap.
// if the item < root, skip this item. if the item > root, replace root with this item then conitnue heapity.
// after iterate all the items, the heap will be the Top-k.
const topKFrequent = function (nums, k) {
    let map = new Map();
    nums.forEach(element => { 
        map.has(element) ? 
                    map.set(element, map.get(element) + 1) 
                  : map.set(element, 1);   
    });

    //const heap = [...nums.slice(0, k)];
    let heap = []; // 这里不能用const 因为之后要改变这个数组的大小
    const mapKeys = Array.from(map.keys());
    heap = mapKeys.slice(0,k);
    _buildHeap(heap, k);

    // from the k+1 th num, add one by one
    for(let i=k; i<mapKeys.length; i++) {
        if(map.get(heap[0]) < map.get(mapKeys[i])) {
            heap[0] = mapKeys[i]; // 替换堆顶
            _minHeapify(0, heap, k);
        }
    }
    return heap;

    function _buildHeap(items, heapsize) {
        let i = Math.floor(items.length / 2) - 1;    // 这里还要再减1.
        for (i; i >= 0; i--) {
            _minHeapify(i, items, heapsize);
        };

    };

    function _minHeapify(idx, items, heapsize) {
        let min = idx;
        let left = 2*idx + 1;
        let right = 2*idx + 2;

        if(left < heapsize && map.get(items[left]) < map.get(items[min])) {
            min = left;
        };
        if(right < heapsize && map.get(items[right]) < map.get(items[min])) {
            min = right;
        };

        if(min !== idx) { // 说明调整了
            [items[min], items[idx]] = [items[idx], items[min]];
            // 把最小的项目交换到根节点，但是Min这个Index本身没有变
            _minHeapify(min, items, heapsize);
        };
    };
};