// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: [1], //引号类型 `` "" ''
    'space-before-function-paren': [0], //函数定义时括号前面要不要有空格
    semi: [1, 'always'], //语句强制分号结尾
    'comma-dangle': [1, 'never'], //对象字面量项尾不能有逗号
    indent: [0], //缩进风格,
    'one-var': 0 // 连续声明
  }
}
