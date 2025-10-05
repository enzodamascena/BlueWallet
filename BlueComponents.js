import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;
let isIpad;
if (aspectRatio > 1.6) {
  isIpad = false;
} else {
  isIpad = true;
}

export class is {
  static ipad() {
    return isIpad;
  }
}
