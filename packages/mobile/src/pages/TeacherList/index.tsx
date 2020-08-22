import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [weekday, setWeekday] = useState('');
  const [time, setTime] = useState('');

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then((response) => {
      if (!response) return;

      const favoritedTeachers = JSON.parse(response);
      const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id);

      setFavorites(favoritedTeachersIds);
    });
  };

  useFocusEffect(() => {
    loadFavorites();
  });

  const handleToggleFiltersVisible = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const handleFiltersSubmit = async () => {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekday,
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={weekday}
                  onChangeText={(text) => setWeekday(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView style={styles.teacherList} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
