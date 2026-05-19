# Freezed Snippets for Zed

A collection of Freezed snippets for Flutter development in the Zed editor. These snippets are designed to accelerate your Freezed workflow and are only available in `.dart` files.

## Installation

### From Zed Extensions (Recommended)
1. Open Zed
2. Go to **Extensions** (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for "Riverpod Snippets"
4. Click **Install**


## Available Snippets

| Prefix | Description |
|--------|-------------|
| `freezedpart` | Creates a part statement for Freezed code generation |
| `freezeddataclass` | Creates a basic Freezed data class (no JSON serialization) |
| `freezedjsonclass` | Creates a Freezed class with JSON serialization support |
| `freezedjsonstatement` | Creates a `fromJson` factory method |
| `freezedunionclass` | Creates a Freezed union/sealed class |
| `freezedunioncase` | Adds a union case to an existing Freezed union class |
| `freezedjsonclassic` | Creates a Freezed classic class with serialization support |
| `freezeddataclassic` | Creates a Freezed Classic Class with no serialization support |



## Usage

1. Open a `.dart` file in Zed
2. Type the snippet prefix (e.g., `freezeddataclass`)
3. Press `Tab` to expand the snippet
4. Use `Tab` to navigate between placeholders
5. Fill in the values and press `Tab` to move to the next placeholder

## Examples

### Adding a Part Statement

Type `freezedpart` and press Tab:

```dart
part 'my_model.freezed.dart';
```
> part statement is required for Freezed to work properly.

### Basic Data Class

Type `freezeddataclass` and press Tab:

```dart
@freezed
abstract class User with _$User {
  const factory User({
    required String name,
    required int age,
  }) = _User;
}
```

### Data Class with JSON Serialization

Type `freezedjsonclass` and press Tab:

```dart
@freezed
abstract class Product with _$Product {
  const factory Product({
    required String id,
    required String name,
    required double price,
  }) = _Product;

  factory Product.fromJson(Map<String, dynamic> json) => _$ProductFromJson(json);
}
```

### Union/Sealed Class

Type `freezedunionclass` and press Tab:

```dart
@freezed
class Result with _$Result {
  const factory Result.success({required String data}) = Success;
  const factory Result.error({required String message}) = Error;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.


## Related

- [Flutter Freezed Package and Documentation](https://pub.dev/packages/freezed)
- [Zed Editor](https://zed.dev/)
- [Zed Extensions Documentation](https://zed.dev/docs/extensions)
