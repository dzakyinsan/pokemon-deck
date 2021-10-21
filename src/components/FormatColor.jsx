export class ColorFormatter {
  static setBackground(status: number) {
    let statusColor: string;

    switch (status) {
      case "water":
        statusColor = "#7acaf9";
        break;
      case "grass":
        statusColor = "#80af72";
        break;
      case "fire":
        statusColor = "#e35656";
        break;
      case "bug":
        statusColor = "#6b55b2";
        break;
      case "normal":
        statusColor = "#cfab7a";
        break;
      default:
        statusColor = "#79e0c8";
        break;
    }
    return statusColor;
  }
}
