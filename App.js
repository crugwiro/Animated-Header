import * as React from 'react';
import { StyleSheet, View, Image, Text, Animated, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const HEADER_MAX_HEIGHT=120;
const HEADER_MIN_HEIGHT=70;
const PROFILE_IMAGE_MAX_HEIGHT=80
const PROFILE_IMAGE_MIN_HEIGHT=40


export default function App() {
  const scrollY = React.useRef( new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  });

  const profileHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp'
  });

  const profileImageTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT, HEADER_MAX_HEIGHT - 40],
    extrapolate: 'clamp'
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const opacity = scrollY.interpolate({
    inputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT + 40],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT + 40],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });
  return (
    <SafeAreaView style={{flex: 1}}>
       <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.3)", "black"]}
            style={StyleSheet.absoluteFill}
            start={[0, 0]}
            end={[0,0.5]}
            />
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'lightskyblue',
        height: headerHeight,
        zIndex: headerZindex,
        alignItems: 'center',
        opacity: headerOpacity
      }}>
        <LinearGradient
            colors={["black", "rgba(0, 0, 0, 0.3)", "transparent"]}
            style={StyleSheet.absoluteFill}
            start={[0, 0]}
            end={[0,0]}
            />
        <Animated.Text style={{position: 'absolute', bottom: 0, fontWeight: 'bold', opacity, color:'white'}}>Jan Blomqvist</Animated.Text>
        </Animated.View> 
        <Animated.ScrollView style={{flex: 1}} 
        scrollEventThrottle={1}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: scrollY}
                  }
                }
              ]
            )}>
        <Animated.View style={{
          height: profileHeight,
          width: profileHeight,
          borderRadius: PROFILE_IMAGE_MAX_HEIGHT/2,
          borderColor: 'white',
          borderWidth: 3,
          overflow: 'hidden',
          marginTop: profileImageTop,
          marginLeft: 10
        }}>
          <Image style={{flex: 1, height: null, width: null}}source={require('./assets/Jan-Blomqvist.jpg')}></Image>
        </Animated.View>
        <View><Text style={{fontWeight: 'bold', fontSize: 26, margin: 10, color: 'white'}}>Jan Blomqvist</Text></View>
        <View style={{height: 1000}}></View>
        </Animated.ScrollView>
    </SafeAreaView>
  );
}
