import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Hayvan, KokStackParamListesi, SaglikDurumu } from '../types/ahir';

interface Props {
  hayvanlar: Hayvan[];
  koyuTema: boolean;
}

const DURUM_RENKLERI: Record<SaglikDurumu, string> = {
  'Sağlıklı': '#2e7d32',
  'Tedavide': '#c62828',
  'Aşı Bekliyor': '#ef6c00',
};

export const HayvanListesiScreen: React.FC<Props> = ({ hayvanlar, koyuTema }) => {
  const navigation = useNavigation<NativeStackNavigationProp<KokStackParamListesi>>();
  const [arama, setArama] = useState('');

  const filtrelenen = useMemo(() => {
    const q = arama.trim().toLowerCase();
    if (!q) return hayvanlar;
    return hayvanlar.filter(
      (h) =>
        h.kupeNo.toLowerCase().includes(q) ||
        h.ad.toLowerCase().includes(q) ||
        h.tur.toLowerCase().includes(q) ||
        h.bolum.toLowerCase().includes(q)
    );
  }, [arama, hayvanlar]);

  return (
    <SafeAreaView style={[styles.container, koyuTema && styles.darkBg]}>
      <View style={styles.header}>
        <Text style={[styles.title, koyuTema && styles.lightText]}>Ahır Hayvan Listesi</Text>
        <Text style={[styles.subtitle, koyuTema && styles.mutedText]}>
          Toplam {filtrelenen.length} kayıtlı hayvan
        </Text>
        <TextInput
          value={arama}
          onChangeText={setArama}
          placeholder="Küpe no, isim, tür veya bölüm ara..."
          placeholderTextColor={koyuTema ? '#94a3b8' : '#64748b'}
          style={[styles.input, koyuTema && styles.darkInput]}
        />
      </View>

      <FlatList
        data={filtrelenen}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, koyuTema && styles.darkCard]}
            onPress={() => navigation.navigate('HayvanDetay', { hayvanId: item.id })}
          >
            <View style={styles.cardTop}>
              <Text style={[styles.kupeNo, koyuTema && styles.lightText]}>{item.kupeNo}</Text>
              <View style={[styles.badge, { backgroundColor: DURUM_RENKLERI[item.durum] }]}>
                <Text style={styles.badgeText}>{item.durum}</Text>
              </View>
            </View>
            <Text style={[styles.name, koyuTema && styles.lightText]}>
              {item.ad} · {item.tur}
            </Text>
            <Text style={[styles.meta, koyuTema && styles.mutedText]}>
              {item.bolum} | {item.yasAy} ay | {item.agirlikKg} kg
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f5' },
  darkBg: { backgroundColor: '#0f172a' },
  header: { padding: 16, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#1e293b' },
  subtitle: { fontSize: 13, color: '#475569', marginTop: 2, marginBottom: 10 },
  lightText: { color: '#f8fafc' },
  mutedText: { color: '#94a3b8' },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0f172a',
  },
  darkInput: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    color: '#f8fafc',
  },
  listContent: { padding: 16, paddingTop: 8, gap: 12 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  darkCard: { backgroundColor: '#1e293b', borderColor: '#334155' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kupeNo: { fontSize: 14, fontWeight: '700', color: '#0f766e' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  name: { fontSize: 17, fontWeight: '600', color: '#1e293b', marginTop: 6 },
  meta: { fontSize: 13, color: '#475569', marginTop: 4 },
});