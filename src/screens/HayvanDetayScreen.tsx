import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Hayvan, KokStackParamListesi, SaglikDurumu } from '../types/ahir';

interface Props {
  hayvanlar: Hayvan[];
  onDurumGuncelle: (hayvanId: string, yeniDurum: SaglikDurumu) => void;
  koyuTema: boolean;
}

const DURUMLAR: SaglikDurumu[] = ['Sağlıklı', 'Tedavide', 'Aşı Bekliyor'];

export const HayvanDetayScreen: React.FC<Props> = ({
  hayvanlar,
  onDurumGuncelle,
  koyuTema,
}) => {
  const route = useRoute<RouteProp<KokStackParamListesi, 'HayvanDetay'>>();
  const navigation = useNavigation();
  const hayvan = hayvanlar.find((h) => h.id === route.params.hayvanId);

  if (!hayvan) {
    return (
      <SafeAreaView style={[styles.container, koyuTema && styles.darkBg]}>
        <Text style={[styles.title, koyuTema && styles.lightText]}>Hayvan kaydı bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, koyuTema && styles.darkBg]}>
      <View style={[styles.card, koyuTema && styles.darkCard]}>
        <Text style={[styles.kupeNo, koyuTema && styles.accentText]}>{hayvan.kupeNo}</Text>
        <Text style={[styles.title, koyuTema && styles.lightText]}>{hayvan.ad}</Text>
        <Text style={[styles.rowText, koyuTema && styles.mutedText]}>Tür: {hayvan.tur}</Text>
        <Text style={[styles.rowText, koyuTema && styles.mutedText]}>Bölüm: {hayvan.bolum}</Text>
        <Text style={[styles.rowText, koyuTema && styles.mutedText]}>Yaş: {hayvan.yasAy} ay</Text>
        <Text style={[styles.rowText, koyuTema && styles.mutedText]}>
          Ağırlık: {hayvan.agirlikKg} kg
        </Text>
        <Text style={[styles.rowText, koyuTema && styles.mutedText]}>
          Mevcut Durum: {hayvan.durum}
        </Text>
        <Text style={[styles.note, koyuTema && styles.lightText]}>Not: {hayvan.notlar}</Text>

        <Text style={[styles.sectionTitle, koyuTema && styles.lightText]}>
          Sağlık Durumunu Güncelle
        </Text>
        <View style={styles.buttonRow}>
          {DURUMLAR.map((durum) => {
            const aktif = hayvan.durum === durum;
            return (
              <Pressable
                key={durum}
                style={[styles.statusBtn, aktif && styles.activeBtn]}
                onPress={() => onDurumGuncelle(hayvan.id, durum)}
              >
                <Text style={[styles.btnText, aktif && styles.activeBtnText]}>{durum}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Listeye Dön</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f5', padding: 16 },
  darkBg: { backgroundColor: '#0f172a' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  darkCard: { backgroundColor: '#1e293b', borderColor: '#334155' },
  kupeNo: { fontSize: 14, fontWeight: '700', color: '#0f766e' },
  accentText: { color: '#2dd4bf' },
  title: { fontSize: 24, fontWeight: '700', color: '#1e293b' },
  rowText: { fontSize: 15, color: '#334155' },
  note: { fontSize: 15, color: '#0f172a', marginTop: 6, fontStyle: 'italic' },
  lightText: { color: '#f8fafc' },
  mutedText: { color: '#cbd5e1' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginTop: 14 },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  statusBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#94a3b8',
  },
  activeBtn: { backgroundColor: '#0f766e', borderColor: '#0f766e' },
  btnText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  activeBtnText: { color: '#ffffff' },
  backBtn: {
    marginTop: 16,
    backgroundColor: '#1e293b',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  backBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
});