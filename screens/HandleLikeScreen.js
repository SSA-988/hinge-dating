import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const HandleLikeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route?.params);
  const createMatch = async () => {
    try {
      const currentUserId = route?.params?.userId; // Example currentUserId
      const selectedUserId = route?.params?.selectedUserId; // Example selectedUserId
      const response = await axios.post('http://localhost:3000/create-match', {
        currentUserId,
        selectedUserId,
      });
      if (response.status === 200) {
        navigation.goBack();
        // Handle success, such as updating UI or showing a success message
      } else {
        console.error('Failed to create match');
        // Handle failure, such as showing an error message
      }
    } catch (error) {
      console.error('Error creating match:', error);
      // Handle error, such as showing an error message
    }
  };
  const match = () => {
    Alert.alert('Accept Request?', `Match with ${route?.params?.name}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: createMatch},
    ]);
    // navigation.goBack()
  };
  return (
    <>
      <ScrollView
        style={{flex: 1, backgroundColor: 'white', marginTop: 55, padding: 12}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{textAlign: 'center', fontSize: 15, fontWeight: '500'}}>
            All {route?.params?.likes}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500'}}>Back</Text>
        </View>

        <View style={{marginVertical: 12}}>
          <Image
            style={{
              width: '100%',
              height: 100,
              borderRadius: 7,
              resizeMode: 'cover',
            }}
            source={{uri: route?.params.image}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: '#f0f0f0',
              borderRadius: 5,
              marginBottom: 8,
              width: 145,
              position: 'absolute',
              bottom: -22,
            }}>
            <View />
            <View>
              <Text>Liked your photo</Text>
            </View>
          </View>
        </View>

        <View style={{marginVertical: 25}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {route?.params?.name}
              </Text>
              <View
                style={{
                  backgroundColor: '#452c63',
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 20,
                }}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  new here
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
              }}>
              <Entypo name="dots-three-horizontal" size={22} color="black" />
            </View>
          </View>

          <View style={{marginVertical: 15}}>
            <View>
              {route?.params?.imageUrls?.length > 0 && (
                <View>
                  <Image
                    style={{
                      width: '100%',
                      height: 350,
                      resizeMode: 'cover',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: route?.params?.imageUrls[0],
                    }}
                  />
                  <Pressable
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'white',
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign name="hearto" size={25} color="#C5B358" />
                  </Pressable>
                </View>
              )}
            </View>

            <View style={{marginVertical: 15}}>
              {route?.params?.prompts.slice(0, 1).map(prompt => (
                <>
                  <View
                    key={prompt.id}
                    style={{
                      backgroundColor: 'white',
                      padding: 12,
                      borderRadius: 10,
                      height: 150,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                      {prompt.question}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        marginTop: 20,
                      }}>
                      {prompt.answer}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'white',
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      // Shadow properties for Android
                      elevation: 5,
                    }}>
                    <AntDesign name="hearto" size={25} color="#C5B358" />
                  </View>
                </>
              ))}
            </View>

            {/* profile details to come here */}

            <View>
              {route?.params?.imageUrls?.slice(1, 3).map((item, index) => (
                <View key={index} style={{marginVertical: 10}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 350,
                      resizeMode: 'cover',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: item,
                    }}
                  />

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'white',
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign name="hearto" size={25} color="#C5B358" />
                  </View>
                </View>
              ))}
            </View>

            <View style={{marginVertical: 15}}>
              {route?.params?.prompts.slice(1, 2).map(prompt => (
                <>
                  <View
                    key={prompt.id}
                    style={{
                      backgroundColor: 'white',
                      padding: 12,
                      borderRadius: 10,
                      height: 150,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                      {prompt.question}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        marginTop: 20,
                      }}>
                      {prompt.answer}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'white',
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      // Shadow properties for Android
                      elevation: 5,
                    }}>
                    <AntDesign name="hearto" size={25} color="#C5B358" />
                  </View>
                </>
              ))}
            </View>

            <View>
              {route?.params?.imageUrls?.slice(3, 4).map((item, index) => (
                <View key={index} style={{marginVertical: 10}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 350,
                      resizeMode: 'cover',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: item,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'white',
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign name="hearto" size={25} color="#C5B358" />
                  </View>
                </View>
              ))}
            </View>
            <View style={{marginVertical: 15}}>
              {route?.params?.prompts.slice(2, 3).map(prompt => (
                <>
                  <View
                    key={prompt.id}
                    style={{
                      backgroundColor: 'white',
                      padding: 12,
                      borderRadius: 10,
                      height: 150,
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                      {prompt.question}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        marginTop: 20,
                      }}>
                      {prompt.answer}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'white',
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      // Shadow properties for Android
                      elevation: 5,
                    }}>
                    <AntDesign name="hearto" size={25} color="#C5B358" />
                  </View>
                </>
              ))}
            </View>

            <View>
              {route?.params?.imageUrls?.slice(4, 7).map((item, index) => (
                <View key={index} style={{marginVertical: 10}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 350,
                      resizeMode: 'cover',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: item,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: 'white',
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign name="hearto" size={25} color="#C5B358" />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* <View
              style={{
                position:"absolute",
                bottom: 10,
                left: 10,
                backgroundColor: 'white',
                width: 42,
                height: 42,
                borderRadius: 21,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="cross" size={25} color="#C5B358" />
            </View> */}
        </View>
      </ScrollView>

      <Pressable
        onPress={match}
        style={{
          position: 'absolute',
          bottom: 45,
          right: 12,
          backgroundColor: 'white',
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name="message-outline"
          size={25}
          color="#C5B358"
        />
      </Pressable>
    </>
  );
};

export default HandleLikeScreen;

const styles = StyleSheet.create({});
