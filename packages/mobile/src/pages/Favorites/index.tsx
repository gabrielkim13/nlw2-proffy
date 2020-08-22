import React, { useState } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then((response) => {
      if (!response) return;

      const favoritedTeachers = JSON.parse(response);

      setFavorites(favoritedTeachers);
    });
    // AsyncStorage.removeItem('favorites');
  };

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView style={styles.teacherList} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {favorites.map((favorite: Teacher) => (
          <TeacherItem key={favorite.id} teacher={favorite} favorited />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
