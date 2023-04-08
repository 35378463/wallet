import React, { FC, useCallback, useState } from 'react';

import * as S from './Button.style';
import { ButtonProps } from './Button.interface';
import { Loader } from '$uikit/Loader/Loader';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export const Button: FC<ButtonProps> = (props) => {
  const {
    style,
    titleFont,
    size = 'large',
    mode = 'primary',
    indent,
    children,
    before = null,
    after = null,
    onPress,
    onPressIn,
    onPressOut,
    disabled = false,
    isLoading = false,
    inverted = false,
    withoutTextPadding = false,
    withoutFixedHeight = false,
  } = props;
  const [isPressed, setPressed] = useState(false);

  const handlePressIn = useCallback(() => {
    setPressed(true);
    onPressIn?.();
  }, [onPressIn]);

  const handlePressOut = useCallback(() => {
    setPressed(false);
    onPressOut?.();
  }, [onPressOut]);

  function renderContent() {
    if (isLoading) {
      return <Loader size="medium" color="foregroundPrimary" />;
    }

    return (
      <>
        {typeof before === 'function' ? before({ isPressed }) : before}
        {!!children && (
          <S.Title
            isPressed={isPressed}
            font={titleFont}
            withoutTextPadding={withoutTextPadding}
            mode={mode}
            disabled={disabled}
            size={size}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {children}
          </S.Title>
        )}
        {typeof after === 'function' ? after({ isPressed }) : after}
      </>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || isLoading}
      style={indent && styles.indent}
    >
      <S.Button
        withoutFixedHeight={withoutFixedHeight}
        size={size}
        mode={mode}
        style={style}
        inverted={inverted}
        isPressed={isPressed}
        disabled={disabled}
      >
        {renderContent()}
      </S.Button>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  indent: {
    marginHorizontal: 16,
    marginBottom: 16,
  }
});