export class Color {
  readonly r: number = 0;
  readonly g: number = 0;
  readonly b: number = 0;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  hexString(): string {
    return "#" + this.num2Hex(this.r) + this.num2Hex(this.g) + this.num2Hex(this.b); 
  }

  rgbString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  copy(): Color {
    return new Color(this.r, this.g, this.b);
  }

  shade(light: number): Color {
    if (light < -1 || light > 1)
      throw new Error("'light' must be between -1 and 1.");
    
    var r = this.r;
    var g = this.g;
    var b = this.b;
    if (light < 0) {
        r = (1 + light) * r;
        g = (1 + light) * g;
        b = (1 + light) * b;
    } else {
        r = (1 - light) * r + light * 255;
        g = (1 - light) * g + light * 255;
        b = (1 - light) * b + light * 255;
    }

    return new Color(r, g, b);
  }

  private num2Hex(c: number): string {
    c = Math.round(c);
    if (c < 0) c = 0;
    if (c > 255) c = 255;

    var s = c.toString(16);
    if (s.length < 2) s = "0" + s;

    return s;
  }

  private static cssRGBRegex = new RegExp(/rgb\( *(\d+), *(\d+), *(\d+) *\)/);
  private static cssVarRegex = new RegExp(/var\( *(--[\w-]*) *\)/);

  static fromRGB(r: number, g: number, b: number): Color {
    return new Color(r, g, b);
  }

  static fromRGBText(rgb: string): Color | null {
    var matches: string[] | null = this.cssRGBRegex.exec(rgb);
    if (matches !== null) {
      var r: number = parseInt(matches[1]);
      var g: number = parseInt(matches[2]);
      var b: number = parseInt(matches[3]);
      if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
      return this.fromRGB(r, g, b);
    }
    return null;
  }

  static fromRGBTextOrDefault(rgb: string, defaultColor: Color = new Color(0, 0, 0)): Color {
    var result: Color | null = this.fromRGBText(rgb);
    if (result !== null)
      return result;
    return defaultColor;
  }

