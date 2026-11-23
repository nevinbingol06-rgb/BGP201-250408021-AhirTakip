import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AsiKaydi, Hayvan } from '../types/ahir';

interface Props {
  hayvanlar: Hayvan[];
  asilar: AsiKaydi[];
  koyuTema: boolean;
}

export const RaporlarScreen: React.FC<Props> = ({ hayvanlar, asilar, koyuTema }) => {
  const saglikliSayisi = hayvanlar.filter((h) => h.durum === 'Sağlıklı').length;
  const tedavideSayisi = hayvanlar.filter((h) => h.durum === 'Tedavide').length;
  const bekleyenAsiSayisi = asilar.filter((a) => !a.tamamlandi).length;
  const ortalamaAgirlik =
    hayvanlar.length > 0
      ? Math.round(hayvanlar.reduce((acc, h) => acc + h.agirlikKg, 0) / hayvanlar.length)
      : 0;

  return (
    <SafeAreaView style={[styles.container, koyuTema && styles.darkBg]}>
      <Text style={[styles.title, koyuTema && styles.lightText]}>Ahır Durum Özeti</Text>
      <View style={styles.grid}>
        <View style={[styles.statCard, koyuTema && styles.darkCard]}>
          <Text style={[styles.statValue, koyuTema && styles.accentText]}>{hayvanlar.length}</Text>
          <Text style={[styles.statLabel, koyuTema && styles.mutedText]}>Toplam Hayvan</Text>
        </View>
        <View style={[styles.statCard, koyuTema && styles.darkCard]}>
          <Text style={[styles.statValue, koyuTema && styles.accentText]}>{saglikliSayisi}</Text>
          <Text style={[styles.statLabel, koyuTema && styles.mutedText]}>Sağlıklı</Text>
        </View>
        <View style={[styles.statCard, koyuTema && styles.darkCard]}>
          <Text style={[styles.statValue, koyuTema && styles.accentText]}>{tedavideSayisi}</Text>
          <Text style={[styles.statLabel, koyuTema && styles.mutedText]}>Tedavide</Text>
        </View>
        <View style={[styles.statCard, koyuTema && styles.darkCard]}>
          <Text style={[styles.statValue, koyuTema && styles.accentText]}>
            {bekleyenAsiSayisi}
          </Text>
          <Text style={[styles.statLabel, koyuTema && styles.mutedText]}>Bekleyen Aşı</Text>
        </View>
      </View>
      <View style={[styles.summaryBox, koyuTema && styles.darkCard]}>
        <Text style={[styles.summaryText, koyuTema && styles.lightText]}>
          Ortalama Ağırlık: {ortalamaAgirlik} kg
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f5', padding: 16 },
  darkBg: { backgroundColor: '#0f172a' },
  title: { fontSize: 22, fontWeight: '700', color: '#1e293b', marginBottom: 14 },
  lightText: { color: '#f8fafc' },
  accentText: { color: '#2dd4bf' },
  mutedText: { color: '#94a3b8' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  darkCard: { backgroundColor: '#1e293b', borderColor: '#334155' },
  statValue: { fontSize: 26, fontWeight: '800', color: '#0f766e' },
  statLabel: { fontSize: 13, color: '#475569', marginTop: 4 },
  summaryBox: {
    marginTop: 14,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  summaryText: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
});
