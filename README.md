**Ссылка на проект:** https://tonybnk-chat.netlify.app/

**Ссылка на PR:**

Проект представляет собой мессенджер, реализованный с использованием TypeScript,
шаблонизатора Handlebars, препроцессора SCSS и сборщика Parcel. Применён
компонентный подход.

В проекте используются следующие статические анализаторы и инструменты кода:
• Editorconfig; • ESLint (за основу взят набор Airbnb); • Stylelint.

На данном этапе в проекте реализованы следующие страницы:
• chats - Страница для отображения списка чатов, а также активного чата (при
нажатии на чат меняется окно чата); • error - Страница отображаемая при
возникновении ошибок (404 и 500); • login - Страница для логинизации
пользователя; • registration - Страница для регистрации пользователя; • profile
- Страница профиля пользователя; • index.html - Стартовая страница для
навигации.

**Реализация:**

В качестве основного блока реализован компонент Block с вспомогательным классом
EventBus.

Все шаблоны и дочерние блоки разбиты на четыре основные группы:
• base - для реализации базовых компонентов (Input, Button и т.д.); • complex -
для реализации компонентов, состоящих из нескольких базовых (Form, Chat); •
icons - для реализации компонентов-иконок (More, Arrow); • pages - для
реализации компонентов страниц целиком (Chats, Profile и т.д.).

Все страницы реализованы по принципу вставки целиком готового компонента в
пустую html страницу.

Страница error изменяется в зависимости от query параметра, переданного заранее,
при отображении index.html.

В шаблонах уровня complex и page дополнительно применяются индивидуальные стили.
В индивидуальных стилях применяются миксины для инкапсуляции схожих параметров.
Все страницы при отображении принимают рутовый стиль.

**Валидация:**

Валидация добавлена в компонент Form и работает со следующими событиями:
• blur - проверяет текущее поле на предмет ошибок, и если они есть – выводит
сообщение; • focus - скрывает сообщение об ошибке (в момент потери фокуса
проверка blur повторится); • submit - проверяет все поля на предмет ошибок, и
если они есть – выводит сообщение.

При удачной валидации обработчиком submit в консоль выводится объект с данными
формы, а сама форма зачищается.

**Работа с запросами:**

Добавлен вспомогательный класс HttpTransport для будущей работы с запросами.
