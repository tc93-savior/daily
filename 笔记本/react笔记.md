## react笔记
***

1. 类似slot的props.children
    ``` javascript
    function FancyBorder(props) {
        return (
            <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
            </div>
        );
    }
    ```
    使得别的组件可以通过jsx嵌套，将任意组件作为子组件传递给他们
    ``` javascript
    function WelcomeDialog() {
        return (
            <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
            </FancyBorder>
        );
    }
    ```

2. 少数情况下，你可能需要在一个组件中预留出几个“洞”。这种情况下，我们可以不使用 children，而是自行约定：将所需内容传入 props，并使用相应的 prop。
   ``` javascript
   function SplitPane(props) {
        return (
            <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
            </div>
        );
        }

        function App() {
        return (
            <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            } />
        );
    }
   ```

3. 与slot不同的事，vue在父组件中将替换内容编译完成再放进子组件，如果需要用子组件数据，需要使用slot-scope；react不做限制，只是将模版内容放进子中，如果需要使用父组件的内容就需要用props将父组件内容传递下来。
4. react推荐我们不去破坏焦点、焦点样式等完整用户体验，而实际过程中，当需要web技术“伪装”成小程序、app时，甚至是类似应用风格时，“outline：0”都是破坏观感的。
5. React.lazy动态加载，应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
   ``` javascript
    const OtherComponent = React.lazy(() => import('./OtherComponent'));

    function MyComponent() {
        return (
            <div>
            <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent />
            </Suspense>
            </div>
        );
    }
   ```

6. React 是如何把对 Hook 的调用和组件联系起来的？
> React 保持对当先渲染中的组件的追踪。多亏了 Hook 规范，我们得知 Hook 只会在 React 组件中被调用（或自定义 Hook —— 同样只会在 React 组件中被调用）。每个组件内部都有一个「记忆单元格」列表。它们只不过是我们用来存储一些数据的 JavaScript 对象。当你用 useState() 调用一个 Hook 的时候，它会读取当前的单元格（或在首次渲染时将其初始化），然后把指针移动到下一个。这就是多个 useState() 调用会得到各自独立的本地 state 的原因。

7. 官网说法Hook 是能让你在函数组件中“钩入” React 特性的函数. 指的是在函数组件中使用react特性的的钩子。

8. 移动端meta
   ``` html
   <meta
    name="viewport"
    content="minimum-scale=1, initial-scale=1, width=device-width"
    />
   ```