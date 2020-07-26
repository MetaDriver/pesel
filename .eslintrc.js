module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // следующие два правила отключены.
    // на что есть веские основания, см. следующие комментарии
    'comma-dangle': 'off',
    // висящие запятые в литералах (и даже параметрах функций) являются фичей JS, а не багом.
    // см. https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Trailing_commas
    // они позволяют быстрее и единообразнее писать код, и сильно упрощают
    // автогенерацию кода (при необходимости).
    // линтер, по хорошему, должен их не запрещать, а скорее рекомендовать.
    semi: 'off',
    // пропуск точек с запятой в конце операторов во многих случаях (не во всех)
    // допустим (т.е. не приводит к рантайм ошибкам), но никогда не был и, думаю,
    // не будет официально рекомендованным ES синтаксисом. Поскольку он попросту
    // замедляет парсер JS движка (требует "заглядывания вперёд" при синтаксическом
    // анализе кода, чтобы убедится что оператор завершён)
    // в частности для экспортов/импортов официально рекомендованный
    // синтаксис можно посмотреть здесь:
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/import
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/export
  }
}
