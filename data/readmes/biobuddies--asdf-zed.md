<div align="center">

# asdf-zed [![Build](https://github.com/biobuddies/asdf-zed/actions/workflows/build.yaml/badge.svg)](https://github.com/biobuddies/asdf-zed/actions/workflows/build.yaml) [![Lint](https://github.com/biobuddies/asdf-zed/actions/workflows/lint.yaml/badge.svg)](https://github.com/biobuddies/asdf-zed/actions/workflows/lint.yaml)

[zed](https://zed.dev/) plugin for the [asdf version manager](https://asdf-vm.com).
</div>

# Dependencies
-   `bash`, `curl`, `tar`, and [POSIX utilities](https://pubs.opengroup.org/onlinepubs/9699919799/idx/utilities.html).

# Install
Plugin:
```shell
asdf plugin add zed
# or
asdf plugin add zed https://github.com/biobuddies/asdf-zed.git
```

zed:
```shell
# Show all installable versions
asdf list all zed

# Install specific version
asdf install zed latest

# Set a version globally (on your ~/.tool-versions file)
asdf set --home zed latest

# Now zed commands are available
zed --help
```

Check [asdf](https://github.com/asdf-vm/asdf) readme for more instructions on how to
install and manage versions.

# Contributing
Contributions of any kind welcome! See the [contributing guide](contributing.md).

[Thanks goes to these contributors](https://github.com/biobuddies/asdf-zed/graphs/contributors)!
