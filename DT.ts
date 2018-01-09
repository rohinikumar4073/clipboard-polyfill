const dataTypes = [
  "text/plain",
  "text/html"
];

// TODO: Dedup with main file?
var warn = (console.warn || console.log).bind(console, "[clipboard-polyfill]");
var showWarnings = true;
export function suppressDTWarnings() {
  showWarnings = false;
}

export class DT {
  private m: {[key:string]: string} = {};

  public setData(type: string, value: string): void {
    if (showWarnings && dataTypes.indexOf(type) === -1) {
      warn("Unknown data type: " + type, "Call clipboard.suppressWarnings() "+
        "to suppress this warning.");
    }

    this.m[type] = value;
  }

  public getData(type: string): string | undefined {
    return this.m[type];
  }

  // TODO: Provide an iterator consistent with DataTransfer.
  public forEach(f: (value: string, key: string) => void): void {
    for (var k in this.m) {
      f(this.m[k], k);
    }
  }
}
