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


## Binary Search
