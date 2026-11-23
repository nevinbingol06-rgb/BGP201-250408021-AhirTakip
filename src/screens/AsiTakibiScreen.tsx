import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AsiKaydi } from '../types/ahir';

interface Props {
  asilar: AsiKaydi[];
  onAsiDegistir: (asiId: string) => void;
  koyuTema: boolean;
}

export const AsiTakibiScreen: React.FC<Props> = ({ asilar, onAsiDegistir, koyuTema }) => {
  return (
    <SafeAreaView style={[styles.container, koyuTema && styles.darkBg]}>
      <View style={styles.header}>
        <Text style={[styles.title, koyuTema && styles.lightText]}>Aşı ve Sağlık Takibi</Text>
        <Text style={[styles.subtitle, koyuTema && styles.mutedText]}>
          Uygulanan ve planlanan aşı kayıtları
        </Text>
      </View>

      <FlatList
        data={asilar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, koyuTema && styles.darkCard]}>
            <View style={styles.row}>
              <Text style={[styles.asiAdi, koyuTema && styles.lightText]}>{item.asiAdi}</Text>
              <Text style={item.tamamlandi ? styles.doneBadge : styles.pendingBadge}>
                {item.tamamlandi ? 'Tamamlandı' : 'Bekliyor'}
              </Text>
            </View>
            <Text style={[styles.meta, koyuTema && styles.mutedText]}>Küpe No: {item.kupeNo}</Text>
            <Text style={[styles.meta, koyuTema && styles.mutedText]}>
              Sonraki Tarih: {item.sonrakiTarih}
            </Text>
            <Pressable
              style={[styles.toggleBtn, item.tamamlandi && styles.completedBtn]}
              onPress={() => onAsiDegistir(item.id)}
            >
              <Text style={styles.toggleText}>
                {item.tamamlandi ? 'Bekliyor Olarak İşaretle' : 'Tamamlandı Olarak İşaretle'}
              </Text>
            </Pressable>
          </View>
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
  subtitle: { fontSize: 13, color: '#475569', marginTop: 2 },
  lightText: { color: '#f8fafc' },
  mutedText: { color: '#94a3b8' },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 4,
  },
  darkCard: { backgroundColor: '#1e293b', borderColor: '#334155' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  asiAdi: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  doneBadge: { color: '#15803d', fontWeight: '700', fontSize: 12 },
  pendingBadge: { color: '#d97706', fontWeight: '700', fontSize: 12 },
  meta: { fontSize: 13, color: '#475569' },
  toggleBtn: {
    marginTop: 8,
    backgroundColor: '#0f766e',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  completedBtn: { backgroundColor: '#475569' },
  toggleText: { color: '#ffffff', fontWeight: '600', fontSize: 13 },
});