  static fromHex(hex: string): Color | null {
    // Remove # if present at start
    if (hex.charAt(0) == '#')
      hex = hex.substr(1, hex.length - 1);
    var r: number = parseInt(hex.substr(0, 2), 16);
    var g: number = parseInt(hex.substr(2, 2), 16);
    var b: number = parseInt(hex.substr(4, 2), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return new Color(r, g, b);
  }

  static fromHexOrDefault(hex: string, defaultColor: Color = new Color(0, 0, 0)): Color {
    var result: Color | null = this.fromHex(hex);
    if (result !== null)
      return result;
    return defaultColor;
  }

  static fromVar(cssVar: string): Color | null {
    var matches: string[] | null = this.cssVarRegex.exec(cssVar);
    if (matches !== null) {
      // Get value of the CSS variable without any white spaces
      var varValue: string = window.getComputedStyle(document.body).getPropertyValue(matches[1]).replace(/ /g,'');
      return this.fromText(varValue);
    }
    return null;
  }

  static fromText(text: string): Color | null {
    var result: Color | null = this.fromHex(text);
    if (result !== null) return result;
    result = this.fromRGBText(text);
    if (result !== null) return result;
    result = this.fromVar(text);
    return result;
  }
  
  static fromTextOrDefault(text: string, defaultColor: Color = new Color(0, 0, 0)): Color {
    var result: Color | null = this.fromText(text);
    if (result !== null)
      return result;
    return defaultColor; 
  }

  static fromVarOrDefault(text: string, defaultColor: Color = new Color(0, 0, 0)): Color {
    var result: Color | null = this.fromVar(text);
    if (result !== null)
      return result;
    return defaultColor; 
  }

  static useDarkText(backgroundColor: Color) {
    return ((backgroundColor.r*0.299 + backgroundColor.g*0.587 + backgroundColor.b*0.114) > 186);
  }

  static getTextColor(backgroundColor: Color) : Color {
    return this.useDarkText(backgroundColor) ? this.fromVarOrDefault("var(--dark)", this.Types.cyan) : this.fromVarOrDefault("var(--light)", this.Types.cyan);
  }
  
  public static Types = class {
    // CSS color names
    public static black = Color.fromHexOrDefault("#000000");
    public static silver = Color.fromHexOrDefault("#c0c0c0");
    public static gray = Color.fromHexOrDefault("#808080");
    public static white = Color.fromHexOrDefault("#ffffff");
    public static maroon = Color.fromHexOrDefault("#800000");
    public static red = Color.fromHexOrDefault("#ff0000");
    public static purple = Color.fromHexOrDefault("#800080");
    public static fuchsia = Color.fromHexOrDefault("#ff00ff");
    public static green = Color.fromHexOrDefault("#008000");
    public static lime = Color.fromHexOrDefault("#00ff00");
    public static olive = Color.fromHexOrDefault("#808000");
    public static yellow = Color.fromHexOrDefault("#ffff00");
    public static navy = Color.fromHexOrDefault("#000080");
    public static blue = Color.fromHexOrDefault("#0000ff");
    public static teal = Color.fromHexOrDefault("#008080");
    public static aqua = Color.fromHexOrDefault("#00ffff");
    public static orange = Color.fromHexOrDefault("#ffa500");
    public static aliceblue = Color.fromHexOrDefault("#f0f8ff");
    public static antiquewhite = Color.fromHexOrDefault("#faebd7");
    public static aquamarine = Color.fromHexOrDefault("#7fffd4");
    public static azure = Color.fromHexOrDefault("#f0ffff");
    public static beige = Color.fromHexOrDefault("#f5f5dc");
    public static bisque = Color.fromHexOrDefault("#ffe4c4");
    public static blanchedalmond = Color.fromHexOrDefault("#ffebcd");
    public static blueviolet = Color.fromHexOrDefault("#8a2be2");
    public static brown = Color.fromHexOrDefault("#a52a2a");
    public static burlywood = Color.fromHexOrDefault("#deb887");
    public static cadetblue = Color.fromHexOrDefault("#5f9ea0");
    public static chartreuse = Color.fromHexOrDefault("#7fff00");
    public static chocolate = Color.fromHexOrDefault("#d2691e");
    public static coral = Color.fromHexOrDefault("#ff7f50");
    public static cornflowerblue = Color.fromHexOrDefault("#6495ed");
    public static cornsilk = Color.fromHexOrDefault("#fff8dc");
    public static crimson = Color.fromHexOrDefault("#dc143c");
    public static cyan = Color.fromHexOrDefault("#00ffff");
    public static darkblue = Color.fromHexOrDefault("#00008b");
    public static darkcyan = Color.fromHexOrDefault("#008b8b");
    public static darkgoldenrod = Color.fromHexOrDefault("#b8860b");
    public static darkgray = Color.fromHexOrDefault("#a9a9a9");
    public static darkgreen = Color.fromHexOrDefault("#006400");
    public static darkgrey = Color.fromHexOrDefault("#a9a9a9");
    public static darkkhaki = Color.fromHexOrDefault("#bdb76b");
    public static darkmagenta = Color.fromHexOrDefault("#8b008b");
    public static darkolivegreen = Color.fromHexOrDefault("#556b2f");
    public static darkorange = Color.fromHexOrDefault("#ff8c00");
    public static darkorchid = Color.fromHexOrDefault("#9932cc");
    public static darkred = Color.fromHexOrDefault("#8b0000");
    public static darksalmon = Color.fromHexOrDefault("#e9967a");
    public static darkseagreen = Color.fromHexOrDefault("#8fbc8f");
    public static darkslateblue = Color.fromHexOrDefault("#483d8b");
    public static darkslategray = Color.fromHexOrDefault("#2f4f4f");
    public static darkslategrey = Color.fromHexOrDefault("#2f4f4f");
    public static darkturquoise = Color.fromHexOrDefault("#00ced1");
    public static darkviolet = Color.fromHexOrDefault("#9400d3");
    public static deeppink = Color.fromHexOrDefault("#ff1493");
    public static deepskyblue = Color.fromHexOrDefault("#00bfff");
    public static dimgray = Color.fromHexOrDefault("#696969");
    public static dimgrey = Color.fromHexOrDefault("#696969");
    public static dodgerblue = Color.fromHexOrDefault("#1e90ff");
    public static firebrick = Color.fromHexOrDefault("#b22222");
    public static floralwhite = Color.fromHexOrDefault("#fffaf0");
    public static forestgreen = Color.fromHexOrDefault("#228b22");
    public static gainsboro = Color.fromHexOrDefault("#dcdcdc");
    public static ghostwhite = Color.fromHexOrDefault("#f8f8ff");
    public static gold = Color.fromHexOrDefault("#ffd700");
    public static goldenrod = Color.fromHexOrDefault("#daa520");
    public static greenyellow = Color.fromHexOrDefault("#adff2f");
    public static grey = Color.fromHexOrDefault("#808080");
    public static honeydew = Color.fromHexOrDefault("#f0fff0");
    public static hotpink = Color.fromHexOrDefault("#ff69b4");
    public static indianred = Color.fromHexOrDefault("#cd5c5c");
    public static indigo = Color.fromHexOrDefault("#4b0082");
    public static ivory = Color.fromHexOrDefault("#fffff0");
    public static khaki = Color.fromHexOrDefault("#f0e68c");
    public static lavender = Color.fromHexOrDefault("#e6e6fa");
    public static lavenderblush = Color.fromHexOrDefault("#fff0f5");
    public static lawngreen = Color.fromHexOrDefault("#7cfc00");
    public static lemonchiffon = Color.fromHexOrDefault("#fffacd");
    public static lightblue = Color.fromHexOrDefault("#add8e6");
    public static lightcoral = Color.fromHexOrDefault("#f08080");
    public static lightcyan = Color.fromHexOrDefault("#e0ffff");
    public static lightgoldenrodyellow = Color.fromHexOrDefault("#fafad2");
    public static lightgray = Color.fromHexOrDefault("#d3d3d3");
    public static lightgreen = Color.fromHexOrDefault("#90ee90");
    public static lightgrey = Color.fromHexOrDefault("#d3d3d3");
    public static lightpink = Color.fromHexOrDefault("#ffb6c1");
    public static lightsalmon = Color.fromHexOrDefault("#ffa07a");
    public static lightseagreen = Color.fromHexOrDefault("#20b2aa");
    public static lightskyblue = Color.fromHexOrDefault("#87cefa");
    public static lightslategray = Color.fromHexOrDefault("#778899");
    public static lightslategrey = Color.fromHexOrDefault("#778899");
    public static lightsteelblue = Color.fromHexOrDefault("#b0c4de");
    public static lightyellow = Color.fromHexOrDefault("#ffffe0");
    public static limegreen = Color.fromHexOrDefault("#32cd32");
    public static linen = Color.fromHexOrDefault("#faf0e6");
    public static magenta = Color.fromHexOrDefault("#ff00ff");
    public static mediumaquamarine = Color.fromHexOrDefault("#66cdaa");
    public static mediumblue = Color.fromHexOrDefault("#0000cd");
    public static mediumorchid = Color.fromHexOrDefault("#ba55d3");
    public static mediumpurple = Color.fromHexOrDefault("#9370db");
    public static mediumseagreen = Color.fromHexOrDefault("#3cb371");
    public static mediumslateblue = Color.fromHexOrDefault("#7b68ee");
    public static mediumspringgreen = Color.fromHexOrDefault("#00fa9a");
    public static mediumturquoise = Color.fromHexOrDefault("#48d1cc");
    public static mediumvioletred = Color.fromHexOrDefault("#c71585");
    public static midnightblue = Color.fromHexOrDefault("#191970");
    public static mintcream = Color.fromHexOrDefault("#f5fffa");
    public static mistyrose = Color.fromHexOrDefault("#ffe4e1");
    public static moccasin = Color.fromHexOrDefault("#ffe4b5");
    public static navajowhite = Color.fromHexOrDefault("#ffdead");
    public static oldlace = Color.fromHexOrDefault("#fdf5e6");
    public static olivedrab = Color.fromHexOrDefault("#6b8e23");
    public static orangered = Color.fromHexOrDefault("#ff4500");
    public static orchid = Color.fromHexOrDefault("#da70d6");
    public static palegoldenrod = Color.fromHexOrDefault("#eee8aa");
    public static palegreen = Color.fromHexOrDefault("#98fb98");
    public static paleturquoise = Color.fromHexOrDefault("#afeeee");
    public static palevioletred = Color.fromHexOrDefault("#db7093");
    public static papayawhip = Color.fromHexOrDefault("#ffefd5");
    public static peachpuff = Color.fromHexOrDefault("#ffdab9");
    public static peru = Color.fromHexOrDefault("#cd853f");
    public static pink = Color.fromHexOrDefault("#ffc0cb");
    public static plum = Color.fromHexOrDefault("#dda0dd");
    public static powderblue = Color.fromHexOrDefault("#b0e0e6");
    public static rosybrown = Color.fromHexOrDefault("#bc8f8f");
    public static royalblue = Color.fromHexOrDefault("#4169e1");
    public static saddlebrown = Color.fromHexOrDefault("#8b4513");
    public static salmon = Color.fromHexOrDefault("#fa8072");
    public static sandybrown = Color.fromHexOrDefault("#f4a460");
    public static seagreen = Color.fromHexOrDefault("#2e8b57");
    public static seashell = Color.fromHexOrDefault("#fff5ee");
    public static sienna = Color.fromHexOrDefault("#a0522d");
    public static skyblue = Color.fromHexOrDefault("#87ceeb");
    public static slateblue = Color.fromHexOrDefault("#6a5acd");
    public static slategray = Color.fromHexOrDefault("#708090");
    public static slategrey = Color.fromHexOrDefault("#708090");
    public static snow = Color.fromHexOrDefault("#fffafa");
    public static springgreen = Color.fromHexOrDefault("#00ff7f");
    public static steelblue = Color.fromHexOrDefault("#4682b4");
    public static tan = Color.fromHexOrDefault("#d2b48c");
    public static thistle = Color.fromHexOrDefault("#d8bfd8");
    public static tomato = Color.fromHexOrDefault("#ff6347");
    public static turquoise = Color.fromHexOrDefault("#40e0d0");
    public static violet = Color.fromHexOrDefault("#ee82ee");
    public static wheat = Color.fromHexOrDefault("#f5deb3");
    public static whitesmoke = Color.fromHexOrDefault("#f5f5f5");
    public static yellowgreen = Color.fromHexOrDefault("#9acd32");
    public static rebeccapurple = Color.fromHexOrDefault("#663399");
  }
}