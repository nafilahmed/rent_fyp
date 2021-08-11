import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ProdDetail = ({ route, navigation }) => {
  console.log("+++++++++++++++++++++++++++++");

  console.log(route.params);

  console.log("-----------------------------------");

  return (
    <ScrollView>
      
      <View style={{ height: 290 }}>
        
        <Swiper
          containerStyle={{ flex: 1 }}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={{ marginBottom: -15 }}
          loop={false}
        >
          <View style={styles.slide}>
            <Image
              source={{uri:`http://brandsmen.com.pk/rent_api/public/${route.params.productDetails.feature_image}`}}
              style={styles.slideImage}
              resizeMode='cover'
            />
          </View>

        </Swiper>

      </View>

      <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
        
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>DESCRIPTION:</Text>

        <Text style={{ marginTop: 5 }}>{route.params.productDetails.desc}</Text>
      
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  activeDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: 7,
    marginRight: 7
  },
  dot: {
    backgroundColor: "white",
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 1,
    marginLeft: 7,
    marginRight: 7
  },
  slide: {
    width: '100%',
    flex: 1
  },
  slideImage: {
    flex: 1,
    width: '100%'
  },
});

export default ProdDetail;