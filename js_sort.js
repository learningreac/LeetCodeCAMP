// bubble sort 冒泡排序
//每次遍历会将当前最大的数字排到后面去
// 最后一位逐渐固定，j遍历的次数变少；

const bubbleSort = arr => {

	let result = [...arr];

	for(let i=0; i<arr.length; i++) {
		for(let j=0; j<arr.length-1-i; j++) {
			if(result[j]>result[j+1]) {
				[result[j], result[j+1]] = [result[j+1], result[j]];
			}
		}
	};

	return result;
};


// insert sort 插入排序
//类似打扑克 整理牌
//查找插入位置时，可以在已排序的部分应用二分查找，会更快

const insertSort = arr => {
	let result = [...arr];

	for(let i=0; i<result.length; i++) {
		let j=i;

		// 向前找； 当前j之后的都是待处理的，先不管
		while(result[j-1] > result[j] && j>=0) { 
			[result[j-1], result[j]] = [result[j], result[j-1]];
			j--;
		};
	};

	return result;
};



// binary search 版本
const insertSortBS = arr => {
	let result = [...arr];
	let i=0;
	let length = result.length;

	for(i; i<length; i++) {
		let left = 0;
		let right = i-1;
		let current = result[i];

		//最终left就是目标位置
		while(left <= right) {
			let mid = Math.floor((left+right)/2);
			if(current < result[mid]) {
				right = mid-1;
			} else {
				left = mid +1;
			}
		};

		//将目标位置后面的元素全部后移一个，位置让出来
		for(let j=i-1; j>=left;j--) {
			result[j+1] = result[j]; // j+1 就是第I位，该值已经保存在current里
		};

		// 最后将当前值插入到正确的位置
		result[left] = current;
	};

	return result;

};


// QuickSort 

const quickSort = arr => {
	let res = [...arr];

	for(let i=0; i<res.length; i++) {
		let pivot = i;
		let pre = i+1;

		for(let j=i+1; j<res.length;j++){
			if(res[j]>res[pivot]) { 
				pre++;
			} else { // 比pivot 小， swap pre,j // 刚开始Pre 和j指针重叠
				[res[pre], res[j]] = [res[j], res[pre]];
			}
		}

		//pivot归位
		[res[pivot], res[pre]] = [res[pre], res[pivot]];
	};

	return res;
}


//mergeSort
const _mergeArrays = (a, b) => {
  const c = []

  while (a.length && b.length) {
    c.push(a[0] > b[0] ? b.shift() : a.shift())
  }

  //if we still have values, let's add them at the end of `c`
  while (a.length) {
    c.push(a.shift())
  }
  while (b.length) {
    c.push(b.shift())
  }

  return c
}

const mergeSort = (arr) => {
  if (arr.length === 1) return arr;

  const middle = Math.floor(arr.length / 2)
  const a_l = arr.slice(0, middle)
  const a_r = arr.slice(middle, arr.length)
  return _mergeArrays(mergeSort(a_l), mergeSort(a_r));
}