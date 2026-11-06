# Heritage Themes

Colour themes drawn from the colour traditions of different cultures. 65 dark and light themes in 32 families; each family maps the named colours of one tradition to syntax roles.

This repository holds the Zed extension that [Heritage Themes](https://github.com/heritage-themes/heritage-themes) generates for each release. Report problems and make changes there.

## Install

Open the Extensions page (**zed: extensions**), search for **Heritage Themes** and install it. Choose a theme with **theme selector: toggle** (`Ctrl+K Ctrl+T`; `Cmd+K Cmd+T` on macOS). To follow the system appearance, name a theme for each appearance in your settings:

```json
{
  "theme": {
    "mode": "system",
    "dark": "Holi Night",
    "light": "Kalamkari Cotton (Light)"
  }
}
```

## Languages

Zed colours code by the Tree-sitter captures of each language's queries. A capture names the construct, not the language, so the themes colour a construct alike in every language: annotations, Rust attributes and HTML attribute names share the annotation colour, and keys in YAML, TOML and JSON take the field colour.

## Themes

| Family | Themes | Tradition |
| --- | --- | --- |
| [Ainu](https://github.com/heritage-themes/heritage-themes/tree/master/themes/ainu) | Ainu Kaparamip (Dark), Ainu Attus (Light) | The appliqué robes of the Ainu of Hokkaido: bold appliqué keywords, red method declarations at the openings, green thread strings, yellow fields and blue-violet numbers, on indigo cotton or elm-bark cloth. |
| [Aizome](https://github.com/heritage-themes/heritage-themes/tree/master/themes/aizome) | Aizome Kachi (Dark), Aizome Kamenozoki (Light) | Japanese indigo dyeing in a single hue: hierarchy by depth of dye, with sashiko-white declarations, green-leaning asagi strings and violet-leaning kon numbers. |
| [Bengal](https://github.com/heritage-themes/heritage-themes/tree/master/themes/bengal) | Bengal Baluchari (Dark), Bengal Laal Paar (Light) | Bengal's looms and Durga Puja: aparajita keywords, Baluchari-magenta strings, paddy-green methods and terracotta types, on wine-dark Baluchari silk or a white laal paar sari with a red border. |
| [Danqing](https://github.com/heritage-themes/heritage-themes/tree/master/themes/danqing) | Danqing Ink (Dark), Danqing Paper (Light) | Chinese painting pigments, led by the blue-green landscape: azurite keywords, malachite strings, cinnabar methods and gamboge types on inkstone or aged xuan paper, with Spock blocks marked like red seal stamps. |
| [Edo](https://github.com/heritage-themes/heritage-themes/tree/master/themes/edo) | Edo Cha (Dark), Edo Nezumi (Light) | The forty-eight browns and hundred greys of Edo-period dress: muted indigo keywords, brown literals, tinted-grey names, and a hidden red lining for the caret and labels. |
| [Gujarat](https://github.com/heritage-themes/heritage-themes/tree/master/themes/gujarat) | Gujarat Navratri (Dark), Gujarat Rann (Light) | Gujarat's Navratri, Rann of Kutch and patola silk: parrot-green keywords, patola-red types, turmeric methods and garba-pink strings, on a mirror-worked night or the white salt desert. |
| [Hmong](https://github.com/heritage-themes/heritage-themes/tree/master/themes/hmong) | Hmong Batik (Dark), Hmong Hemp (Light) | The batik and cross-stitch of the Hmong pleated skirt: names in the tones of indigo batik, with pink keywords, lime strings and orange numbers from the cross-stitch, on indigo or undyed hemp. |
| [Holi](https://github.com/heritage-themes/heritage-themes/tree/master/themes/holi) | Holi Night, Holi Day | The Indian festival of colours at full strength: gulabi-pink keywords, saffron strings, green types and blue methods, thrown like gulal over the ash of the Holika bonfire or over white cotton. |
| [Kalaallisuut](https://github.com/heritage-themes/heritage-themes/tree/master/themes/kalaallisuut) | Kalaallisuut Qernertoq (Dark), Kalaallisuut Qaqortoq (Light) | The West Greenlandic national dress and its colours for age and marital status: red keywords, confirmation pink strings, yellow kamik numbers, blue anorak types, green bead methods and black-and-white fields. |
| [Kalamkari](https://github.com/heritage-themes/heritage-themes/tree/master/themes/kalamkari) | Kalamkari Indigo (Dark), Kalamkari Cotton (Light) | Indian hand-painted textiles and their natural dyes, kept muted: aubergine keywords, indigo types, madder methods and myrobalan strings on a vat of indigo or unbleached cotton, outlined in iron-black ink. |
| [Kashubia](https://github.com/heritage-themes/heritage-themes/tree/master/themes/kashubia) | Kashubia Zemia (Dark), Kashubia Niebò (Light) | The seven colours of Kashubian embroidery: cornflower keywords, navy types and light-blue methods under yellow strings, green fields and red numbers, on black earth or white linen. |
| [Kerala](https://github.com/heritage-themes/heritage-themes/tree/master/themes/kerala) | Kerala Backwaters (Dark), Kerala Kasavu (Light) | Kerala's backwaters, Kathakali stage and kasavu loom: kathi-red keywords, zari-gold strings, pacha-green methods and backwater-teal types, on palm-dark water at night or off-white handloom with a gold border. |
| [Łowicz](https://github.com/heritage-themes/heritage-themes/tree/master/themes/lowicz) | Łowicz Wycinanka (Dark), Łowicz Kodra (Light) | The striped wool and layered paper cut-outs of Łowicz: orange keywords, green strings, emerald types and violet methods with yellow fields and cinnabar numbers, on a black template or a white paper strip. |
| [Maramureș](https://github.com/heritage-themes/heritage-themes/tree/master/themes/maramures) | Maramureș Zadie (Dark), Maramureș Cânepă (Light) | The striped aprons and flowered skirts of Maramureș, coloured by age: married red keywords, pumpkin-flower strings, blue numbers, dark green types, rose methods and leather-brown fields. |
| [Maya](https://github.com/heritage-themes/heritage-themes/tree/master/themes/maya) | Maya Corte (Dark), Maya Huipil (Light) | The town dress of the Guatemalan Maya read through the K'iche' colour roads: green keywords, red strings, yellow types, purple methods and indigo fields, on the jaspe corte or the white huipil. |
| [Morocco](https://github.com/heritage-themes/heritage-themes/tree/master/themes/morocco) | Morocco Majorelle (Dark), Morocco Marrakech (Dark), Morocco Zellige (Dark) | Three Moroccan walls on saturated backgrounds: Majorelle ultramarine with yellow pots, Marrakech red clay with turquoise doors, and zellige jade with saffron and cobalt tile. |
| [Mudhif](https://github.com/heritage-themes/heritage-themes/tree/master/themes/mudhif) | Mudhif Qir (Dark), Mudhif Qasab (Light) | The reed guest house of the Marsh Arabs of Iraq: hierarchy from the tone and weight of reed gold, with green reed shoots for strings and the willow fire for numbers. |
| [Mughal](https://github.com/heritage-themes/heritage-themes/tree/master/themes/mughal) | Mughal Night, Mughal Wasli (Light) | Mughal miniature painting: lapis-lazuli keywords, vermilion types, gold-leaf methods and verdigris strings on a lamp-lit night or burnished wasli paper, with Spock labels lettered in gold. |
| [Ndebele](https://github.com/heritage-themes/heritage-themes/tree/master/themes/ndebele) | Ndebele Nzima (Dark), Ndebele Mhlophe (Light) | The painted walls of the Ndebele homestead: keywords drawn as the black outline, with sky-blue types, green methods, yellow strings and pink fields as the flat fills, on black paint or white lime-wash. |
| [Peru](https://github.com/heritage-themes/heritage-themes/tree/master/themes/peru) | Peru Kulli (Dark), Peru Puka (Dark) | Andean natural dyes on two dyed-through grounds: q'olle-yellow keywords, ch'illka-green strings and anqas-blue types on purple corn, and ch'illka-green keywords with turquoise methods on cochineal crimson. |
| [Podhale](https://github.com/heritage-themes/heritage-themes/tree/master/themes/podhale) | Podhale Kłobuk (Dark), Podhale Sukno (Light) | The Highlander costume of Podhale: crimson keywords and navy strings from the cords of the parzenica, brass methods, green fields, blue types and coral numbers, on a black felt hat or white broadcloth. |
| [Punjab](https://github.com/heritage-themes/heritage-themes/tree/master/themes/punjab) | Punjab Phulkari (Dark), Punjab Basant (Light) | Punjab's phulkari embroidery and Basant mustard fields: golden-silk keywords, orange-silk methods, turquoise strings and saag-green types, on madder-rust khaddar or a field of flowering mustard. |
| [Rajasthan](https://github.com/heritage-themes/heritage-themes/tree/master/themes/rajasthan) | Rajasthan Blue City (Dark), Rajasthan Pink City (Light) | The colours of Rajasthan's cities and cloth: kesariya-saffron keywords, rani-pink strings, golden-sandstone types and blue-pottery methods, on the blue houses of Jodhpur by night or the pink sandstone of Jaipur by day. |
| [Sardinia](https://github.com/heritage-themes/heritage-themes/tree/master/themes/sardinia) | Sardinia Orbace (Dark), Sardinia Camisa (Light) | The traditional dress of Sardinia: saffron keywords and scarlet strings from the dyed silk and wool, indigo methods, walnut-brown fields and coral numbers, on black orbace or white linen. |
| [Shaker](https://github.com/heritage-themes/heritage-themes/tree/master/themes/shaker) | Shaker Prussian (Dark), Shaker Plaster (Light) | The paint of the Shaker villages: bold meetinghouse keywords in plaster white or Prussian blue, Shaker red strings, pumpkin methods, yellow ochre fields, chrome green types and verdigris numbers. |
| [Shuimo](https://github.com/heritage-themes/heritage-themes/tree/master/themes/shuimo) | Shuimo Night, Shuimo Day | Chinese ink-wash painting: hierarchy by ink tone and weight rather than hue, with indigo and ochre washes and a red seal as the only accents. |
| [Tamil](https://github.com/heritage-themes/heritage-themes/tree/master/themes/tamil) | Tamil Kolam (Dark), Tamil Olai (Light) | Tamil Nadu's kolam, palm-leaf manuscripts and Kanchipuram silk: peacock-neck keywords, mango strings, lac-red types and sapphire methods, on a dark granite threshold or a palm leaf. |
| [Wixárika](https://github.com/heritage-themes/heritage-themes/tree/master/themes/wixarika) | Wixárika Haramara (Dark), Wixárika Wirikuta (Light) | The yarn paintings and beadwork of the Wixárika (Huichol): the five colours of maize, with yellow keywords, blue strings, purple fields, red types and peyote-green methods, on the black of the western sea or the light of the eastern desert. |
| [Wuxing](https://github.com/heritage-themes/heritage-themes/tree/master/themes/wuxing) | Wuxing Night, Wuxing Day | Chinese colour symbolism and the Five Elements: vermilion keywords (Fire), jade strings (Wood), imperial-yellow types (Earth), and a rice-paper or indigo-ink canvas in place of stark white and black (Metal and Water). |
| [Yolŋu](https://github.com/heritage-themes/heritage-themes/tree/master/themes/yolngu) | Yolŋu Galawu (Dark), Yolŋu Gapaṉ (Light) | The ochres of Yolŋu bark painting from north-east Arnhem Land: red keywords, yellow strings, orange types, haematite fields and pink numbers, with white or charcoal methods, on stringybark or white clay. |
| [Zalipie](https://github.com/heritage-themes/heritage-themes/tree/master/themes/zalipie) | Zalipie Sadza (Dark), Zalipie Wapno (Light) | The painted cottages of Zalipie: lime, soot and clay for text, keywords and comments, and the flowers for names, with rose methods, leaf-green strings and violet types, on a soot plinth or a lime-washed wall. |
| [Złotnica](https://github.com/heritage-themes/heritage-themes/tree/master/themes/zlotnica) | Złotnica Aksamit (Dark), Złotnica Płótno (Light) | The gold-and-silver embroidered bonnets of Kashubia: hierarchy by metal, tone and weight, with sapphire, burgundy and emerald velvet as the only colours, on green velvet or white linen. |

Each family's page describes its colour tradition. The same themes are available for JetBrains IDEs, VS Code, Visual Studio, Sublime Text, Neovim, Notepad++, Xcode, Helix, Kakoune, Micro, Vim, Emacs, Nano, Textadept, Lapce, Qt Creator, Amp, Eclipse, Nova and terminals: see [Heritage Themes on GitHub](https://github.com/heritage-themes/heritage-themes).

Report a problem or suggest a tradition on the [issue tracker](https://github.com/heritage-themes/heritage-themes/issues). Include the theme, Zed version, language and a screenshot.
