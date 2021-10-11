# Sort

## Bubble Sort
### 空间复杂度 O(N2)
```c
int[] bubbleSort(int[] nums) {
    int N = nums.length;
    for (int i = 0; i < N - 1; i++) {
        for (int j = 0; j < N - 1 - i; j++) {
            if (nums[j] > nums[j + 1]) {
                int tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
            }
        }
    }
    return nums;
}
```

## Quick Sort
```js
function quickSort(nums, l, r) {
	if (l >= r) return
	let i = l,
		j = r
	tmp = nums[i]
	const pivot = l
	while (i < j) {
		while (arr[j] >= nums[pivot] && i < j) j--
		while (arr[i] <= nums[pivot] && i < j) i++
		tmp = nums[i]
		nums[i] = nums[j]
		nums[j] = tmp
	}
	nums[i] = nums[pivot]
	nums[pivot] = tmp
	quickSort(nums, l, i - 1)
	quickSort(nums, i + 1, r)
}

quickSort(arr, 0, arr.length - 1)
```


## Binary Search


## sort map obj
```js
    // Map obj sort
    const myMap = new Map();
    myMap.set("a", 3);
    myMap.set("c", 4);
    myMap.set("b", 1);
    myMap.set("d", 2);

    // sort by value
    const mapSort1 = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));
    console.log(mapSort1);
    // Map(4) {"c" => 4, "a" => 3, "d" => 2, "b" => 1}

    const mapSort2 = new Map([...myMap.entries()].sort((a, b) => a[1] - b[1]));
    console.log(mapSort2);
    // Map(4) {"b" => 1, "d" => 2, "a" => 3, "c" => 4}

    // sort by key
    const mapSort3 = new Map([...myMap.entries()].sort());
    console.log(mapSort3);
    // Map(4) {"a" => 3, "b" => 1, "c" => 4, "d" => 2}

    const mapSort4 = new Map([...myMap.entries()].reverse());
    console.log(mapSort4);
    // Map(4) {"d" => 2, "b" => 1, "c" => 4, "a" => 3}

```
