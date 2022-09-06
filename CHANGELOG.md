# Change Log
All notable changes to the "shebang-language-associator" extension will be documented in this file.

## [1.4.0]
- Extend support to any first-line regex.
- When matching, associations defined earlier in `shebang.associations` setting will now take priority over later ones (previously later ones would take priority).

## [1.3.0]
- Add new option `shebang.associateOnSave` (default `true`) to also check files for language associations on save. Previous versions of the extension only ran on file open.

## [1.2.0]
- Add support for zsh and scripts run by the default shell (such as golang scripts).

## [1.1.1]
- Add LICENSE file

## [1.1.0]
- Bump dependencies, add MIT license info.

## [1.0.1]
- Fix bug preventing extension from detecting shebangs correctly.

## [1.0.0]
- Initial release

[1.4.0]: https://github.com/davidhewitt/shebang-language-associator/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/davidhewitt/shebang-language-associator/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/davidhewitt/shebang-language-associator/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/davidhewitt/shebang-language-associator/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/davidhewitt/shebang-language-associator/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/davidhewitt/shebang-language-associator/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/davidhewitt/shebang-language-associator/tree/1.0.0
