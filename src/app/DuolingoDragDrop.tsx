import React from 'react';
import { View, StyleSheet } from 'react-native';

import WordList from '@/components/DuolingoDragDrop/WordList';
import Word from '@/components/DuolingoDragDrop/Word';
import Header from '@/components/DuolingoDragDrop/Header';
import Footer from '@/components/DuolingoDragDrop/Footer';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

const words = [
  { id: 1, word: 'Ihr' },
  { id: 8, word: 'hungrig' },
  { id: 2, word: 'isst' },
  { id: 7, word: 'er' },
  { id: 6, word: 'weil' },
  { id: 9, word: 'ist' },
  { id: 5, word: ',' },
  { id: 3, word: 'einen' },
  { id: 4, word: 'Apfel' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const Duolingo = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          title: 'Duolingo Drag and Drop',
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <Header />
        <WordList>
          {words.map((word) => (
            <Word key={word.id} {...word} />
          ))}
        </WordList>
        <Footer />
      </SafeAreaView>
    </>
  );
};

export default Duolingo;
