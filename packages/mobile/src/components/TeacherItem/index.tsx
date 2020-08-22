import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  whatsapp: string;
  subject: string;
  cost: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }: TeacherItemProps) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsapp = () => {
    api.post('connections', { user_id: teacher.id });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  };

  const handleToggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      favoritesArray = favoritesArray.filter((favorite: Teacher) => favorite.id === teacher.id);
    } else {
      favoritesArray.push(teacher);
    }

    setIsFavorited(!isFavorited);
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preco/hora {'   '}
          <Text style={styles.priceValue}>{teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
            onPress={handleToggleFavorite}
          >
            {isFavorited ? <Image source={unfavoriteIcon} /> : <Image source={heartOutlineIcon} />}
          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
