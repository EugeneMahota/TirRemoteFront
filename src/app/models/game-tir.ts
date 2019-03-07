export class GameTir {
  id: number;
  game_id: number;
  rele_start_id: number;
  rele_end_id: number;
  camera_start_id: number;
  camera_end_id: number;
  camera_multi_photo_id: number;
  type_souvenir_id: number;
  name: string;
  price: number;
  image: string;
  lasting_game: number;
  lasting_rele_start: number;
  lasting_rele_end: number;
  fl_display: boolean;
  shots: number;
  miss_shots: number;
  audio_start: string;
  audio_end: string;
  quant_photo: number;
  interval_photo: number;
  timeout_autocancel: number;
}
