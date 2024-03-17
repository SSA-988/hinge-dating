import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {SlideAnimation} from 'react-native-modals';
import {useNavigation} from '@react-navigation/native';
import {ModalTitle} from 'react-native-modals';
import {ModalContent, BottomModal} from 'react-native-modals';

const ShowPromptsScreen = () => {
  const navigation = useNavigation();
  const [prompts, setPrompts] = useState([]);
  const promptss = [
    {
      id: '0',
      name: 'About me',
      questions: [
        {
          id: '10',
          question: 'A random fact I love is',
        },
        {
          id: '11',
          question: 'Typical Sunday',
        },
        {
          id: '12',
          question: 'I go crazy for',
        },
        {
          id: '13',
          question: 'Unusual Skills',
        },
        {
          id: '14',
          question: 'My greatest strenght',
        },
        {
          id: '15',
          question: 'My simple pleasures',
        },
        {
          id: '16',
          question: 'A life goal of mine',
        },
      ],
    },
    {
      id: '2',
      name: 'Self Care',
      questions: [
        {
          id: '10',
          question: 'I unwind by',
        },
        {
          id: '11',
          question: 'A boundary of mine is',
        },
        {
          id: '12',
          question: 'I feel most supported when',
        },
        {
          id: '13',
          question: 'I hype myself up by',
        },
        {
          id: '14',
          question: 'To me, relaxation is',
        },
        {
          id: '15',
          question: 'I beat my blues by',
        },
        {
          id: '16',
          question: 'My skin care routine',
        },
      ],
    },
  ];
  const [option, setOption] = useState('About me');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = item => {
    setModalVisible(!isModalVisible);

    setQuestion(item?.question);
  };

  const addPrompt = () => {
    const newPrompt = {question, answer};
    setPrompts([...prompts, newPrompt]);
    setQuestion('');
    setAnswer('');
    setModalVisible(false);
    if (prompts.length === 3) {
      setModalVisible(false);
      navigation.navigate('Prompts', {
        prompts: prompts,
      }); // Navigate away from the screen when prompts reach three
    }
  };
  console.log('question', prompts);
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 15, fontWeight: '500', color: '#581845'}}>
            View all
          </Text>

          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#581845'}}>
            Prompts
          </Text>

          <Entypo name="cross" size={22} color="black" />
        </View>

        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            flexDirection: 'row',
            gap: 10,
          }}>
          {promptss?.map((item, index) => (
            <>
              <View>
                <Pressable
                  style={{
                    padding: 10,
                    borderRadius: 20,
                    backgroundColor: option == item?.name ? '#581845' : 'white',
                  }}
                  onPress={() => setOption(item?.name)}
                  key={index}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: option == item?.name ? 'white' : 'black',
                    }}>
                    {item?.name}
                  </Text>
                </Pressable>

                {/* {item?.name === option && (
                <View>
                    {item?.questions?.map((item,index) => (
                        <Pressable style={{marginVertical:15}}>
                            <Text style={{fontSize:15,fontWeight:"500"}}>{item?.question}</Text>
                        </Pressable>
                    ))}
                </View>
            )} */}
              </View>
            </>
          ))}
        </View>
        <View style={{marginTop: 20, marginHorizontal: 12}}>
          {promptss?.map((item, index) => (
            <View key={index}>
              {option === item?.name && (
                <View>
                  {item?.questions?.map((question, questionIndex) => (
                    <Pressable
                      onPress={() => openModal(question)}
                      style={{marginVertical: 12}}
                      key={questionIndex}>
                      <Text style={{fontSize: 15, fontWeight: '500'}}>
                        {question.question}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Choose Option" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}>
        <ModalContent style={{width: '100%', height: 280}}>
          <View style={{marginVertical: 10}}>
            <Text
              style={{textAlign: 'center', fontWeight: '600', fontSize: 15}}>
              Answer your question
            </Text>
            <Text style={{marginTop: 15, fontSize: 20, fontWeight: '600'}}>
              {question}
            </Text>
            <View
              style={{
                borderColor: '#202020',
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                height: 100,
                marginVertical: 12,
                borderStyle: 'dashed',
              }}>
              <TextInput
                value={answer}
                onChangeText={text => setAnswer(text)}
                style={{color: 'gray', width: 300, fontSize: answer ? 18 : 18}}
                placeholder="Enter Your Answer"
              />
            </View>
            <Button onPress={addPrompt} title="Add"></Button>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default ShowPromptsScreen;

const styles = StyleSheet.create({});
