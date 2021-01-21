## base

- typeof
    ```javascript
        interface Person {
            name: string,
            age: number
        }

        const sem: Person = { name: 'hello', age: 30 }

        type s = typeof sem // Person
    ```