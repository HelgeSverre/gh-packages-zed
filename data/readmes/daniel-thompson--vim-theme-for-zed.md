Vim theme for Zed
=================

The Vim theme adapts the default Zed theme with syntax colouring inspired by
the gvim defaults.

*Vim is old-school! Black turns off the pixel completely and white is not an
alarmingly subtle shade of gray.*

<p>
<img src="screenshots/vim-light.svg" alt="Vim Light" width="49%"/>
<img src="screenshots/vim-dark.svg" alt="Vim Dark" width="49%"/>
</p>

The differences between tree-sitter and the vim syntax highlighter mean the
code cannot look exactly the same but it's certainly enough to make gvim users
much more comfortable.

Since they cannot be exact anyway this theme does also take a few liberties.
In particular some of the most exotic (but still potentially useful)
tree-sitter styles that would appear black in gvim are mapped instead to
bright black. The difference between black and bright black is pretty subtle
on most monitors so this almost subconcious nudge doesn't stop the output
feeling like vim (to my eyes at least, your opinion may differ).

Three themes are currently provided:

* _Vim Light_ is the recommended theme for most users. The widgets and Zed
  look and feel is based on the Zed default theme. Only the editor and
  terminal panes will look different.
* _Vim Dark_ combines the default vim colour scheme for dark mode merged with
  the Zed default theme.
* _Vim Adwaita Light_ uses the same palette for the editor but Zed will be a
  better cosmetic fit for modern GNOME desktops.
* _Vim Adwaita Dark_ is a dark variant of the above.

Credits
-------

The Vim themes for Zed are derived from the following existing templates. The
Vim themes override the terminal and syntax highlight colours but the rest of
the colour scheme comes from the parent themes (see `src/build.py` for more
details):

* _Vim Light_ is derived from _One Light_ by Zed Industries
* _Vim Dark_ is derived from _One Dark_ by Zed Industries
* _Vim Adwaita Light_ is derived from _Adwaita Pastel Light_ by _Benjamin
  Davies_
* _Vim Adwaita Dark_ is derived from _Adwaita Pastel Dark_ by _Benjamin
  Davies_

License
-------

This theme combines contributions under MIT and LGPL-2.1 and, to qualify for
inclusion in the Zed extensions repository must be licensed under a narrow
set of licenses (Apache-2.0, BSD-3-Clause, GPL-3.0-only, GPL-3.0-or-later or
MIT). Given the licenses of the includes files, the work as a whole is made
available on a GPL-3.0-or-later license.

In more detail:

This program is free software: you can redistribute it and/or modify it
under the terms of the [GNU General Public License](LICENSE.md) as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.
