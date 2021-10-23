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

  static fromRGB(r: number, g: number, b: number): Color {
    return new Color(r, g, b);
  }

  static fromHex(hex: string): Color {
    // Remove # if present at start
    if (hex.charAt(0) == '#')
      hex = hex.substr(1, hex.length - 1);
    return new Color(
      parseInt(hex.substr(0, 2), 16),
      parseInt(hex.substr(2, 2), 16),
      parseInt(hex.substr(4, 2), 16));
  }
}