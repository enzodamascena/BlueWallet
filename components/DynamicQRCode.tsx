import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions, LayoutAnimation, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@rneui/themed';

import { encodeUR } from '../blue_modules/ur';
import { BlueCurrentTheme } from '../components/themes';
import loc from '../loc';
import QRCodeComponent from './QRCodeComponent';
import { BlueSpacing20 } from './BlueSpacing';

const { height, width } = Dimensions.get('window');

interface DynamicQRCodeProps {
  value: string;
  capacity?: number;
  hideControls?: boolean;
}

export interface DynamicQRCodeRef {
  stopAutoMove: () => void;
  startAutoMove: () => void;
}

export const DynamicQRCode = forwardRef<DynamicQRCodeRef, DynamicQRCodeProps>(({ value, capacity = 175, hideControls = true }, ref) => {
  const qrCodeHeight = height > width ? width - 40 : width / 3;
  const qrCodeMaxHeight = 370;

  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [qrCodeHeightState] = useState(Math.min(qrCodeHeight, qrCodeMaxHeight));
  const [intervalHandler, setIntervalHandler] = useState<ReturnType<typeof setInterval> | number | null>(null);
  const [displayQRCode, setDisplayQRCode] = useState(true);
  const [hideControlsState, setHideControlsState] = useState(hideControls);

  const fragments = useRef<string[]>([]);

  useImperativeHandle(ref, () => ({
    stopAutoMove,
    startAutoMove,
  }));

  const moveToNextFragment = () => {
    setIndex(prevIndex => {
      if (prevIndex === total - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const startAutoMove = () => {
    if (!intervalHandler) {
      setIntervalHandler(setInterval(moveToNextFragment, 500));
    }
  };

  const stopAutoMove = () => {
    if (intervalHandler) {
      clearInterval(intervalHandler);
      setIntervalHandler(null);
    }
  };

  const moveToPreviousFragment = () => {
    setIndex(prevIndex => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return total - 1;
      }
    });
  };

  const onError = () => {
    console.log('Data is too large for QR Code.');
    setDisplayQRCode(false);
  };

  useEffect(() => {
    try {
      fragments.current = encodeUR(value, capacity);
      setTotal(fragments.current.length);
      setHideControlsState(hideControls);
      setDisplayQRCode(true);
      startAutoMove();
    } catch (e) {
      console.log(e);
      setDisplayQRCode(false);
      setHideControlsState(hideControls);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentFragment = fragments.current[index];

  if (!currentFragment && displayQRCode) {
    return (
      <View>
        <Text>{loc.send.dynamic_init}</Text>
      </View>
    );
  }

  return (
    <View style={animatedQRCodeStyle.container}>
      <TouchableOpacity
        accessibilityRole="button"
        testID="DynamicCode"
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setHideControlsState(prevState => !prevState);
        }}
      >
        {displayQRCode && (
          <View style={animatedQRCodeStyle.qrcodeContainer}>
            <QRCodeComponent
              isLogoRendered={false}
              value={currentFragment.toUpperCase()}
              size={qrCodeHeightState}
              isMenuAvailable={false}
              ecl="L"
              onError={onError}
            />
          </View>
        )}
      </TouchableOpacity>

      {!hideControlsState && (
        <View style={animatedQRCodeStyle.container}>
          <BlueSpacing20 />
          <View>
            <Text style={animatedQRCodeStyle.text}>{loc.formatString(loc._.of, { number: index + 1, total })}</Text>
          </View>
          <BlueSpacing20 />
          <View style={animatedQRCodeStyle.controller}>
            <TouchableOpacity
              accessibilityRole="button"
              style={[animatedQRCodeStyle.button, animatedQRCodeStyle.buttonPrev]}
              onPress={moveToPreviousFragment}
            >
              <Text style={animatedQRCodeStyle.text}>{loc.send.dynamic_prev}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              style={[animatedQRCodeStyle.button, animatedQRCodeStyle.buttonStopStart]}
              onPress={intervalHandler ? stopAutoMove : startAutoMove}
            >
              <Text style={animatedQRCodeStyle.text}>{intervalHandler ? loc.send.dynamic_stop : loc.send.dynamic_start}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              style={[animatedQRCodeStyle.button, animatedQRCodeStyle.buttonNext]}
              onPress={moveToNextFragment}
            >
              <Text style={animatedQRCodeStyle.text}>{loc.send.dynamic_next}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
});

const animatedQRCodeStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  qrcodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  controller: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    height: 45,
    paddingHorizontal: 18,
  },
  button: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
  },
  buttonPrev: {
    width: '25%',
    alignItems: 'flex-start',
  },
  buttonStopStart: {
    width: '50%',
  },
  buttonNext: {
    width: '25%',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 14,
    color: BlueCurrentTheme.colors.foregroundColor,
    fontWeight: 'bold',
  },
});
