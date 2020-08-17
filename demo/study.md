# Study

## BFC概念（块级格式化上下文）

### 触发BFC
    
+ body根元素
+ 浮动元素
+ 绝对定位元素： position（absolute, fixed）
+ display 为inline-block、table-cells、flex
+ overflow除了visible以外的值（hidden, auto， scroll）

### BFC特性及应用
+ 同一个 BFC 下外边距会发生折叠
+ BFC 可以包含浮动的元素（清除浮动）
+ BFC 可以阻止元素被浮动元素覆盖