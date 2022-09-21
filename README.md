# React Native RefreshControl demo

In order to make this example work, you must have data in a Firebase RTDB.

Then add a dir under the project root called `config`, and place a file `myconfig.js` in that dir. The file should read something like this:

```
export const messageRoot = "/stores/5dcb0b7882cf9600346ee79e";
```

Your Firebase data items will each look something like this:

```
  "messages": {
    "-MkgwA5ZYUR9GHEET7RX": {
      "content": {
        "text": "Hello World"
      },
      "createdAt": -1568676484242,
      "creator": {
        "_id": "5d648699b4e0f22ed95cf23e",
        "displayName": "Jean Luc",
        "email": "someone@example.com",
        "fullName": "Jean Luc Godard"
      },
      "likes": {
        "count": 0
      },
      "type": "TEXT"
    },
    ...
```


And - Don't forget to add your own `android/app/google-services.json` from Firebase.
