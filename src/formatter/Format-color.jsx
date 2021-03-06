export class ColorFormatter {
  static setBackground(status) {
    let statusColor;

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
      case "electric":
        statusColor = "#e1daa3";
        break;
      default:
        statusColor = "#79e0c8";
        break;
    }
    return statusColor;
  }
}
