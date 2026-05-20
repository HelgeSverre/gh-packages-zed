# Unity Snippets for Zed

A comprehensive collection of Unity C# snippets for the [Zed editor](https://zed.dev), designed to accelerate Unity game development with quick access to commonly used Unity classes, methods, and patterns.

> **Inspired by** [VSCode Unity Code Snippets](https://github.com/kleber-swf/vscode-unity-code-snippets) by Kleber Silva

## Features

This extension provides **100+ code snippets** covering:

### Core Unity Classes
- **MonoBehaviour** - Complete class template with using statements
- **ScriptableObject** - Class template with CreateAssetMenu attribute
- **StateMachineBehaviour** - Animator state machine behavior template
- **NetworkBehaviour** - Unity networking class template

### Unity Editor Extensions
- **Editor** - Custom inspector editor template
- **EditorWindow** - Custom editor window template
- **PropertyDrawer** - Custom property drawer template
- **ScriptableWizard** - Custom wizard template
- **Editor with Reorderable List** - Advanced editor with reorderable list support

### MonoBehaviour Lifecycle Methods
Complete coverage of all Unity MonoBehaviour callback methods:
- Core lifecycle: `Awake`, `Start`, `Update`, `FixedUpdate`, `LateUpdate`
- Object lifecycle: `OnEnable`, `OnDisable`, `OnDestroy`, `OnValidate`, `Reset`
- Collision detection: `OnCollisionEnter`, `OnCollisionStay`, `OnCollisionExit` (2D variants included)
- Trigger detection: `OnTriggerEnter`, `OnTriggerStay`, `OnTriggerExit` (2D variants included)
- Mouse events: `OnMouseDown`, `OnMouseUp`, `OnMouseEnter`, `OnMouseExit`, etc.
- Rendering: `OnPreRender`, `OnPostRender`, `OnRenderObject`, `OnDrawGizmos`, etc.
- Animation: `OnAnimatorIK`, `OnAnimatorMove`
- Physics: `OnJointBreak`, `OnControllerColliderHit`, `OnParticleCollision`
- Networking: `OnPlayerConnected`, `OnPlayerDisconnected`, `OnServerInitialized`
- And many more...

### StateMachineBehaviour Methods
- `OnStateEnter`, `OnStateExit`, `OnStateUpdate`, `OnStateMove`, `OnStateIK`

### Editor Window Methods
- `OnFocus`, `OnLostFocus`, `OnSelectionChange`, `OnProjectChange`, `OnInspectorUpdate`

### Debug Utilities
- `Debug.Log`, `Debug.LogError`, `Debug.LogWarning`, `Debug.LogException`
- Formatted logging: `Debug.LogFormat`, `Debug.LogErrorFormat`, `Debug.LogWarningFormat`
- Visual debugging: `Debug.DrawLine`, `Debug.DrawRay`

### Common Attributes
- `[SerializeField]` - For private field serialization
- `[RequireComponent]` - Component dependency enforcement

### General C# Templates
- Generic class template
- Interface template

## Installation

1. Open Zed editor
2. Open the command palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)
3. Type "zed: extensions" and select it
4. Search for "Unity Snippets"
5. Click "Install"

## Usage

Simply start typing any of the snippet prefixes in a C# file and press `Tab` to expand the snippet. The snippets are context-aware and will work best in `.cs` files.

### Examples

Type `MonoBehaviour` and press `Tab`:
```csharp
using UnityEngine;

public class YourClassName : MonoBehaviour {
    
}
```

Type `Start` and press `Tab`:
```csharp
private void Start() {
    
}
```

Type `OnTriggerEnter` and press `Tab`:
```csharp
private void OnTriggerEnter(Collider other) {
    
}
```

Type `Debug.Log` and press `Tab`:
```csharp
Debug.Log();
```

## Snippet Prefixes

All snippets use intuitive prefixes that match Unity's naming conventions:

- **Classes**: `MonoBehaviour`, `ScriptableObject`, `StateMachineBehaviour`, etc.
- **Methods**: `Start`, `Update`, `OnTriggerEnter`, `OnCollisionEnter`, etc.
- **Debug**: `Debug.Log`, `Debug.LogError`, `Debug.DrawLine`, etc.
- **Attributes**: `SerializeField`, `RequireComponent`

## Contributing

Contributions are welcome! If you have suggestions for additional snippets or improvements, please:

1. Fork the repository
2. Create a feature branch
3. Add your snippets to `snippets/csharp.json`
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 0.0.1
- Initial release with 100+ Unity C# snippets
- Complete MonoBehaviour lifecycle methods
- Unity Editor extension templates
- Debug utilities
- Common attributes and general C# templates

## Support

If you encounter any issues or have feature requests, please [open an issue](https://github.com/abdallah-alwarawreh/unity-zed-snippets/issues) on GitHub.
