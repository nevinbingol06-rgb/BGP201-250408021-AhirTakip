export type HayvanTuru = 'İnek' | 'Buzağı' | 'Koyun' | 'Keçi';
export type SaglikDurumu = 'Sağlıklı' | 'Tedavide' | 'Aşı Bekliyor';

export interface AsiKaydi {
  id: string;
  hayvanId: string;
  kupeNo: string;
  asiAdi: string;
  uygulamaTarihi: string;
  sonrakiTarih: string;
  tamamlandi: boolean;
}

export interface Hayvan {
  id: string;
  kupeNo: string;
  ad: string;
  tur: HayvanTuru;
  yasAy: number;
  agirlikKg: number;
  bolum: string;
  durum: SaglikDurumu;
  notlar: string;
}

export type AnaSekmeParamListesi = {
  HayvanlarSekmesi: undefined;
  AsiTakibiSekmesi: undefined;
  RaporlarSekmesi: undefined;
  AyarlarSekmesi: undefined;
};

export type KokStackParamListesi = {
  AnaSekmeler: undefined;
  HayvanDetay: { hayvanId: string };
};
