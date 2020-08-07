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

9. 实际上，JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖
10. 若要从服务端渲染的 HTML 中排除依赖布局 effect 的组件，可以通过使用 showChild && <Child /> 进行条件渲染，并使用 useEffect(() => { setShowChild(true); }, []) 延迟展示组件。这样，在客户端渲染完成之前，UI 就不会像之前那样显示错乱了。
11. 这是因为当我们更新一个 state 变量，我们会 替换 它的值。这和 class 中的 this.setState 不一样，后者会把更新后的字段 合并 入对象中。
如果你错过自动合并，你可以写一个自定义的 useLegacyState Hook 来合并对象 state 的更新。然而，我们推荐把 state 切分成多个 state 变量，每个变量包含的不同值会在同时发生变化。
``` javascript
    useEffect(() => {
        function handleWindowMouseMove(e) {
        // 展开 「...state」 以确保我们没有 「丢失」 width 和 height
        setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
        }
        // 注意：这是个简化版的实现
        window.addEventListener('mousemove', handleWindowMouseMove);
        return () => window.removeEventListener('mousemove', handleWindowMouseMove);
    }, []);
```
    这里说的是关于react hook中 推荐将state拆分，而不是合在一起，因为hook中的setState是替换而不是像class中的合并