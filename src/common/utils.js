// 3.01 防抖函数
export function debounce(func, delay) {// delay不设置值setTimeout本身也有延迟
        let timer = null;
        return function (...args) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, delay)
        }
}
