import React from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';

interface Props {
  koyuTema: boolean;
  onKoyuTemaDegistir: (val: boolean) => void;
  hatirlaticiAktif: boolean;
  onHatirlaticiDegistir: (val: boolean) => void;
}

export const AyarlarScreen: React.FC<Props> = ({
  koyuTema,
  onKoyuTemaDegistir,
  hatirlaticiAktif,
  onHatirlaticiDegistir,
}) => {
  return (
    <SafeAreaView style={[styles.container, koyuTema && styles.darkBg]}>
      <Text style={[styles.title, koyuTema && styles.lightText]}>Uygulama Ayarları</Text>

      <View style={[styles.rowCard, koyuTema && styles.darkCard]}>
        <Text style={[styles.label, koyuTema && styles.lightText]}>Koyu Tema Görünümü</Text>
        <Switch value={koyuTema} onValueChange={onKoyuTemaDegistir} />
      </View>

      <View style={[styles.rowCard, koyuTema && styles.darkCard]}>
        <Text style={[styles.label, koyuTema && styles.lightText]}>Aşı Hatırlatıcı Uyarıları</Text>
        <Switch value={hatirlaticiAktif} onValueChange={onHatirlaticiDegistir} />
      </View>

      <View style={[styles.infoCard, koyuTema && styles.darkCard]}>
        <Text style={[styles.infoText, koyuTema && styles.mutedText]}>
          Proje: BGP201-250408021-AhirTakip
        </Text>
        <Text style={[styles.infoText, koyuTema && styles.mutedText]}>
          Öğrenci: Nevin Bingöl (250408021)
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f5', padding: 16, gap: 12 },
  darkBg: { backgroundColor: '#0f172a' },
  title: { fontSize: 22, fontWeight: '700', color: '#1e293b', marginBottom: 4 },
  lightText: { color: '#f8fafc' },
  mutedText: { color: '#94a3b8' },
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  darkCard: { backgroundColor: '#1e293b', borderColor: '#334155' },
  label: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 6,
  },
  infoText: { fontSize: 14, color: '#475569' },
});
