**User creates new note on traditional page**

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Server

    User->>Browser: Fill the form and click 'Save' button

    Browser->>Browser: Starts executing the JavaScript code that rerenders note list inside

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note right of Browser: The Browseronly new note to the server

    activate Server
    Server-->>Browser: Response with 201 code.
    deactivate Server

    Browser->>User: Shows the rerendered page
```