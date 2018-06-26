
import React, {Component} from 'react'
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import * as Animatable from 'react-native-animatable'
import * as theme from './theme'

export * from './Buttons'
export * from './Cards'
export * from './Inputs'
export * from './PillowButton'
export * from './Screen'
export * from './Slider'
export * from './Switch'
export * from './Text'

export const AnimatableView = __DEV__ ? View : Animatable.View

export const CheckBox = ({size, value, ...props}) => {
  const activeTintColor = props.activeTintColor || theme.TEAL
  const inactiveTintColor = props.inactiveTintColor || 'white'
  const borderInactiveTintColor = props.inactiveTintColor || theme.GREY_LIGHT
  return (
    <TouchableWithoutFeedback onPress={props.onValueChange}>
      <View
        style={{
          width: size || 25,
          height: size || 25,
          backgroundColor: value ? activeTintColor : inactiveTintColor,
          borderColor: value ? activeTintColor : borderInactiveTintColor,
          borderWidth: 1,
          borderRadius: 5,
          ...props.style,
        }}
      />
    </TouchableWithoutFeedback>
  )
}

export const Hr = ({tintColor, style, ...props}) => (
  <View
    style={[
      {
        height: 1,
        alignSelf: 'stretch',
        marginHorizontal: 10,
        backgroundColor: tintColor || theme.GREY_LIGHT,
        opacity: 0.7,
      },
      style,
    ]}
    {...props}
  />
)

/* -----
* Improved and enhanced Image loader with placeholder to use instead of Image
* ---- */

export class Img extends Component {
  constructor (props) {
    super(props)
    this.state = {placeholderOpacity: new Animated.Value(1)}
  }

  onLoad () {
    Animated.timing(this.state.placeholderOpacity, {
      toValue: 0,
      duration: 250,
    }).start()
  }

  render () {
    const {style} = this.props
    const {placeholderOpacity} = this.state

    return (
      <View style={[{backgroundColor: '#ccc'}, style]}>
        <Animated.Image
          key="placeholder"
          resizeMode="contain"
          style={[{position: 'absolute', opacity: placeholderOpacity}, style]}
          source={this.props.placeholder}
        />
        <Animated.Image
          key="image"
          resizeMode="contain"
          style={[{position: 'absolute'}, style]}
          source={this.props.source}
          onLoad={() => this.onLoad()}
        />
      </View>
    )
  }
}

export const NavbarIcon = ({style, source, ...props}) => (
  <TouchableOpacity
    {...props}
    activeOpacity={0.8}
    style={[{padding: theme.NAVBAR_HEIGHT * 0.2}, style]}>
    <Image
      source={source}
      style={{
        height: theme.NAVBAR_HEIGHT * 0.5,
        width: theme.NAVBAR_HEIGHT * 0.5,
      }}
    />
  </TouchableOpacity>
)

export const PagingDots = ({tintColor = theme.TEAL, ...props}) => {
  const active =
    props.customActiveTab !== undefined
      ? props.customActiveTab
      : props.activeTab
  const {width} = Dimensions.get('window')

  return (
    <View style={[{width}, styles.pagingDotsBar, props.style]}>
      {Array.apply(null, {length: props.length}).map((item, i) => {
        return (
          <View
            key={i} // eslint-disable-line react/no-array-index-key
            style={[
              styles.dot,
              {
                backgroundColor: tintColor,
                borderColor: tintColor,
              },
              active === i ? styles.activeDot : {},
            ]}
          />
        )
      })}
    </View>
  )
}

export const TextPlaceholder = ({style, ...props}) => (
  <Hr
    style={[{height: 14, alignSelf: 'flex-start', borderRadius: 3}, style]}
    {...props}
  />
)

export const Setting = ({
  children,
  style,
  width,
  img,
  icon,
  imgSize,
  iconSize,
  iconColor,
  ...props
}) => (
  <View>
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      disabled={typeof props.onPress !== 'function'}
      style={{
        flex: 1,
        paddingVertical: 10,
        ...theme.simpleNavbar,
        ...style,
      }}>
      {icon !== undefined ? (
        <Icon
          size={iconSize || 26}
          style={{paddingHorizontal: 12}}
          color={iconColor || 'white'}
          name={icon}
        />
      ) : null}
      {children}
    </TouchableOpacity>
    {!props.hideSeparator ? (
      <Hr tintColor={theme.TEAL_SEMI_TRANSPARENT} />
    ) : null}
  </View>
)

export const TouchableRipple = ({children, style, ...props}) => {
  if (process.env.NODE_ENV === 'test' || Platform.OS === 'web') {
    return (
      <TouchableWithoutFeedback {...props}>
        <View style={style}>{children}</View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      useForeground={false}
      {...props}>
      <View style={style}>{children}</View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: 'transparent',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    marginBottom: 25,
  },
  pagingDotsBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
