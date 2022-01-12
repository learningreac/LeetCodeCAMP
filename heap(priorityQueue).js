// 动态建堆
//当 heap 数组长度不够 k 时，新数从数组末尾推入，执行“上浮”，交换到它合适的位置。
    // 新元素的idx如果是偶数，说明它是右侧Node, 其父节点的坐标是 (idx -2)/2;
//当 heap 数组长度够 k 时，如果新数字比栈顶大，用它替换堆顶，执行“下沉”，交换到合适的位置。




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
    heap = mapKeys.slice(0, k);
    _buildHeap(heap, k);

    // from the k+1 th num, add one by one
    for (let i = k; i < mapKeys.length; i++) {
        if (map.get(heap[0]) < map.get(mapKeys[i])) {
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
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;

        if (left < heapsize && map.get(items[left]) < map.get(items[min])) {
            min = left;
        };
        if (right < heapsize && map.get(items[right]) < map.get(items[min])) {
            min = right;
        };

        if (min !== idx) { // 说明调整了
            [items[min], items[idx]] = [items[idx], items[min]];
            // 把最小的项目交换到根节点，但是Min这个Index本身没有变
            _minHeapify(min, items, heapsize);
        };
    };
};



//剑指 Offer 40. 最小的k个数
// solution 大顶堆，K-Size;
// 新元素如果比堆顶元素小，入堆，重新堆化； 新元素如果比堆顶元素大，跳过。

const getLeastNumbers = function (arr, k) {
    let heap = [...arr.slice(0, k)];

    _buildMaxHeap(heap, k);
    for (let i = k; i < arr.length; i++) {
        if (arr[i] < heap[0]) {
            heap[0] = arr[i];
            _maxHeapify(heap, 0, k)
        }
    };

    return heap;

    function _buildMaxHeap(nums, heapsize) {
        let i = Math.floor(nums.length / 2) - 1;
        for (i; i >= 0; i--) {
            _maxHeapify(nums, i, heapsize);
        };
    };

    function _maxHeapify(array, index, size) {
        let max = index;
        let left = 2 * index + 1;
        let right = 2 * index + 2;

        if (left < size && array[left] > array[max]) {
            max = left;
        };
        if (right < size && array[right] > array[max]) {
            max = right;
        };

        if (max !== index) {
            [array[index], array[max]] = [array[max], array[index]];
            _maxHeapify(array, max, size);
        }
    }
};


//剑指 Offer II 059. 数据流的第 K 大数值

// 问题： 1. 当刚开始元素数量 < k时，该怎么处理？
    // 2. 当遇到相同元素时怎么办？

class KthLargest {
    constructor(k, nums) {
        this.heapSize = k;
        this.heap = [];
        //this.heap = [...nums.slice(0, k)];
        if(nums.length) {
            nums.forEach(num => this.add(num));
        };
    };

  //  _buildMinHeap(arr, heapSize) {
  //      for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
  //          this._heapifyDown(i, arr, heapSize);
  //      };
  //  };

    _heapifyDown(index, arr, heapSize) {
        let min = index;
        let left = 2 * index + 1;
        let right = 2 * index + 2;

        if (left < heapSize && arr[left] < arr[min]) {
            min = left;
        };
        if (right < heapSize && arr[right] < arr[min]) {
            min = right;
        };

        if (min !== index) {
            [arr[min], arr[index]] = [arr[index], arr[min]];
            this._heapifyDown(min, arr, heapSize);
        }
    };

    _bubbleUp(idx, heap) { 
        if(idx < 1) return;
        let root = (idx%2 === 0)? (idx-2)/2 : (idx-1)/2;    // 偶数节点-2； 奇数节点 -1；
        if(heap[root] > heap[idx]) {
            [heap[root], heap[idx]] = [heap[idx], heap[root]]; 
        };
      this._bubbleUp(root, heap); 
    };
}



/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    if (this.heap.length < this.heapSize) {
        // 新元素Push到heap末尾，上浮
        this.heap.push(val);
        let idx = this.heap.length -1;
        this._bubbleUp(idx, this.heap);
    } else {
        // 下沉
        if (this.heap[0] < val) {
            this.heap[0] = val;
            this._heapifyDown(0, this.heap, this.heapSize);
        }
    }

    return this.heap[0];
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

const myobj = new KthLargest(3, [4, 5, 8, 2]);