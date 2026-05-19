# C# Snippets for Zed Editor

A collection of C# code snippets for the [Zed](https://zed.dev/) editor.

## Features

- **100+ snippets** covering various C# development scenarios
- Support for **ASP.NET Core** (MVC, Razor Pages, Minimal APIs)
- **CQRS/MediatR** patterns for clean architecture
- **Testing frameworks** (xUnit, NUnit, MSTest)
- **Mocking** with Moq
- Common **boilerplates** for classes, interfaces, controllers, and more

## Installation

### Manual Installation

1. Clone this repository
2. Go to Extensions menu in Zed
3. Click "Install Dev Extension"
4. Select the cloned folder e.g. (csharp-zed-snippets)

### Installation Through Zed

1. Go to Extensions menu in Zed
2. Search for C# Snippets
3. Install

## Usage

Type the snippet prefix and press `Tab` to expand the snippet. Use `Tab` to navigate between placeholders.

## Complete snippet collection can be found in `snippets.md`

## Snippet Categories

### General Snippets

Basic C# constructs and common patterns:

| Prefix      | Description                     |
| ----------- | ------------------------------- |
| `class`     | Create a new class              |
| `record`    | Creates a C# record declaration |
| `interface` | Create a new interface          |
| `method`    | Create a method                 |

### Boilerplate Snippets

Full file templates for common C# files:

| Prefix         | Description                        |
| -------------- | ---------------------------------- |
| `bp_class`     | Boilerplate for a new C# class     |
| `bp_interface` | Boilerplate for a new C# interface |
| `bp_struct`    | Boilerplate for a new C# struct    |

### Web / ASP.NET Core Snippets

Web development patterns for ASP.NET Core:

| Prefix       | Description                          |
| ------------ | ------------------------------------ |
| `httpget`    | Creates an HTTP GET action method    |
| `httppost`   | Creates an HTTP POST action method   |
| `httpput`    | Creates an HTTP PUT action method    |
| `httpdelete` | Creates an HTTP DELETE action method |

### CQRS/MediatR Snippets

Patterns for Command Query Responsibility Segregation with MediatR:

| Prefix                   | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `cqrs_command`           | Creates a CQRS command with MediatR IRequest     |
| `cqrs_handler`           | Creates a CQRS command handler with MediatR      |
| `cqrs_query`             | Creates a CQRS query with MediatR IRequest       |
| `cqrs_query_handler`     | Creates a CQRS query handler with MediatR        |
| `cqrs_command_validator` | Creates a FluentValidation validator for command |

### Testing Snippets

Unit testing patterns for popular frameworks:

| Prefix   | Description                                   |
| -------- | --------------------------------------------- |
| `xclass` | Basic xUnit test class with constructor setup |
| `fact`   | xUnit [Fact] test method with AAA pattern     |
| `facta`  | xUnit async [Fact] test method                |
| `theory` | xUnit [Theory] with InlineData                |

## Examples

### Creating a new API Controller

Type `bp_apicontroller` and press `Tab`:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyNamespace
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewApiController : ControllerBase
    {

    }
}
```

### Creating a CQRS Command

Type `cqrs_command` and press `Tab`:

```csharp
public class CreateEntityCommand : IRequest<int>
{
    public string Name { get; set; }
}
```

### Creating an xUnit Test

Type `fact` and press `Tab`:

```csharp
[Fact]
public void MethodName_ShouldExpectedBehavior_WhenState()
{
    // Arrange

    // Act

    // Assert

}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Project Structure

The snippets are organized in the `src/` directory by category for easier maintenance:

- `src/boilerplate.json` - Full file templates
- `src/cqrs.json` - CQRS/MediatR patterns
- `src/general.json` - Basic C# constructs
- `src/tests.json` - Testing framework snippets
- `src/web.json` - ASP.NET Core snippets

### Build Scripts

To combine all snippet files into the final `snippets/csharp.json` file used by Zed, run:

`node src/combine.js`

The `src/combine.js` script is used by these shell scripts to merge all category files into a single snippet file. Always run the combine script after making changes to any files in the `src/` directory.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## Author

Kenneth Joshua Becaro (joshuabecaro@gmail.com)

## Repository

[https://github.com/kenBinary/csharp-zed-snippets](https://github.com/kenBinary/csharp-zed-snippets)

## Feedback

If you have suggestions for new snippets or improvements, please open an issue on GitHub!
