# Riverpod Snippets for Zed

A comprehensive collection of Riverpod snippets for Flutter development in the Zed editor. These snippets are designed to accelerate your Riverpod workflow and are only available in `.dart` files.

## Installation

### From Zed Extensions (Recommended)
1. Open Zed
2. Go to **Extensions** (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for "Riverpod Snippets"
4. Click **Install**


## Available Snippets

### Code Generation (riverpod_generator)

| Prefix | Description |
|--------|-------------|
| `riverpodPart` | Part statement for Riverpod code generation |
| `riverpod` | Basic Provider with @riverpod annotation |
| `riverpodKeepAlive` | Non-autodispose Provider with @Riverpod(keepAlive: true) |
| `riverpodFuture` | FutureProvider with @riverpod |
| `riverpodFutureKeepAlive` | Non-autodispose FutureProvider with @riverpod |
| `riverpodStream` | StreamProvider with @riverpod |
| `riverpodStreamKeepAlive` | Non-autodispose StreamProvider with @riverpod |
| `riverpodClass` | Notifier/NotifierProvider with @riverpod |
| `riverpodClassKeepAlive` | Non-autodispose Notifier/NotifierProvider with @riverpod |
| `riverpodAsyncClass` | AsyncNotifier/AsyncNotifierProvider with @riverpod |
| `riverpodAsyncClassKeepAlive` | Non-autodispose AsyncNotifier/AsyncNotifierProvider with @riverpod |
| `riverpodStreamClass` | StreamNotifier/StreamNotifierProvider with @riverpod |
| `riverpodStreamClassKeepAlive` | Non-autodispose StreamNotifier/StreamNotifierProvider with @riverpod |

### Provider

| Prefix | Description |
|--------|-------------|
| `provider` | Autodispose Provider |
| `providerKeepAlive` | Non-autodispose Provider |
| `providerFamily` | Autodispose family Provider |

### FutureProvider

| Prefix | Description |
|--------|-------------|
| `futureProvider` | Autodispose FutureProvider |
| `futureProviderKeepAlive` | Non-autodispose FutureProvider |
| `futureProviderFamily` | Autodispose family FutureProvider |

### StreamProvider

| Prefix | Description |
|--------|-------------|
| `streamProvider` | Autodispose StreamProvider |
| `streamProviderKeepAlive` | Non-autodispose StreamProvider |
| `streamProviderFamily` | Autodispose family StreamProvider |

### Notifier Classes

| Prefix | Description |
|--------|-------------|
| `notifier` | Notifier class |
| `notifierFamily` | Parametrized Notifier class |
| `asyncNotifier` | AsyncNotifier class |
| `asyncNotifierFamily` | Parametrized AsyncNotifier class |
| `streamNotifier` | StreamNotifier class |
| `streamNotifierFamily` | Parametrized StreamNotifier class |

### NotifierProvider

| Prefix | Description |
|--------|-------------|
| `notifierProvider` | Autodispose NotifierProvider |
| `notifierProviderKeepAlive` | Non-autodispose NotifierProvider |
| `notifierProviderFamily` | Autodispose family NotifierProvider |

### AsyncNotifierProvider

| Prefix | Description |
|--------|-------------|
| `asyncNotifierProvider` | Autodispose AsyncNotifierProvider |
| `asyncNotifierProviderKeepAlive` | Non-autodispose AsyncNotifierProvider |
| `asyncNotifierProviderFamily` | Autodispose family AsyncNotifierProvider |

### StreamNotifierProvider

| Prefix | Description |
|--------|-------------|
| `streamNotifierProvider` | Autodispose StreamNotifierProvider |
| `streamNotifierProviderKeepAlive` | Non-autodispose StreamNotifierProvider |
| `streamNotifierProviderFamily` | Autodispose family StreamNotifierProvider |

### Consumer Widgets

| Prefix | Description |
|--------|-------------|
| `consumer` | Consumer builder widget |
| `statelessConsumerWidget` | ConsumerWidget |
| `statefulConsumerWidget` | ConsumerStatefulWidget with State |
| `statelessHookConsumerWidget` | HookConsumerWidget (with Flutter Hooks) |
| `statefulHookConsumerWidget` | StatefulHookConsumerWidget (with Flutter Hooks) |

### Ref Methods

| Prefix | Description |
|--------|-------------|
| `listen` / `reflisten` | ref.listen() |

### Legacy (StateNotifier & StateProvider)

| Prefix | Description |
|--------|-------------|
| `stateNotifier` | StateNotifier class |
| `stateNotifierFamily` | Parametrized StateNotifier class |
| `stateNotifierProvider` | Autodispose StateNotifierProvider |
| `stateNotifierProviderKeepAlive` | Non-autodispose StateNotifierProvider |
| `stateNotifierProviderFamily` | Autodispose family StateNotifierProvider |
| `stateProvider` | Autodispose StateProvider |
| `stateProviderKeepAlive` | Non-autodispose StateProvider |
| `stateProviderFamily` | Autodispose family StateProvider |

## Usage

1. Open a `.dart` file in Zed
2. Type the snippet prefix (e.g., `riverpod`)
3. Press `Tab` to expand the snippet
4. Use `Tab` to navigate between placeholders
5. Fill in the values and press `Tab` to move to the next placeholder

## Examples

### Creating a Provider with Code Generation
Type `riverpod` and press `Tab`:

```dart
@riverpod
String myProvider(Ref ref) {
  return 'Hello World';
}
```

### Creating a Notifier with Code Generation
Type `riverpodClass` and press `Tab`:

```dart
@riverpod
class Counter extends _$Counter {
  @override
  int build() {
    return 0;
  }
}
```

### Creating a Provider (without code generation)
Type `provider` and press `Tab`:

```dart
final myProvider = Provider.autoDispose<String>((ref) {
  return 'Hello World';
});
```

### Creating a ConsumerWidget
Type `statelessConsumerWidget` and press `Tab`:

```dart
class MyWidget extends ConsumerWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container();
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.


## Related

- [Riverpod Documentation](https://riverpod.dev/)
- [Flutter Riverpod Package](https://pub.dev/packages/flutter_riverpod)
- [Zed Editor](https://zed.dev/)
- [Zed Extensions Documentation](https://zed.dev/docs/extensions)

## Acknowledgments

This extension was inspired by [Robert Brunhage's Flutter Riverpod Snippets](https://github.com/RobertBrunhage/flutter-riverpod-snippets/tree/master).