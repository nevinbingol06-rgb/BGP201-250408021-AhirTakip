import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BASLANGIC_ASILAR, BASLANGIC_HAYVANLAR } from '../data/ahirVerileri';
import { AnaSekmeParamListesi, AsiKaydi, Hayvan, KokStackParamListesi, SaglikDurumu } from '../types/ahir';
import { HayvanListesiScreen } from '../screens/HayvanListesiScreen';
import { HayvanDetayScreen } from '../screens/HayvanDetayScreen';
import { AsiTakibiScreen } from '../screens/AsiTakibiScreen';
import { RaporlarScreen } from '../screens/RaporlarScreen';
import { AyarlarScreen } from '../screens/AyarlarScreen';

const Stack = createNativeStackNavigator<KokStackParamListesi>();
const Tab = createBottomTabNavigator<AnaSekmeParamListesi>();

export const AhirNavigator: React.FC = () => {
  const [hayvanlar, setHayvanlar] = useState<Hayvan[]>(BASLANGIC_HAYVANLAR);
  const [asilar, setAsilar] = useState<AsiKaydi[]>(BASLANGIC_ASILAR);
  const [koyuTema, setKoyuTema] = useState<boolean>(false);
  const [hatirlaticiAktif, setHatirlaticiAktif] = useState<boolean>(true);

  const handleDurumGuncelle = (hayvanId: string, yeniDurum: SaglikDurumu) => {
    setHayvanlar((prev) =>
      prev.map((h) => (h.id === hayvanId ? { ...h, durum: yeniDurum } : h))
    );
  };

  const handleAsiDegistir = (asiId: string) => {
    setAsilar((prev) =>
      prev.map((a) => (a.id === asiId ? { ...a, tamamlandi: !a.tamamlandi } : a))
    );
  };

  const Sekmeler = () => (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0f766e',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: koyuTema ? '#1e293b' : '#ffffff',
          borderTopColor: koyuTema ? '#334155' : '#e2e8f0',
        },
      }}
    >b
      <Tab.Screen name="HayvanlarSekmesi" options={{ title: 'Hayvanlar' }}>
        {() => <HayvanListesiScreen hayvanlar={hayvanlar} koyuTema={koyuTema} />}
      </Tab.Screen>
      <Tab.Screen name="AsiTakibiSekmesi" options={{ title: 'Aşı Takibi' }}>
        {() => (
          <AsiTakibiScreen
            asilar={asilar}
            onAsiDegistir={handleAsiDegistir}
            koyuTema={koyuTema}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="RaporlarSekmesi" options={{ title: 'Raporlar' }}>
        {() => <RaporlarScreen hayvanlar={hayvanlar} asilar={asilar} koyuTema={koyuTema} />}
      </Tab.Screen>
      <Tab.Screen name="AyarlarSekmesi" options={{ title: 'Ayarlar' }}>
        {() => (
          <AyarlarScreen
            koyuTema={koyuTema}
            onKoyuTemaDegistir={setKoyuTema}
            hatirlaticiAktif={hatirlaticiAktif}
            onHatirlaticiDegistir={setHatirlaticiAktif}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AnaSekmeler"
          component={Sekmeler}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HayvanDetay"
          options={{ title: 'Hayvan Detayı' }}
        >
          {() => (
            <HayvanDetayScreen
              hayvanlar={hayvanlar}
              onDurumGuncelle={handleDurumGuncelle}
              koyuTema={koyuTema}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
