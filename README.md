# shebang-language-associator README

Have linux scripts without file extensions and atypical shebang lines which mean VSCode cannot detect your script's language correctly? Maybe Shebang Language Associator can help.

## Features

Sets the VSCode lanaguage for a given file based on regex patterns for shebang lines. Just that.


## Extension Settings

This extension only has one setting, which is the patterns to associate to given languages. For example:

```json
"shebang.associations": [
    {
        "pattern": "^#!/bin/bash$",
        "language": "shellscript"
    }
]
```

## Release Notes

See [CHANGELOG.md]
